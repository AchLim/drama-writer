# drama-writer (skill folder)

This folder is a complete Agent Skill. Claude reads `SKILL.md` first and loads the other files only when a task needs them.

- `SKILL.md`: workflows, language rules, core craft rules, output format, and a map of the other files.
- `references/`: in-depth guidance (storytelling, plot, character, dialogue, multilingual writing, emotion and TTS, short-form pacing, visual storytelling, scenes, shot continuity, series continuity, AI video, runtime, editorial review).
- `templates/`: series bible, character profile, story outline, episode outline, screenplay (standard and production), continuity ledger.
- `examples/`: natural dialogue in six languages, weak vs strong storytelling, a full production-ready episode.

To install by hand, copy this whole folder to `~/.claude/skills/drama-writer/` (all projects) or `<project>/.claude/skills/drama-writer/` (one project). The plugin, `npx skills add` and the npm CLI are covered in the repository's GUIDE.md.
