# Domain Docs

This repo uses a single-context domain-doc layout.

## Before exploring, read these

- `CONTEXT.md` at the repo root.
- `docs/adr/` for architectural decisions that touch the area you're about to work in.

If either path does not exist, proceed silently. Do not flag its absence or suggest creating it upfront. The producer skill (`/grill-with-docs`) creates these files lazily when terms or decisions get resolved.

## Use the glossary's vocabulary

When output names a domain concept, use the term as defined in `CONTEXT.md`. Do not drift to synonyms the glossary explicitly avoids.

If the concept is not in the glossary yet, either reconsider the language or note the gap for `/grill-with-docs`.

## Flag ADR conflicts

If output contradicts an existing ADR, surface it explicitly rather than silently overriding.
