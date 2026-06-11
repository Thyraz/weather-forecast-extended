## Agent skills

- In all conversations and comit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Github

- Your primary interaction with GitHub should be the git CLI.

## Plans

At the end of each plan, give me a list of unresolved questions to answer, if any.
Make the questions extremely concise. Sacrifice grammar for the sake of concision.

## Project overview

This repository contains the Weather Forecast Extended project.
Treat it as a user-facing Home Assistant custom card for HACS distribution.
Preserve existing behavior where practical and avoid unnecessary breaking changes.

## Issue analysis guidelines

- Classify issues as exactly one of: bug, enhancement, question.
- Never comment on GitHub issues.
- Never edit, close, assign, or label issues unless explicitly allowed by the workflow.
- Prefer small, backwards-compatible changes.
- Prefer /src changes.
- Do not touch /dist unless explicitly requested.
- Do not touch /docs/img unless explicitly requested.

## Branch policy

- Use `main` as the Codex working branch by default.

## Working style

- Inspect the existing repository structure and conventions before making changes.
- Prefer small, targeted changes over broad refactors.
- Do not rewrite unrelated code just to improve style or structure.
- Keep naming, formatting, and file organization consistent with the existing codebase.
- When fixing a bug, change the minimum necessary code and avoid regressions.

## Repository structure
- `/src` contains the maintained source code and is the source of truth for implementation changes.
- `/dist` contains generated build output for distribution.
- `README.md` are located in the repository root.
- `/docs/img` contains repository screenshots and is maintained manually by the repository owner.

## Workspace reference sources

- The workspace root is `/Users/tobias/Development/energy-cards`; this repository lives in `energy-custom-graph/`.
- Treat sibling folders in the workspace root as read-only reference sources unless explicitly told to edit them.
- `frontend.old/` and `frontend.new/` are Home Assistant frontend snapshots for regression comparison.
- Other sibling custom-card repositories may be present for best-practice reference implementations.

## Documentation
- Update `README.md` only when installation, usage, configuration, features, or visible behavior changes.
- Do not rewrite documentation for style alone unless explicitly asked.

## Screenshots
- Do not modify, replace, delete, rename, generate, or save files in `/docs/img` unless the user explicitly requests it.
- Assume `/docs/img` is maintained manually by the repository owner.
- If a task changes UI behavior, you may mention that screenshots could need manual review, but do not update them automatically.

## Home Assistant custom card expectations

- Keep configuration options backwards compatible where possible.
- New options should be optional and have sensible defaults.
- Prefer graceful fallbacks over hard failures.
- Keep editor behavior stable and avoid resetting user selections unintentionally.
- Most of the existing options can be set using the GUI card editor, instead of just plain YAML. Prefer to add GUI options for new features where posible.

## Pull requests and review focus

- Focus review attention on hand-written source files, especially `/src`.
- Treat `/dist` changes as expected build artifacts when they correspond to `/src` updates.
- Do not treat `/dist` as the meaningful implementation diff in pull requests.
- In summaries and reviews, describe the `/src` changes first and mention `/dist` only as generated output if relevant.
- Avoid cosmetic-only diffs unless explicitly requested.

## Output expectations

- Explain what changed and why.
- Call out assumptions clearly.
- Mention what was done in `/src`.
- Mention `/dist` only as generated output when relevant.
- If documentation or changelog updates were intentionally skipped, say why.
- If screenshots may need attention, mention that they require manual owner action unless explicitly requested.

### Issue tracker

Issues and PRDs are tracked in GitHub Issues for `Thyraz/weather-forecast-extended`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default five-label triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This repo uses a single-context domain-doc layout. See `docs/agents/domain.md`.
