---
title: Synthesis
scope: base
plain: "The three-pass engine that turns signals into a write plan: resolve entities, extract links both ways, update the activity log, merging in place while your past corrections win."
paths: ["atlas/**", "desks/**"]
tags: [system, rulebook]
---

# Synthesis

> **In plain English:** when new information comes in, the agent works out who and what it is about, updates both sides of every relationship, and refreshes the summary in place instead of piling on duplicates. Your earlier corrections always beat a fresh guess.

Loads when a file under `atlas/` or `desks/` is in scope. Synthesis runs on every human-brought input (it is guaranteed to fire because a person brought the input), not on a schedule the environment cannot honor. The `synthesize` skill owns this engine and hands a write plan to `note-write`; it writes no files itself.

## The three passes (in order)

1. **Entity resolution.** Match each mentioned person, org, decision, and term to an existing card. Resolve aliases and near-duplicates to one canonical file. If an entity is new and is an organization or desk, do not create it; emit a clarification for confirmation (see the confirmation gate in `atomic-notes.md`).
2. **Reciprocal relationship extraction.** For every relationship found, record it on both sides. If a person now relates to an org, the person's `related-orgs` gains the org and the org's `key-contacts` gains the person. Build a reciprocity ledger and validate that every link on side A also exists on side B before any write executes.
3. **Activity-log update.** Append what happened to the relevant desk's activity log, most-recent-first. Update the auto `last-*` timestamps. Logging is the last step, not the only one (see `capture-protocol.md`).

## Merge, do not append

- Overviews and knowledge notes refine in place. Update the existing line or paragraph rather than stacking a new duplicate below it. Append-duplicate is a drift source the keeper flags.

## Corrections win

- Read the continuity log and any prior corrections first. A past human correction outranks new signal evidence. A direct statement from the person outranks an indirect or automated source. Note the discrepancy rather than overwriting silently.

## Idempotency

- A processed ledger (a `processed` flag on sources and meetings, or a processed-transcripts list) prevents reprocessing the same input. Check it before mining a source; stamp it after.

## Output

- The engine emits a write plan of typed ops (`create`, `append-activity`, `update-frontmatter`, `enqueue-task`, `clarification`, `rag-change`) and hands it to `note-write`. Boundary: synthesis does not write files.
