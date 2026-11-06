#!/usr/bin/env node
// Behavioural evals: install the skill into a fresh temp project, run each scenario
// through headless Claude Code (`claude -p`), save the outputs, and apply objective checks.
// Objective checks are heuristics. Writing quality is judged separately by reading the
// outputs against each scenario's rubric (see evals/QUALITATIVE-EVALUATION.md).
//
// Usage: node evals/run-evals.mjs [--only 01-english-hook,05-three-character-confrontation] [--concurrency 4] [--model <id>]
// Requires: `npm run build`, and an authenticated `claude` CLI. Each scenario uses your Claude usage.
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, realpathSync, writeFileSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const opt = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? dflt : args[i + 1];
};
const only = opt("only", "")?.split(",").filter(Boolean) ?? [];
const concurrency = Number(opt("concurrency", "4"));
const model = opt("model", undefined);
const TIMEOUT_MS = 10 * 60 * 1000;

const scenarios = JSON.parse(readFileSync(path.join(ROOT, "evals", "scenarios.json"), "utf8")).filter((s) => !only.length || only.includes(s.id));
const { estimateScript } = await import(pathToFileURL(path.join(ROOT, "skills", "drama-writer", "scripts", "estimate-runtime.mjs")).href);

// --recheck <results dir>: re-score saved outputs without calling Claude again.
const recheck = opt("recheck", undefined);
if (recheck) {
  const all = JSON.parse(readFileSync(path.join(ROOT, "evals", "scenarios.json"), "utf8"));
  let passed = 0;
  for (const s of all) {
    const mdFile = path.join(recheck, `${s.id}.md`);
    if (!existsSync(mdFile)) continue;
    const md = readFileSync(mdFile, "utf8");
    const streamFile = path.join(recheck, `${s.id}.stream.jsonl`);
    const a = existsSync(streamFile) ? analyse(readFileSync(streamFile, "utf8")) : { text: "", filesRead: [], skillFilesRead: [], skillUsed: false };
    a.text = md.slice(md.indexOf("\n---\n") + 5);
    const checks = s.checks.map((c) => ({ ...c, ...check(c, a) }));
    const ok = checks.every((c) => c.pass);
    if (ok) passed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${s.id}  files: ${a.skillFilesRead.join(", ") || "SKILL.md only"}${ok ? "" : "  " + checks.filter((c) => !c.pass).map((c) => `[${c.type}: ${c.detail}]`).join(" ")}`);
  }
  console.log(`\n${passed} scenario(s) passed objective checks (recheck).`);
  process.exit(0);
}

if (!existsSync(path.join(ROOT, "dist", "cli.js"))) {
  console.error("Run `npm run build` first.");
  process.exit(2);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(ROOT, "evals", "results", stamp);
mkdirSync(outDir, { recursive: true });

function makeProject(s) {
  const proj = realpathSync(mkdtempSync(path.join(os.tmpdir(), `dw-eval-${s.id}-`)));
  mkdirSync(path.join(proj, ".git")); // mark as project root
  // Install exactly as a user would, through the CLI's --project path.
  const r = spawnSync(process.execPath, [path.join(ROOT, "dist", "cli.js"), "install", "--project"], { cwd: proj, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`install failed: ${r.stderr}`);
  for (const f of s.fixtures ?? []) cpSync(path.join(ROOT, "evals", "fixtures", f), proj, { recursive: true });
  return proj;
}

function runClaude(prompt, cwd) {
  return new Promise((resolve) => {
    const cliArgs = [
      "-p", prompt,
      "--output-format", "stream-json", "--verbose",
      "--allowedTools", "Skill", "Read", "Glob", "Grep", "Bash(node:*)",
      "--disallowedTools", "Write", "Edit", "WebSearch", "WebFetch", "Agent",
      "--setting-sources", "project,local",
    ];
    if (model) cliArgs.push("--model", model);
    const child = spawn("claude", cliArgs, { cwd, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => child.kill("SIGTERM"), TIMEOUT_MS);
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

function analyse(stream) {
  const events = stream.split("\n").filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const toolUses = [];
  for (const e of events) {
    if (e.type !== "assistant") continue;
    for (const c of e.message?.content ?? []) if (c.type === "tool_use") toolUses.push({ name: c.name, input: c.input });
  }
  const result = events.find((e) => e.type === "result");
  const skillUsed = toolUses.some((t) => t.name === "Skill" && JSON.stringify(t.input).includes("drama-writer"));
  // Files can be read with the Read tool or with `cat`/`sed` through Bash.
  const filesRead = toolUses.flatMap((t) => {
    if (t.name === "Read") return [t.input?.file_path ?? ""];
    if (t.name !== "Bash") return [];
    const cmd = String(t.input?.command ?? "");
    const base = /cd\s+(\S*drama-writer)\b/.exec(cmd)?.[1];
    const paths = cmd.match(/[\w./-]*(?:references|templates|examples|series|continuity)\/[\w.-]+\.md/g) ?? [];
    return paths.map((p) => (base && !p.includes("drama-writer/") ? `${base}/${p}` : p));
  });
  return {
    text: result?.result ?? "",
    isError: result?.is_error ?? true,
    costUsd: result?.total_cost_usd,
    durationMs: result?.duration_ms,
    skillUsed,
    skillFilesRead: filesRead.filter((f) => f.includes("drama-writer")).map((f) => f.split("drama-writer/").pop()),
    filesRead,
    toolUses: toolUses.map((t) => t.name),
  };
}

function scriptShare(text, script) {
  const letters = (text.match(/\p{L}/gu) ?? []).length || 1;
  const re = { latin: /\p{Script=Latin}/gu, han: /\p{Script=Han}/gu, hangul: /\p{Script=Hangul}/gu, kana: /[\p{Script=Hiragana}\p{Script=Katakana}]/gu }[script];
  return (text.match(re) ?? []).length / letters;
}

function speakers(text) {
  const names = new Set();
  for (const m of text.matchAll(/^\s*\**([A-Z][A-Z .'\-]{1,24}|[^\x00-\x7F\s:：]{1,8})\**\s*(?:\([^)]*\))?\s*\**\s*[:：]/gmu)) {
    const n = m[1].trim();
    if (!/^(INT|EXT|CAST|NOTE|NOTES|ENDING|SCENE|SHOT|CONTINUITY|LANGUAGE|TARGET|SETTING|PROPS|AUDIO|CAMERA)$/i.test(n)) names.add(n);
  }
  return names;
}

function check(c, a) {
  const t = a.text;
  switch (c.type) {
    case "skill_activated":
      return { pass: a.skillUsed || a.skillFilesRead.length > 0, detail: a.skillUsed ? "Skill tool invoked" : `files read: ${a.skillFilesRead.join(", ") || "none"}` };
    case "script": {
      // Measure dialogue only: explanations may legitimately be in the user's language.
      const dialogue = t.split("\n").filter((l) => /^\s*\**[^\s:：*]{1,24}\**\s*(?:[(（][^)）]*[)）])?\s*[:：]\s*\S/u.test(l)).join("\n");
      const share = scriptShare(dialogue || t, c.script);
      return { pass: share >= 0.5, detail: `${c.script} share of letters in dialogue lines: ${(share * 100).toFixed(0)}%` };
    }
    case "regex": {
      const n = (t.match(new RegExp(c.pattern, `g${c.flags ?? ""}u`)) ?? []).length;
      return { pass: n >= (c.min ?? 1), detail: `${n} match(es) of /${c.pattern}/` };
    }
    case "not_regex": {
      const m = t.match(new RegExp(c.pattern, `${c.flags ?? ""}u`));
      return { pass: !m, detail: m ? `found "${m[0]}"` : "absent" };
    }
    case "speakers": {
      const s = speakers(t);
      return { pass: s.size >= c.min, detail: `${s.size} speaker(s): ${[...s].join(", ")}` };
    }
    case "tag_density": {
      const lines = t.split("\n").filter((l) => /^\s*\**[A-Z][A-Z .'\-]+\**\s*(\([^)]*\))?\s*:/.test(l));
      const tags = lines.reduce((n, l) => n + (l.match(/\[[^\]]+\]/g) ?? []).length, 0);
      const d = lines.length ? tags / lines.length : 0;
      return { pass: d <= c.max, detail: `${tags} tag(s) over ${lines.length} line(s) = ${d.toFixed(2)} per line` };
    }
    case "runtime": {
      const r = estimateScript(t, {});
      return { pass: r.seconds >= c.min && r.seconds <= c.max, detail: `estimator: ${r.seconds} s (${r.low}–${r.high}), ${r.dialogueLines} line(s)` };
    }
    case "read_file": {
      const ok = a.filesRead.some((f) => new RegExp(c.pattern).test(f));
      return { pass: ok, detail: ok ? "read" : `not read (read: ${a.filesRead.map((f) => path.basename(f)).join(", ")})` };
    }
    default:
      return { pass: false, detail: `unknown check ${c.type}` };
  }
}

async function runOne(s) {
  const proj = s.project;
  const started = Date.now();
  const r = await runClaude(s.prompt, proj);
  const a = analyse(r.stdout);
  const checks = s.checks.map((c) => ({ ...c, ...check(c, a) }));
  const md = [
    `# ${s.id}: ${s.title}`, "", `**Prompt:** ${s.prompt}`, "", `**Rubric:** ${s.rubric}`, "",
    `**Skill activated:** ${a.skillUsed} · **Skill files read:** ${a.skillFilesRead.join(", ") || "none"}`,
    `**Checks:** ${checks.map((c) => `${c.pass ? "PASS" : "FAIL"} ${c.type} (${c.detail})`).join("; ")}`, "", "---", "", a.text || `(no result)\n\n${r.stderr.slice(0, 2000)}`,
  ].join("\n");
  writeFileSync(path.join(outDir, `${s.id}.md`), md);
  writeFileSync(path.join(outDir, `${s.id}.stream.jsonl`), r.stdout);
  const summary = { id: s.id, title: s.title, ok: !a.isError, seconds: Math.round((Date.now() - started) / 1000), costUsd: a.costUsd, skillUsed: a.skillUsed, skillFilesRead: a.skillFilesRead, toolUses: a.toolUses, checks };
  const status = checks.every((c) => c.pass) ? "PASS" : "FAIL";
  console.log(`${status} ${s.id} (${summary.seconds}s) ${checks.filter((c) => !c.pass).map((c) => `[${c.type}: ${c.detail}]`).join(" ")}`);
  return summary;
}

// Set up every project before any Claude run, so later rebuilds of dist/ can't interfere.
for (const s of scenarios) s.project = makeProject(s);
const queue = [...scenarios];
const results = [];
await Promise.all(Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
  while (queue.length) {
    const s = queue.shift();
    try {
      results.push(await runOne(s));
    } catch (e) {
      console.log(`ERROR ${s.id}: ${e.message}`);
      results.push({ id: s.id, title: s.title, ok: false, error: e.message, checks: [{ type: "run", pass: false, detail: e.message }] });
    }
  }
}));
results.sort((a, b) => a.id.localeCompare(b.id));
writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(results, null, 2));
const passed = results.filter((r) => r.checks.every((c) => c.pass)).length;
console.log(`\n${passed}/${results.length} scenarios passed objective checks. Outputs: ${outDir}`);
