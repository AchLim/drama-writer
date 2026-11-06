// Automated checks of the runtime estimator (scenario 15, "dialogue timing", automated half).
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { pathToFileURL } from "node:url";
import { SKILL_SRC } from "./helpers.ts";

interface Line { speech: number; pauses: number; total: number }
interface Report {
  lang: string; seconds: number; low: number; high: number; dialogueLines: number; verdict?: string; warnings: string[];
  scenes: { title: string; seconds: number; lines: number; shots: { title: string; seconds: number }[] }[];
}
interface Estimator {
  speechSeconds(text: string, lang?: string): number;
  estimateLine(text: string, paren?: string, lang?: string): Line;
  estimateScript(text: string, opts?: { lang?: string; target?: number }): Report;
}

const est = (await import(pathToFileURL(path.join(SKILL_SRC, "scripts", "estimate-runtime.mjs")).href)) as Estimator;
const near = (a: number, b: number, tol = 0.05): void => assert.ok(Math.abs(a - b) <= tol, `${a} ≉ ${b}`);

describe("speech rates by language", () => {
  it("English: 10 words ≈ 4 s", () => near(est.speechSeconds("one two three four five six seven eight nine ten", "en"), 4));
  it("Indonesian is slower per word than English", () => {
    const t = "Lo kenapa sih dari tadi diem aja";
    assert.ok(est.speechSeconds(t, "id") > est.speechSeconds(t, "en"));
  });
  it("Mandarin counts characters (≈4/s), ignoring punctuation", () => near(est.speechSeconds("你怎么现在才告诉我？"), 9 / 4));
  it("Korean counts Hangul syllables (≈5/s)", () => near(est.speechSeconds("진짜? 너 그거 알고 있었어?"), 10 / 5));
  it("Japanese counts kana and kanji (≈5/s)", () => near(est.speechSeconds("まだ残ってたんですか"), 10 / 5));
});

describe("delivery and pauses (not word count alone)", () => {
  const plain = est.estimateLine("You signed it before you even asked me.");
  it("whispered lines take longer", () => assert.ok(est.estimateLine("[whispers] You signed it before you even asked me.").total > plain.total));
  it("crying is much slower than neutral", () => near(est.estimateLine("[crying] You signed it before you even asked me.").speech, plain.speech * 1.4));
  it("shouting is a little faster", () => assert.ok(est.estimateLine("[shouts] You signed it before you even asked me.").speech < plain.speech));
  it("[pause] adds ~0.8 s and is not spoken", () => near(est.estimateLine("When? [pause] At the wedding?").pauses, 0.8));
  it("parentheticals count as delivery", () => assert.ok(est.estimateLine("You signed it.", "quietly").total > est.estimateLine("You signed it.").total));
});

describe("whole-script estimates", () => {
  it("the bundled production example is on its 70 s target with no warnings", () => {
    const r = est.estimateScript(readFileSync(path.join(SKILL_SRC, "examples", "production-ready-scene.md"), "utf8"), { target: 70 });
    assert.equal(r.verdict, "on target", JSON.stringify(r));
    assert.deepEqual(r.warnings, []);
    assert.equal(r.scenes.length, 1);
    assert.equal(r.scenes[0]?.shots.length, 13);
    assert.equal(r.dialogueLines, 11);
  });

  it("flags a shot whose dialogue overflows its stated duration", () => {
    const r = est.estimateScript("## S01 - INT. ROOM - DAY\n### S01-01 · CU · 2s\nANA: I need you to listen to me very carefully because I am only going to say this once.\n");
    assert.ok(r.warnings.some((w) => /S01-01.*shot is 2 s/.test(w)), r.warnings.join("\n"));
    assert.ok(r.seconds > 2, "a shot can't run shorter than its dialogue");
  });

  it("flags very long single lines", () => {
    const long = "word ".repeat(30);
    const r = est.estimateScript(`## S01 - INT. ROOM - DAY\nANA: ${long}\n`);
    assert.ok(r.warnings.some((w) => /Consider splitting/.test(w)));
  });

  it("an over-written 30 s scene is reported as over target", () => {
    const lines = Array.from({ length: 14 }, (_, i) => `${i % 2 ? "BEN" : "ANA"}: I really think we should talk about what happened last night at dinner.`).join("\n");
    const r = est.estimateScript(`## S01 - INT. ROOM - DAY\n${lines}\n`, { target: 30 });
    assert.match(r.verdict ?? "", /over by/);
  });

  it("ignores metadata, notes sections, and text before the first scene", () => {
    const r = est.estimateScript([
      "# EP 01", "Language: en", "**Episode objective:** long description that should not count at all here", "",
      "## S01 - INT. ROOM - DAY", "Cast: ANA, BEN", "ANA: Hi.", "",
      "## Continuity ledger", "| a | b |", "Lots of notes that should not count toward runtime at all.",
    ].join("\n"));
    assert.equal(r.dialogueLines, 1);
    assert.ok(r.seconds < 2, String(r.seconds));
  });

  it("stops at a horizontal rule, so notes and tables after the script don't count", () => {
    const script = "## S01 - EXT. PORCH - EVENING\nANA: Hi.\n\n---\n\n**Runtime breakdown**\n| Part | Time |\n|---|---|\n| Dialogue | 3 s |\nThis paragraph explains the scene at length and must not be timed as action.\n";
    const r = est.estimateScript(script);
    assert.ok(r.seconds < 2, String(r.seconds));
  });

  it("skips localized cast labels and reads full-width parentheticals", () => {
    const r = est.estimateScript("## S01 - 内景 医院 - 深夜\n出场：周桂芳（55岁，母亲），陈磊（28岁）\n收费员（画外）：阿姨，这卡报不了。\n周桂芳：不可能。\n");
    assert.equal(r.dialogueLines, 2);
  });

  it("picks up the Latin-script rate from a localized language label", () => {
    assert.equal(est.estimateScript("Bahasa: id\n## S01 - INT. KOS - MALAM\nSEKAR: Mei.\n").lang, "id");
  });

  it("reads the script from stdin with '-'", () => {
    const r = spawnSync(process.execPath, [path.join(SKILL_SRC, "scripts", "estimate-runtime.mjs"), "-", "--json"], {
      input: "## S01 - INT. ROOM - DAY\nANA: Hello there.\n", encoding: "utf8",
    });
    assert.equal(r.status, 0, r.stderr);
    assert.equal(JSON.parse(r.stdout).dialogueLines, 1);
  });

  it("still reads scene headings that use em dashes, as user scripts may", () => {
    assert.equal(est.estimateScript("## S01 \u2014 INT. ROOM \u2014 DAY\nANA: Hi.\n").dialogueLines, 1);
  });

  it("reads non-Latin speaker names and localized scene headings", () => {
    const r = est.estimateScript("## S01 - 실내. 카페 - 낮\n지우: 진짜?\n민호: 응.\n## S02 - 内景 公寓 - 夜\n林晓：你怎么现在才告诉我？\n");
    assert.equal(r.scenes.length, 2);
    assert.equal(r.dialogueLines, 3);
  });
});
