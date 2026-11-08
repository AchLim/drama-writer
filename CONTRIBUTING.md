# Contributing

Thanks for helping. Most useful contributions fall into two groups: the skill writes something weak (a writing gap), or the installer misbehaves (a bug). Both start as an [issue](https://github.com/AchLim/drama-writer/issues), so we can agree on the fix before you write it.

## Set up

```bash
git clone https://github.com/AchLim/drama-writer.git
cd drama-writer
git switch develop
npm ci
npm test
```

Development needs Node.js 22.18 or newer, because the tests run TypeScript directly. The published CLI runs on Node.js 18.17 and newer.

## Where to open a pull request

Open pull requests against `AchLim/drama-writer`. If you do not have write access, fork the repository, create a branch in your fork, and open a pull request from that branch to this repository.

Create your feature or fix branch from `develop` and target `develop` in the pull request. GitHub defaults new pull requests to `main`, so change the base branch to `develop` when opening one. `main` holds released code; `develop` holds work for future releases. Contributors do not need to choose a release version.

During release QA, a maintainer may ask for a fix to target an active `release/<version>` branch instead. Start that fix from the release branch and select it as the pull request's base. New features continue to target `develop`.

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

When preparing a release, a maintainer creates `release/<version>` from `develop`. This branch is the QA stage for that release; later work on `develop` is not automatically included. Make only release preparation and QA fixes on it. Raise the version once for the whole release:

```bash
npm version patch --no-git-tag-version    # fixes and wording
npm version minor --no-git-tag-version    # new guidance, new templates, new CLI options
npm version major --no-git-tag-version    # incompatible changes
```

`npm version` writes the number to `package.json`, `plugins/drama-writer/skills/drama-writer/VERSION`, `SKILL.md`, and both plugin manifests, and rebuilds generated files. Move the included unreleased notes into a dated section for the version. After QA, open a pull request from the release branch to `main`. After approval and merge, tag the tested release commit and publish when ready. Also merge the release changes back into `develop`, preserving any newer `Unreleased` notes and QA fixes, so they are not lost from later releases.

Before the release pull request, build and include the marketplace distribution from the release's exact source. On a branch targeting `release/<version>`, run:

```bash
npm run build:directory
git add -f directory-plugin/
node scripts/build-directory-plugin.mjs --check --require-output
```

Commit the output and open a pull request into the release branch. CI requires the tracked, up-to-date directory copy for pull requests into release branches and `main`; this keeps the existing marketplace installation working. Do not publish a release if that check fails.

When merging release changes back to `develop`, use a separate branch and pull request. Remove the generated copy from the merge before committing with `git rm -r --cached --ignore-unmatch directory-plugin/`. Preserve later development changes and changelog notes. The directory remains ignored on `develop` and CI rejects tracked copies there.

For an urgent fix to a released version, a maintainer can create a patch branch from the released tag on `main`, have the fix reviewed and tested, then release the patch. Bring the fix back into `develop` and any active release branch where it applies, without downgrading their versions.

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

`plugins/drama-writer/` is the source of truth. The generated `directory-plugin/` excludes file types restricted by the Claude directory and is not tracked on `develop`. Run `npm run build:directory` to inspect it locally; `npm run check` validates it if present. If a local copy becomes stale, rebuild it. The release process above includes the verified copy on `main` so marketplace installations continue to work.
