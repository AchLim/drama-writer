# Security

## Supported versions

Only the latest release gets fixes. Check yours by opening `VERSION` in the installed skill folder.

## Reporting a problem

Please report security problems privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**. Don't open a public issue for them.

Include what you ran, what happened, and what you expected. You'll get a reply once the report has been read; fixes ship as a new release with a note in the changelog.

## What the skill does

The skill is Markdown files plus one optional script, `scripts/estimate-runtime.mjs`. That script reads the one screenplay file you pass it (or stdin), prints an estimate, and does nothing else: no network access, no writing files, no other files read.

The skill tells Claude to treat your project files as story material and to save files only when you ask.

## What the npm CLI does

- Copies the bundled skill folder into the destination you choose (`--global`, `--project`, or `--dir`), into a folder named `drama-writer`.
- Writes one record file, `.drama-writer-install.json`, inside that folder.
- Before replacing or removing a folder that holds your edits, or one it didn't create, copies it to a backup folder (default: `drama-writer-backups` next to the skills directory). It does this only with `--force`.
- Writes `release/drama-writer-<version>.zip` when you run `export-zip`.

## What it never does

- Run anything when the package is installed. There is no `postinstall` script.
- Touch other skills, Claude Code settings, or any file outside the folders above.
- Follow a symbolic link to delete its target.
- Make network requests or collect telemetry.
- Depend on other npm packages at runtime.

The plugin route is handled by Claude Code itself, which downloads this repository; the plugin contains only the skill, no hooks, MCP servers or agents.
