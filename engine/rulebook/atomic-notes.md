---
title: Atomic Notes
scope: base
plain: "One reusable card per person, org, decision, term, or source, named by rule and cross-linked both ways."
paths: ["atlas/**", "desks/**"]
tags: [system, rulebook]
---

# Atomic Notes

> **In plain English:** every person, company, decision, and term gets exactly one card, named a set way, and any link you add on one card gets added on the other card too.

Loads when a file under `atlas/` or `desks/` is in scope. The exact frontmatter schemas live in `engine/blueprints/`; this file governs how notes are named, split, and linked.

## One entity per file

- One person, one org, one decision, one term, one source per file. If a fact is reused across accounts, it lives once in `atlas/` and is linked, never copied into each desk.
- Aggregate what is read together, atomize what is reused apart. Account state is read as a unit and lives in `desks/<Name>/overview.md`; people and decisions are read across accounts and live in `atlas/`, linked from the desk.
- Never duplicate a person or decision into a desk folder. Link to the atlas card instead.

## Naming

- People: `atlas/people/<First Last>.md`. Always First and Last. A single-name file is a lint failure.
- Orgs: `atlas/orgs/<Name>.md`.
- Decisions: `atlas/decisions/YYYY-MM-DD - <title>.md`.
- Terms: `atlas/terms/<Term>.md`.
- Sources: `atlas/sources/YYYY-MM-DD - <title>.md`.
- Dates are ISO (`YYYY-MM-DD`). The `last-*` fields are auto-updated on capture; never hand-edit them.

## Wikilinks and reciprocity

- Links are `[[Exact File Title]]`. Every relationship is bidirectional: if a person lists an org, the org lists the person. `synthesize` builds and validates this reciprocity ledger before `note-write` runs (see `synthesis.md`).
- No dangling links. Do not write `[[X]]` unless `X` exists or is queued to be created in the same run. The linter flags dangling links on write.

## The confirmation gate

- Creating a new person, decision, term, or source: autonomous, per the blueprint schema.
- Creating a new organization or desk: confirm first. Do not create it silently. Surface it as a clarification ("New org 'X' seen twice, create?") and wait. This gate is a house rule (`house-rules.md` Section 1); it is enforced here, not optional.

## Body and provenance

- Frontmatter validates against `engine/blueprints/<type>.md`. A field not in the blueprint is schema drift and a keeper finding.
- Unconfirmed facts are marked `(confirm)` inline or via the `confidence` field, never asserted. Every asserted fact traces to a source.
