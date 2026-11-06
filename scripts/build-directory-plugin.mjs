import { readFileSync, readdirSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const source = 'plugins/drama-writer';
const target = 'directory-plugin';
const files = new Map();
function collect(dir, prefix = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const name = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) collect(path.join(dir, entry.name), name);
    else if (/\.(md|json|png)$/.test(name)) files.set(name, readFileSync(path.join(dir, entry.name)));
  }
}
function edit(name, transform) {
  const original = files.get(name).toString('utf8');
  const updated = transform(original);
  if (updated === original) throw new Error(`Expected source text missing in ${name}`);
  files.set(name, Buffer.from(updated));
}
collect(source);
files.set('README.md', Buffer.from('# Drama Writer\n\nA skill by akoru for writing and reviewing short dramas, screenplays, and production-ready shot lists. Runtime estimates use the included guidance.\n'));
const skill = 'skills/drama-writer/';
edit(skill + 'SKILL.md', s => s.replace(/Do not estimate runtime from word count alone\.[\s\S]*?(?=\n\n## 7\.)/, 'Do not estimate runtime from word count alone. Budget spoken time by language and delivery, then add reactions, pauses, physical action, and transitions (`references/runtime-timing.md`). Treat the result as a manual estimate. When a script runs long, cut lines that repeat meaning before cutting silences that carry emotion.'));
edit(skill + 'references/runtime-timing.md', s => s.replace(/## 6\. Using the estimator script[\s\S]*?## 7\. Cutting to fit/, '## 6. Cutting to fit'));
edit(skill + 'templates/screenplay.md', s => s.replace(/^- .*scripts\/estimate-runtime\.mjs.*\n/m, ''));
edit(skill + 'examples/production-ready-scene.md', s => s.replace('`node scripts/estimate-runtime.mjs examples/production-ready-scene.md --target 70` flagged', 'A runtime estimate showed'));
edit(skill + 'README.md', s => s.replace(/^- `scripts\/estimate-runtime\.mjs`.*\n/m, '').replace(' `VERSION` names the release this folder came from.', ''));
if (process.argv.includes('--check')) {
  const actual = new Map();
  function scan(dir, prefix = '') {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const name = path.posix.join(prefix, entry.name);
      if (entry.isDirectory()) scan(path.join(dir, entry.name), name);
      else actual.set(name, readFileSync(path.join(dir, entry.name)));
    }
  }
  scan(target);
  const changes = [...new Set([...files.keys(), ...actual.keys()])].filter(name => !files.has(name) || !actual.has(name) || !files.get(name).equals(actual.get(name)));
  if (changes.length) { console.error(`Directory plugin is out of date: ${changes.join(', ')}. Run npm run build:directory`); process.exit(1); }
  console.log('Directory plugin is up to date.');
} else {
  rmSync(target, { recursive: true, force: true });
  for (const [name, contents] of files) {
    const dest = path.join(target, name);
    mkdirSync(path.dirname(dest), { recursive: true });
    writeFileSync(dest, contents);
  }
  console.log('Built directory plugin.');
}
