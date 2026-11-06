# akoru

Skills for Claude Code by akoru. This plugin currently holds one skill, **drama-writer**.

## drama-writer

drama-writer helps Claude write short dramas the way a screenwriter would. It is built for vertical episodes of 15 seconds to 3 minutes, and for scripts that will become AI-generated video.

- Develop a concept, a full series plan with a series bible, or a single episode.
- Turn an episode into a production-ready shot list with scene and shot IDs, durations, and a continuity ledger that tracks props, hands, posture and wardrobe.
- Review a script and get the problems ranked by impact, each with a fix.
- Continue a series from your own episode files without contradicting what came before.
- Write natural, spoken dialogue in the language you choose. English, Indonesian, Mandarin, Korean, Japanese and Spanish have detailed notes on register, honorifics and regional speech.

Install it in Claude Code with:

```text
/plugin install akoru --marketplace AchLim/drama-writer
```

Claude uses the skill on its own when you ask for drama writing. You can also call it directly as `/akoru:drama-writer`.

## What the plugin contains

Only the skill: Markdown guidance, templates, worked examples, and one optional script that estimates a screenplay's runtime from a file you give it. The plugin has no hooks, MCP servers or agents, makes no network requests, and collects no data.

## More

Documentation, the changelog and the issue tracker are at [github.com/AchLim/drama-writer](https://github.com/AchLim/drama-writer). License: MIT.
