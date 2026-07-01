---
title: Data Sources
scope: base
plain: "Every connector is read-only and scoped; each ingest subagent pulls a bounded slice and returns a signal pack, never writing or sending."
paths: ["skills/ingest-*/**"]
tags: [system, rulebook, connectors]
---

# Data Sources

> **In plain English:** the agent can read from your connected tools but never writes to them or sends anything; each reader grabs only the slice it was asked for and hands the findings back.

Loads when an `ingest-*` skill is in scope. This governs how the read-only ingest subagents behave. What is actually wired for a given instance, and whether the mode is manual or ambient, lives in the overlay `connectors.md` and is stated honestly (see `operating-mode.md`).

## Read-only posture (hard boundary)

- Every ingest subagent is read-only. It never sends, posts, reacts, edits, or deletes on any connector. An attempted outbound action is refused per `house-rules.md`.
- An ingest subagent hands its result back to the caller. It does not write files and does not call other skills.

## Per-connector scoping

- Each ingest is given an explicit scope (channels, labels, date window, folder) and pulls only that slice. Do not widen scope on your own.
- Output is a signal pack: a typed list of signals with entities, intents, timestamps, and source links, returned to the orchestrator. `synthesize` turns signal packs into a write plan.

## Per-source priority

- When two sources disagree, a direct human statement outranks an automated feed, and a primary record outranks a derived one. Do not silently reconcile; flag the conflict to the contradiction ledger (see `self-audit.md`).
- Treat inbound briefs skeptically. A pre-sales or handoff brief can carry errors; flag discrepancies rather than asserting them.

## Provenance

- Every signal carries its source link so the fact it becomes can trace back. Unconfirmed items are marked `(confirm)`.
