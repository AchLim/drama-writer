import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { it } from "node:test";
import { listFiles } from "../src/manifest.ts";
import { ROOT, SKILL_SRC, tmpDir } from "./helpers.ts";

it("builds and validates a directory-compatible plugin from the full skill", () => {
  const target = path.join(tmpDir("dw-distribution-"), "plugin");
  const run = (...args: string[]) => spawnSync(process.execPath, ["scripts/build-directory-plugin.mjs", "--out", target, ...args], { cwd: ROOT, encoding: "utf8" });
  assert.notEqual(run("--check", "--require-output").status, 0);
  assert.equal(run().status, 0);
  const skill = path.join(target, "skills", "drama-writer");
  assert.equal(existsSync(path.join(SKILL_SRC, "scripts", "estimate-runtime.mjs")), true);
  assert.equal(existsSync(path.join(skill, "scripts", "estimate-runtime.mjs")), false);
  assert.ok(listFiles(target).every((f) => /\.(md|json|png)$/.test(f)));
  assert.doesNotMatch(readFileSync(path.join(skill, "SKILL.md"), "utf8"), /scripts\/estimate-runtime\.mjs/);
  assert.match(readFileSync(path.join(skill, "SKILL.md"), "utf8"), /manual estimate/);
  assert.equal(run("--check", "--require-output").status, 0);
  writeFileSync(path.join(skill, "SKILL.md"), "stale");
  assert.notEqual(run("--check", "--require-output").status, 0);
});
