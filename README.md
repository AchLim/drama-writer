<div align="center">

# drama-writer

### A Claude Code skill that writes short dramas the way a screenwriter would.

Vertical episodes, series bibles, natural dialogue in your language, and shot lists that AI video tools can actually produce.

[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757?style=flat-square)](#install)

**[Guide](GUIDE.md) · [Install](#install) · [What it does](#what-it-does) · [Before and after](#before-and-after) · [FAQ](#faq)**

</div>

---

## What it does

Ask Claude for a drama and drama-writer takes over the craft: the hook in the first two seconds, a twist the audience could have seen coming, characters who don't all sound the same, and an episode that fits the runtime you asked for.

- **Six ways to work.** Develop a concept, build the story and series bible, write an episode, turn it into a production-ready shot list, review a script, or continue from your existing episode files.
- **Dialogue that sounds spoken.** Subtext, interruptions, and register that fits who is talking to whom, in English, Indonesian, Mandarin, Korean, Japanese, Spanish, and other languages. You can brief Claude in one language and get the script in another.
- **Continuity you don't have to police.** Every shot starts where the last one ended. Props stay in the hand that picked them up. A continuity ledger tracks what changed.
- **Staging for AI video.** One or two people per shot, one action, one camera move. Hard moments like a crash or a slap get broken into shots a generator can manage, without cutting them from the story.
- **Runtime that adds up.** Speech rates by language and delivery, plus pauses and action, with an optional script that checks the math.

The 60 to 90 second vertical episode is the default. Fifteen-second micro dramas, 2 to 3 minute episodes and longer scenes work too.

## Before and after

The same moment, written twice. Both versions are from the skill's own examples.

**Without the skill's rules**
```
SARAH: David, I found out that you took out a loan against our house without telling me. I feel so betrayed.
DAVID: Sarah, I'm sorry. I did it because the business was failing and I didn't want you to worry.
SARAH: How could you do this to me? We promised to share everything!
```

**With them**
```
Sarah sits at the kitchen island. A bank envelope, already opened, under her hand.

SARAH: The bank called. They wanted to confirm your new number.
DAVID: Okay.
SARAH: Your new number, David.
DAVID: It's a work thing--
SARAH: Two hundred thousand is a work thing?

He reaches for the envelope. She doesn't move her hand.
```

The first version names the feeling and explains the motive. The second lets an envelope and one detail do it, and Sarah stays in control of the scene.

## Install

Pick one route. Installing the same skill twice gives Claude two copies with the same name.

### Claude Code plugin (recommended)

Inside Claude Code:

```text
/plugin marketplace add AchLim/drama-writer
/plugin install akoru@akoru
```

On Claude Code 2.1.275 or later, one line does both:

```text
/plugin install akoru --marketplace AchLim/drama-writer
```

The plugin is named `akoru`, so the skill is available as `/akoru:drama-writer`, and Claude also picks it up on its own when you ask for drama writing.

### The skills directory

```bash
npx skills add AchLim/drama-writer -a claude-code        # this project
npx skills add AchLim/drama-writer -a claude-code -g     # all your projects
```

### npm

```bash
npx @akoru/drama-writer install --global     # all your projects
npx @akoru/drama-writer install --project    # this project only
```

Or install the CLI once with `npm install -g @akoru/drama-writer` and run `drama-writer install --global`. The CLI checks for your own edits before it updates or removes anything, and backs them up first. Node.js 18.17 or newer.

### The single file

[`drama-writer.md`](drama-writer.md) holds the workflows and core rules in one file. Paste it into a chat or a project's instructions when you can't install a skill.

Every route, step by step, with update and removal: [GUIDE.md](GUIDE.md#install-update-and-remove).

## Use it

Talk to Claude the way you'd brief a writer. Some starting points:

| You want | Try |
|---|---|
| Concepts | "Three concepts for a vertical revenge drama set in a Jakarta hospital." |
| A full series plan | "Develop concept 2: synopsis, characters, reveals, a 30-episode breakdown, and a series bible." |
| An episode | "Write episode 4, 75 seconds, in Korean." |
| A shot list for AI video | "Make episode 4 production-ready: shot IDs, durations, continuity ledger." |
| A second opinion | "Review this script for dialogue, pacing and continuity, then fix it." |
| The next episode | "Read the files in ./series and write episode 5." |
| Voice-ready dialogue | "Add ElevenLabs performance tags only where they help." |

Keep your series bible and episodes as files in the project. drama-writer reads them before writing and never invents past events.

## Update

| Installed with | Update with |
|---|---|
| Plugin | `claude plugin marketplace update akoru`, then `claude plugin update akoru@akoru` |
| Skills directory | `npx skills update drama-writer` |
| npm | `npx @akoru/drama-writer@latest update --global` (or `--project`) |

Skills load when a session starts, so open a new Claude Code session after updating. To check which version you have, read the `VERSION` file in the installed skill folder.

## FAQ

**Does it make the video or the voice?**
No. It writes the script, the shot list and the performance notes. You take those into your video and voice tools.

**Which languages?**
Any language Claude writes well. English, Indonesian, Mandarin, Korean, Japanese and Spanish have detailed notes on register, honorifics and regional speech. For other languages the skill follows a checklist and tells you which choices a native speaker should review.

**Can I change the skill?**
Yes. Edit the files in the installed folder. If you installed with the npm CLI, `update` will stop and list your edits instead of overwriting them.

**Does it work in Claude.ai?**
Claude Code is the target for now. The npm CLI can build a ZIP for Claude.ai (`drama-writer export-zip`), but a Claude.ai upload and a Claude Code install are separate copies that never sync. See [GUIDE.md](GUIDE.md#claudeai).

**How much context does it use?**
Claude Code estimates about 180 tokens in every session for the skill's description, and about 3,500 when the skill runs. Longer reference guides load only for the tasks that need them.

## Project

- [GUIDE.md](GUIDE.md): the full walkthrough
- [ROADMAP.md](ROADMAP.md): where this is going
- [CHANGELOG.md](CHANGELOG.md): what changed in each release
- [CONTRIBUTING.md](CONTRIBUTING.md): how to propose a change
- [SECURITY.md](SECURITY.md): what the installer touches, and how to report a problem
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

Found a scene the skill wrote badly, or a bug in the installer? [Open an issue](https://github.com/AchLim/drama-writer/issues).

## License

MIT: [LICENSE](LICENSE)
