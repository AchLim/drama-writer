// Copies package.json's version into every file that states it, so a release bumps one number.
// Runs from the npm "version" lifecycle script; `--check` fails instead of writing.
import { readFileSync, writeFileSync } from "node:fs";

const check = process.argv.includes("--check");
const { version } = JSON.parse(readFileSync("package.json", "utf8"));

const targets = [
  ["skills/drama-writer/VERSION", () => `${version}\n`],
  ["skills/drama-writer/SKILL.md", (s) => s.replace(/^( {2}version: )"[^"\n]*"$/m, `$1"${version}"`)],
  [".claude-plugin/plugin.json", (s) => s.replace(/("version": )"[^"]*"/, `$1"${version}"`)],
  [".claude-plugin/marketplace.json", (s) => s.replace(/("version": )"[^"]*"/, `$1"${version}"`)],
];

let stale = 0;
for (const [file, update] of targets) {
  const before = readFileSync(file, "utf8");
  const after = update(before);
  if (before === after) continue;
  stale++;
  if (check) console.error(`${file} does not say ${version}`);
  else writeFileSync(file, after);
}
if (check && stale) process.exit(1);
console.log(check ? `All files say ${version}.` : `Version ${version} written to ${stale} file(s).`);
