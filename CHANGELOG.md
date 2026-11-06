# Changelog

All notable changes to this project are documented here. The project follows [Semantic Versioning](https://semver.org/).

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
