# The drama-writer guide

## Table of Contents
- [What is drama-writer?](#what-is-drama-writer)
- [What you can use it for](#what-you-can-use-it-for)
- [Install, update, and remove](#install-update-and-remove)
  - [Choose a route](#choose-a-route)
  - [Before you start](#before-you-start)
  - [Claude Code plugin](#claude-code-plugin)
  - [The skills directory](#the-skills-directory)
  - [The npm CLI](#the-npm-cli)
  - [The single file](#the-single-file)
  - [Claude.ai](#claudeai)
- [Working with it](#working-with-it)
  - [Language](#language)
  - [Length and format](#length-and-format)
  - [Series files](#series-files)
  - [Production mode](#production-mode)
  - [Voice tags](#voice-tags)
  - [Runtime estimator](#runtime-estimator)
- [Reference](#reference)
  - [Which version do I have?](#which-version-do-i-have)
  - [What is in the skill](#what-is-in-the-skill)
  - [What it does not do](#what-it-does-not-do)
- [Something is wrong](#something-is-wrong)
- [Where is this going?](#where-is-this-going)

## What is drama-writer?

drama-writer is an [Agent Skill](https://agentskills.io): a folder with a `SKILL.md` and supporting files that Claude Code loads when a task calls for it. It turns Claude into a screenwriter, script editor and production supervisor for short-form drama, especially vertical episodes for TikTok, YouTube Shorts, Reels and short-drama apps, and scripts that will become AI-generated video.

`SKILL.md` is short. It holds the workflows, the language rules, the core craft rules and a map of the other files. Claude reads the longer reference guides, templates and examples only when a task needs them.

## What you can use it for

drama-writer recognises six kinds of request and changes what it delivers for each:

| Workflow | You give it | You get |
|---|---|---|
| Concept | A loose idea | One to three sharp concepts: premise, conflict, characters, dramatic question, opening hook, and a recommendation |
| Story development | An approved concept | Synopsis, character profiles, structure, reveals plan with plants and payoffs, ending, episode breakdown, series bible |
| Episode | The bible and an episode number | Episode objective, hook, beats, the screenplay, and the ending beat |
| Production screenplay | An approved episode | Scene and shot IDs, durations, staging, dialogue, optional performance tags, continuity ledger |
| Review | Your script | The problems ranked by impact, each with a fix, then the corrected script |
| Continuation | Your project files | The next episode, consistent with everything established, plus an updated "state of the story" |

It won't add camera specs or voice tags to a request that only asked for a story.

## Install, update, and remove

### Choose a route

| Route | Best for | Updates |
|---|---|---|
| [Claude Code plugin](#claude-code-plugin) | Most people | Through Claude Code's plugin commands |
| [The skills directory](#the-skills-directory) | People who already manage skills with `npx skills` | `npx skills update` |
| [The npm CLI](#the-npm-cli) | Project installs you commit to git, custom folders, protecting local edits | `drama-writer update` |
| [The single file](#the-single-file) | Chats where you can't install anything | Download again |

Use one route per scope. Two installs of the same skill give Claude two copies with the same name.

### Before you start

- Claude Code, any recent version. The one-line plugin install needs 2.1.275 or later.
- Node.js 18.17 or newer, only for `npx` routes.

### Claude Code plugin

**Install.** Inside Claude Code:

```text
/plugin marketplace add AchLim/drama-writer
/plugin install akoru@akoru
```

Or in one step on Claude Code 2.1.275 and later:

```text
/plugin install akoru --marketplace AchLim/drama-writer
```

The same commands work from a terminal as `claude plugin marketplace add AchLim/drama-writer` and `claude plugin install akoru@akoru`.

The plugin is named `akoru` and holds the drama-writer skill, so you can call it directly as `/akoru:drama-writer`. You rarely need to: Claude loads it when you ask for drama writing.

**Update.**

```bash
claude plugin marketplace update akoru
claude plugin update akoru@akoru
```

**Remove.**

```bash
claude plugin uninstall akoru@akoru
claude plugin marketplace remove akoru
```

### The skills directory

**Install.** The [`skills`](https://github.com/vercel-labs/skills) CLI reads the skill straight from this repository.

```bash
npx skills add AchLim/drama-writer -a claude-code        # this project: .claude/skills/
npx skills add AchLim/drama-writer -a claude-code -g     # all projects: ~/.claude/skills/
```

By default it links the folder from a shared copy. Add `--copy` for an independent copy.

**Update.** `npx skills update drama-writer` (add `-g` or `-p` to choose the scope).

**Remove.** `npx skills remove drama-writer`.

### The npm CLI

**Install.**

```bash
npx @akoru/drama-writer install --global      # ~/.claude/skills/drama-writer
npx @akoru/drama-writer install --project     # <project root>/.claude/skills/drama-writer
npx @akoru/drama-writer install --dir <path>  # <path>/drama-writer
```

On Windows, `--global` installs to `%USERPROFILE%\.claude\skills\drama-writer`. The project root is the nearest folder above you that contains `.git`, or the current folder outside a repository; the CLI prints the path it used.

To keep the command around: `npm install -g @akoru/drama-writer`, then `drama-writer install --global`. Installing the package never writes into your home or project folders on its own; only the `install` command does.

**Update.**

```bash
npx @akoru/drama-writer@latest update --global
```

**Remove.**

```bash
npx @akoru/drama-writer uninstall --global
```

**Check.** `drama-writer list` shows each location, the installed version, and any local changes. `drama-writer doctor` validates the skill and confirms Claude Code will find it.

**How it protects your edits.**
- Each install records a fingerprint of every file it wrote.
- `update` and `uninstall` compare the folder with that record. If you changed or added a file, they stop, list the files, and change nothing.
- `--force` goes ahead, but first copies the whole folder to a backup (by default `~/.claude/drama-writer-backups/` for global installs).
- A `drama-writer` folder the CLI didn't create is never replaced or removed without `--force`, and it's backed up first.
- If the folder is a link (as `npx skills` creates), `--force` removes the link, never the folder it points to.
- Files you deleted are restored on update without `--force`, since nothing of yours is lost.
- `--dry-run` shows what would happen and changes nothing.

| Option | Meaning |
|---|---|
| `-g, --global` | `~/.claude/skills/drama-writer` |
| `-p, --project` | `<project root>/.claude/skills/drama-writer` |
| `--dir <path>` | `<path>/drama-writer` |
| `-f, --force` | Replace or remove despite local edits or an unknown folder, after a backup |
| `--dry-run` | Report only |
| `--backup-dir <path>` | Where backups go |
| `--json` | Machine-readable `list` and `doctor` output |

Exit codes: `0` done, `1` refused or failed with nothing changed, `2` usage error.

### The single file

[`drama-writer.md`](drama-writer.md) is the skill's workflows and core rules in one file, plus the screenplay format. It leaves out the reference guides, templates, examples and runtime script. Paste it into a chat or a project's custom instructions.

### Claude.ai

Claude Code is the supported target. If you also want the skill in Claude.ai:

```bash
npx @akoru/drama-writer export-zip    # writes ./release/drama-writer-<version>.zip
```

Upload the ZIP in Claude.ai under Settings, in the Skills section. Skills in Claude.ai need code execution turned on. The menu wording changes from time to time; Anthropic's help article "How to create custom skills" has the current steps.

A Claude.ai upload and a Claude Code install are separate copies. Updating one doesn't update the other.

## Working with it

### Language

drama-writer picks the script's language in this order: what you asked for, the language of your existing project files, the language of reference material you gave it, then the language of your message. Notes and questions come back in the language you wrote to it in.

Name a variety when it matters: "Taiwan Mandarin", "Mexican Spanish", "Jakarta slang for the young characters, standard Indonesian for the parents". Name an audience to get localization (names, settings, references), not just translation.

### Length and format

Say the length in seconds. Without one, it writes a 60 to 90 second vertical episode. It treats runtime as a budget: dialogue, pauses, reactions and action all cost time.

### Series files

Keep a series bible and one file per episode in your project. drama-writer reads them before writing, keeps what each character knows and feels, and ends each episode with a "state of the story" block you can paste into the bible. It returns new episodes in the chat and saves files only when you ask.

The skill includes templates for a series bible, character profiles, outlines, screenplays and a continuity ledger. Ask Claude to fill one in.

### Production mode

Ask for "production-ready" or "a shot list" to get scene and shot IDs, durations, who is in frame and where, one main action per shot, continuity notes, and a ledger that tracks props, hands, posture and wardrobe. Before returning it, Claude checks every pair of neighbouring shots for repeated actions, props that jump, and cuts without a reason, and fixes them.

Tell it which video tool you use if it has known limits (clip length, reference images).

### Voice tags

Tags like `[whispers]` or `[pause]` are optional and used only where they change the performance. Name your text-to-speech provider and it will follow that provider's format. Providers differ: some take inline tags, some take SSML, some take a separate style instruction.

### Runtime estimator

The skill ships `scripts/estimate-runtime.mjs`. When Claude can run code, it can check a script with it. You can run it yourself:

```bash
node ~/.claude/skills/drama-writer/scripts/estimate-runtime.mjs episode.md --target 75
```

It reads scripts in the skill's screenplay format, counts speech by language (words, Chinese characters, Japanese kana and kanji, Korean syllables), adjusts for delivery and pauses, adds action beats, checks each shot's dialogue against its stated duration, and flags lines over about eight seconds. Use `-` to read from stdin and `--json` for structured output. The numbers are planning estimates, not measurements.

## Reference

### Which version do I have?

- Any route: open `VERSION` in the installed `drama-writer` folder.
- Plugin: `claude plugin list`.
- npm CLI: `drama-writer list`.

### What is in the skill

```
plugins/akoru/skills/drama-writer/
├── SKILL.md        workflows, language rules, craft rules, output format, file map
├── VERSION
├── references/     14 guides: storytelling, plot, characters, dialogue, languages,
│                   emotion and voice tags, short-form pacing, visual storytelling,
│                   scenes, shot continuity, series continuity, AI video, runtime,
│                   editorial review
├── templates/      series bible, character profile, story outline, episode outline,
│                   screenplay, continuity ledger
├── examples/       dialogue in six languages, weak vs strong storytelling,
│                   a full production episode
└── scripts/        estimate-runtime.mjs
```

### What it does not do

- Generate video, images or audio.
- Change Claude Code settings.
- Contact any service. The skill is files; the CLI works offline.
- Guarantee native-level dialogue in every language and dialect. For regional slang and less common languages, have a native speaker read the script.

## Something is wrong

**Claude doesn't use the skill.** Start a new session; skills load at startup. If you installed into a folder that didn't exist when the session began, run `/reload-skills`. For npm installs, `drama-writer doctor` reports whether Claude Code can find it.

**There are two drama-writer skills.** You installed through two routes. Keep one and remove the other with that route's remove command.

**`update` refused to run.** It found files you edited. Its message lists them. Copy what you want to keep, or run `update --force` to back up the folder and replace it.

**The plugin didn't update.** Refresh the marketplace first (`claude plugin marketplace update akoru`), then update the plugin, then start a new session.

**The dialogue in my language sounds off.** Name the variety and the audience, and say who speaks formally to whom. If it still misses, [open an issue](https://github.com/AchLim/drama-writer/issues) with the prompt and the lines that are wrong.

## Where is this going?

See [ROADMAP.md](ROADMAP.md). To help, read [CONTRIBUTING.md](CONTRIBUTING.md).
