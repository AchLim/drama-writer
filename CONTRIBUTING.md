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

## Where to open a pull request

Open pull requests against `AchLim/drama-writer`. If you do not have write access, fork the repository, create a branch in your fork, and open a pull request from that branch to this repository.

Target `main`. Contributors do not need to choose a release version or create a release branch. A maintainer may request a different base for an exceptional fix to an older release.

## Where things live

| Path | What it is |
|---|---|
| `plugins/drama-writer/` | The Claude Code plugin: its manifest, icon, README, and the skill |
| `plugins/drama-writer/skills/drama-writer/` | The skill itself. Everything Claude reads. |
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

### Record changes and prepare releases

Feature and fix pull requests leave the package version unchanged and add user-facing notes under `Unreleased` in `CHANGELOG.md`. Combine changes intended to ship together before choosing the release version.

When preparing a release, a maintainer creates `release/<version>` from `main`. The branch contains the changes on `main` at that point; later contributions to `main` are not automatically included. On the release branch, raise the version once for the whole release:

```bash
npm version patch --no-git-tag-version    # fixes and wording
npm version minor --no-git-tag-version    # new guidance, new templates, new CLI options
npm version major --no-git-tag-version    # incompatible changes
```

`npm version` writes the number to `package.json`, `plugins/drama-writer/skills/drama-writer/VERSION`, `SKILL.md`, and both plugin manifests, and rebuilds generated files. Use `--no-git-tag-version` when preparing the version for review. Move the included unreleased notes into a dated section for that version, then open a release pull request from `release/<version>` to `main`. After review and merge, tag the tested release-branch commit and publish when ready. If `main` received other changes after the release branch was created, do not tag the merge commit as the release: it contains those additional changes. Reconcile any new unreleased changelog notes when merging.

If an urgent fix must ship for an older release while `main` contains newer work, a maintainer can create a patch branch from the last released tag, request the fix against it, and release that patch separately. Bring the fix into `main` and any active release branches as needed without downgrading their versions.

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
- User-facing changes have an unreleased changelog note; release changes have a matching version and dated changelog section.
- Writing changes come with eval notes.
- Nothing invents facts: no made-up statistics, provider features or tool limits.

## Reporting a problem

Use the issue templates: **Writing gap** for weak output, **Bug** for the CLI or the plugin. Security problems go through [SECURITY.md](SECURITY.md), not a public issue.

## Conduct

Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Directory plugin

`plugins/drama-writer/` is the source of truth. After editing it, run `npm run build:directory` to regenerate `directory-plugin/`, which excludes file types restricted by the Claude directory. Commit the generated files with the source changes. `npm run check` detects stale output.
