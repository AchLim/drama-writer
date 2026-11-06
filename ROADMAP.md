# drama-writer: Roadmap

## Table of Contents
- [Where we are](#where-we-are)
- [Release history](#release-history)
- [What's next](#whats-next)
- [Not in scope](#not-in-scope)

## Where we are

**v1.0.0** is the first release, for Claude Code. It ships:

- The skill: six workflows, 14 reference guides, six templates, three worked examples, and a runtime estimator.
- Three ways to install: the Claude Code plugin, `npx skills add`, and the npm CLI, plus a single-file edition.
- An eval set of 15 writing scenarios run through headless Claude Code, with a written review of every output in [`evals/QUALITATIVE-EVALUATION.md`](evals/QUALITATIVE-EVALUATION.md).

## Release history

Every release is listed in [CHANGELOG.md](CHANGELOG.md).

## What's next

These are candidates, not promises. Issues and pull requests can change the order.

- **More language notes.** Detailed guidance for Thai, Vietnamese, Tagalog, Hindi, Brazilian Portuguese and Arabic, written or reviewed by native speakers.
- **Voice-provider notes.** Exact tag and markup formats for specific text-to-speech providers, checked against their current documentation and dated.
- **Repeated eval runs.** Several runs per scenario, so the review can talk about consistency, not just one sample.
- **More examples.** A full continuation episode, a three-language localization of one scene, and a review of a weak script with its rewrite.
- **Other agents.** Plugin manifests for agents beyond Claude Code, once the Claude Code version has settled.
- **A plugin icon**, for listing in plugin directories.

## Not in scope

- Generating video, images or audio. drama-writer writes the material those tools take in.
- A web app, dashboard or hosted service.
- Automatic syncing between Claude Code and Claude.ai.
