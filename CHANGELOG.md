# Changelog

All notable changes to this project are documented here. The project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.5.0] - 2026-11-14

### Added
- Opt-in low-motion tension mode for AI micro-dramas (`references/low-motion-tension.md`): 15-second single-take beats (8 to 10 seconds for before-and-after turns), a two-character cast cap with an optional off-screen narrator and at most 6 reference images, stillness instead of fast action, a 70/30 voiceover to on-camera dialogue split, inline vocal direction on every spoken line with no external audio assumed, SFX cues in every beat, and a five-column beat sheet (new Beat sheet variant in `templates/screenplay.md`) for `video-prompt-director`. Includes a worked example.
- Eval scenarios 24 to 26 for the new mode: the beat sheet, the cast cap, and a guard that the mode is never applied unasked.

## [1.4.0] - 2026-11-11

### Added
- Hook and cliffhanger craft (`references/hooks-and-cliffhangers.md`): first-watch clarity for cold viewers, hook and cliffhanger patterns, the hook-to-ending chain, escalation, and an episode brief. Loaded for episode writing and production.
- AI video handoff guidance for keeping the hook image, orientation, escalation and ending image intact when a script becomes shots.

## [1.3.0] - 2026-11-11

### Changed
- Make Eleven v4 direction more expressive for emotionally charged dialogue, including vocal shifts and performance pauses.

### Added
- Title guidance (`references/titles.md`): short series titles and longer upload titles, a plain-sentence test, common title patterns, how much a title may reveal, and per-language and per-platform notes. Concepts and the series bible and outline templates now include title fields.
- ElevenLabs v4 voice direction for screenplay JSON, preserving dialogue while adding performance tags in `ttsText`.

## [1.2.0] - 2026-11-08

### Added
- Guidance for choosing writing workflows from natural requests and asking focused questions when essential details are unclear.
- Human-readable project, story state, episode index, and episode record templates for tracking a series across installments.
- Guidance for accepted story and drafts, maintaining continuity records, and checking the effects of earlier revisions.

### Changed
- Install the marketplace plugin directly from `plugins/drama-writer/` and remove the duplicated `directory-plugin/` folder. The directory-compatible copy is generated on demand with `npm run build:directory` and is not tracked.

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
