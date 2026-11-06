# Contributing

Thanks for helping. Most useful contributions fall into two groups: the skill writes something weak (a writing gap), or the installer misbehaves (a bug). Both start as an [issue](https://github.com/AchLim/drama-writer/issues), so we can agree on the fix before you write it.

## Set up

```bash
git clone https://github.com/AchLim/drama-writer.git
cd drama-writer
npm ci
npm test
```

Development needs Node.js 22.18 or newer, because the tests run TypeScript directly. The published CLI runs on Node.js 18.17 and newer.

## Where things live

| Path | What it is |
|---|---|
| `plugins/akoru/` | The Claude Code plugin: its manifest, icon, README, and the skill |
| `plugins/akoru/skills/drama-writer/` | The skill itself. Everything Claude reads. |
| `.claude-plugin/marketplace.json` | The marketplace that lists the plugin |
| `src/` | The installer CLI (TypeScript) |
| `test/` | Automated tests (`node:test`) |
| `evals/` | Writing scenarios run through headless Claude Code, plus the qualitative review |
| `scripts/` | Version sync and the single-file build |
| `drama-writer.md` | Generated single-file edition. Don't edit it by hand. |

## Before you open a pull request

### Run the checks

```bash
npm run check       # versions agree everywhere; drama-writer.md is current
npm run typecheck
npm test
```

All three run in CI on Linux, macOS and Windows.

### Rebuild generated files

If you changed `SKILL.md` or `templates/screenplay.md`, run `npm run build:single` and commit the new `drama-writer.md`.

### Raise the version

Every pull request that changes what users get raises the version once:

```bash
npm version patch    # fixes and wording
npm version minor    # new guidance, new templates, new CLI options
npm version major    # anything that changes how existing installs behave
```

`npm version` writes the number to `package.json`, `plugins/akoru/skills/drama-writer/VERSION`, `SKILL.md`, and both plugin manifests, and rebuilds `drama-writer.md`. Add a matching section to `CHANGELOG.md`.

## Changing the skill

- **Keep `SKILL.md` short.** It loads every time the skill runs. Detailed guidance goes in `references/`, and `SKILL.md` says when to read it. The tests fail above 500 lines.
- **Keep the description under 200 characters.** Claude.ai rejects longer ones.
- **Show, don't list.** A weak/strong pair in `examples/` teaches more than another rule.
- **Write examples you made up yourself.** Don't paste lines from existing films, series or books.
- **Respect each language's rules.** Advice for English must not leak into Korean or Indonesian. If you add notes for a language, write from native knowledge or say what needs native review.
- **Copy rules.** The project follows [antislop](https://github.com/miqdadbadjuber/anti-slop)'s copywriting rules. No em dashes anywhere (a test enforces this; use `--` for dialogue cut-offs and `-` in scene headings), no buzzwords, no claims without evidence.

### Test writing changes

Tests can't judge writing. For changes to guidance, run the scenarios your change affects and read the output:

```bash
npm run build
node evals/run-evals.mjs --only 04-korean-speech-levels,11-continuation
```

This uses your own Claude Code login and usage. In the pull request, say which scenarios you ran and what changed in the output. `evals/QUALITATIVE-EVALUATION.md` shows the level of review we look for.

## Changing the installer

- No runtime dependencies. Node's standard library only.
- Never write outside the target `drama-writer` folder and its backup folder.
- Never delete or overwrite user files without `--force`, and always back up first.
- Add a test in `test/installer.test.ts` for every new behaviour, including the refusal path.

## What review checks

- The checks pass.
- The version went up and the changelog says why.
- Writing changes come with eval notes.
- Nothing invents facts: no made-up statistics, provider features or tool limits.

## Reporting a problem

Use the issue templates: **Writing gap** for weak output, **Bug** for the CLI or the plugin. Security problems go through [SECURITY.md](SECURITY.md), not a public issue.

## Conduct

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).
