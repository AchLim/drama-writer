import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { it } from "node:test";
import { ROOT, tmpDir } from "./helpers.ts";

it("resumes a routing scenario and checks the first turn", () => {
  const binDir = tmpDir("dw-eval-cli-");
  const mock = path.join(binDir, "claude.cjs");
  writeFileSync(mock, `
const args = process.argv.slice(2);
const resumed = args.includes('--resume');
if (resumed && args[args.indexOf('--resume') + 1] !== 'test-session') process.exit(2);
if (!resumed) console.log(JSON.stringify({type:'assistant', message:{content:[{type:'tool_use',name:'Skill',input:{skill:'drama-writer'}}]}}));
console.log(JSON.stringify({type:'result', session_id:'test-session', is_error:false, result:resumed ? 'Five fictional town names.' : 'What kind of help would you like?'}));
`);
  const r = spawnSync(process.execPath, ["evals/run-evals.mjs", "--only", "21-routing-other-goal"], {
    cwd: ROOT, encoding: "utf8", env: { ...process.env, DRAMA_WRITER_EVAL_CLI_SCRIPT: mock },
  });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /PASS 21-routing-other-goal/);
  const outputDir = r.stdout.match(/Outputs: (.+)/)?.[1];
  assert.ok(outputDir);
  const output = readFileSync(path.join(outputDir, "21-routing-other-goal.md"), "utf8");
  assert.match(output, /First response:.*What kind of help/);
  assert.match(output, /Five fictional town names/);
  const recheck = spawnSync(process.execPath, ["evals/run-evals.mjs", "--recheck", outputDir], { cwd: ROOT, encoding: "utf8" });
  assert.equal(recheck.status, 0, recheck.stderr);
  assert.match(recheck.stdout, /PASS 21-routing-other-goal/);
});
