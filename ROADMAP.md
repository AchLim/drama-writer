# drama-writer: Roadmap

## Table of Contents
- [Where we are](#where-we-are)
- [Release history](#release-history)
- [What's next](#whats-next)
- [Not in scope](#not-in-scope)

## Where we are

**v1.1.0** is the current release, for Claude Code. It ships:

- The skill: six workflows, 14 reference guides, six templates, five worked examples, and a runtime estimator.
- Since v1.0.0: hook engines and a hook testing process, re-hooks and ending cuts, a payoff ladder for series, and writing for the voice with a per-line delivery sheet.
- Three ways to install: the Claude Code plugin, `npx skills add`, and the npm CLI, plus a single-file edition.
- An eval set of 17 writing scenarios run through headless Claude Code, with a written review of every output in [`evals/QUALITATIVE-EVALUATION.md`](evals/QUALITATIVE-EVALUATION.md).

## Release history

Every release is listed in [CHANGELOG.md](CHANGELOG.md).

## What's next

These are candidates, not promises. Issues and pull requests can change the order.

- **More language notes.** Detailed guidance for Thai, Vietnamese, Tagalog, Hindi, Brazilian Portuguese and Arabic, written or reviewed by native speakers.
- **Voice-provider notes.** Exact tag and markup formats for specific text-to-speech providers, checked against their current documentation and dated.
- **Repeated eval runs.** Several runs per scenario, so the review can talk about consistency, not just one sample.
- **Listening tests.** Voice the outputs of scenarios 06 and 17 with two or three TTS tools and record whether the delivery sheet improves the result.
- **Retention review.** A rubric for scenario 16 and future series openers that scores the viewer's want, re-hooks and the ending cut, so hook quality can be compared across releases.
- **More examples.** A full continuation episode, a three-language localization of one scene, and a review of a weak script with its rewrite.
- **Other agents.** Plugin manifests for agents beyond Claude Code, once the Claude Code version has settled.

## Not in scope

- Generating video, images or audio. drama-writer writes the material those tools take in.
- A web app, dashboard or hosted service.
- Automatic syncing between Claude Code and Claude.ai.
