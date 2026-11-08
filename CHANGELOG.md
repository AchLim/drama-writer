# Changelog

All notable changes to this project are documented here. The project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Guidance for choosing writing workflows from natural requests and asking focused questions when essential details are unclear.
- Human-readable project, story state, episode index, and episode record templates for tracking a series across installments.
- Guidance for accepted story and drafts, maintaining continuity records, and checking the effects of earlier revisions.

## [1.1.0] - 2026-11-08

### Added
- Hook engines (curiosity, anticipation, desire), the viewer's-want line, and a draft-and-test process for hooks (`references/storytelling.md` §5).
- Retention inside an episode: overlapping loops, re-hooks where attention dips, partial payoffs, and ending on the inhale (`references/short-form-drama.md` §4).
- The payoff ladder for series planning (`references/plot-structure.md` §7), with a matching table and a "payoff given" column in the series bible.
- Writing for the voice: surface and underneath, delivery carried by the words, intensity mapping, mid-line shifts, audible listeners, and an optional delivery sheet that converts to each TTS provider's format (`references/emotional-performance.md` §6).
- A vocal profile section in the character profile template, and an optional delivery sheet in the screenplay template.
- Examples: `examples/binge-hooks.md` and `examples/voice-delivery.md`.
- Self-review checks for hook engines, re-hooks, the ending cut, and a voice pass.
- Eval scenarios 16 (binge series opener) and 17 (fully voiced scene).

### Changed
- SKILL.md's hook rule now covers the viewer's want and the ending cut, and a new rule covers writing for the voice. Concept and story-development deliverables include the hook engine, the viewer's want, and the payoff ladder.

## [1.0.1] - 2026-11-07

### Changed
- Rename the Claude plugin and marketplace to `drama-writer` and align the plugin folder and installation instructions.

## [1.0.0] - 2026-11-07

### Added
- `drama-writer` Agent Skill: workflows for concept development, story development, episode writing, production-ready screenplays, editorial review, and continuation.
- 14 reference guides: storytelling, plot structure, character development, natural dialogue, multilingual writing (English, Indonesian, Mandarin, Korean, Japanese, Spanish, and a protocol for other languages), emotional performance and TTS annotation, short-form drama, visual storytelling, scene construction, shot continuity, episode continuity, AI video production, runtime timing, editorial review.
- Templates: series bible, character profile, story outline, episode outline, screenplay (standard and production), continuity ledger.
- Examples: natural dialogue in six languages, weak vs strong storytelling, a full production-ready episode.
- `scripts/estimate-runtime.mjs`: language- and delivery-aware runtime estimator.
- CLI (`drama-writer`): `install`, `update`, `uninstall`, `list`, `doctor`, `export-zip`, with `--global`, `--project`, `--dir`, `--force`, `--dry-run`, `--backup-dir`, `--json`.
- Safe updates: install records with file hashes, protection of local edits, backups before any replacement or removal, staged replacement.
- Claude.ai ZIP export.
- Claude Code plugin and marketplace manifests (`.claude-plugin/`), so the skill installs with `/plugin install akoru@akoru` and runs as `/akoru:drama-writer`.
- Install from the repository with `npx skills add AchLim/drama-writer`.
- Plugin icon: a lowercase "a" lettermark, ink on warm paper (`plugins/drama-writer/.claude-plugin/icon.png`, source in `assets/akoru-icon.svg`).
- `VERSION` file in the skill folder; `npm version` keeps it, `SKILL.md` and both plugin manifests in step.
- `drama-writer.md`, a single-file edition generated from `SKILL.md`.
- User guide, contributing guide, code of conduct, security policy, roadmap, issue and pull request templates, and CI on Linux, macOS and Windows.
