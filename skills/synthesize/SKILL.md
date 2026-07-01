---
name: synthesize
description: "The synthesis brain. Called by capture and refresh (never by a user directly). Consumes one or more signal packs, runs a three-pass synthesis (entity resolution, reciprocal relationship extraction, activity-log update), and emits a WRITE PLAN for note-write. Hard boundary: it hands the plan to note-write and does not write files itself."
scope: base
plain: "Turns raw signals into a precise plan of what notes to create and update, without touching any files."
---

# synthesize

> **In plain English:** this reads the packaged signals, figures out who and what they refer to, makes sure every relationship points both ways, and produces an exact plan of what to write. It never writes the files; that is the next skill's job.

Synthesize is a subagent. It is the single place where messy signals become a clean, validated write plan. It resolves entities, enforces reciprocity, and respects prior corrections. It then hands the plan to `note-write` and stops.

## Trigger

- Called by `capture` (one input) or `refresh` (a batch of packs). Not user-invoked.

## Input: signal pack(s) (from capture or an ingest subagent)

```yaml
source: <connector>
signals:
  - id: <source>-<uid>
    timestamp: <ISO>
    raw: "<text with context>"
    entities: {people: [], orgs: [], decisions: [], concepts: []}
    intents: []
    links: {source-url, attachments}
```

## The three passes

1. **Entity resolution.** Map every mentioned person, org, decision, and concept to an existing `atlas/` note or a new one. Enforce naming: people are always First plus Last. If an org is new, do not create it: emit a `clarification` op. Read `memory/continuity-log.md` first; a prior human correction overrides new signal evidence.
2. **Reciprocal relationship extraction.** For every link on side A, ensure side B carries it too (person lists org, org lists person). Build the reciprocity ledger: every proposed link is validated to exist on both sides before the plan is final. Merge into existing notes; never append a duplicate.
3. **Activity-log update.** Compose the append-only activity line(s) for the affected desk overview(s) and mark provenance. This is the last pass.

## Output: WRITE PLAN (synthesize -> note-write)

The plan is a list of ops. The op schema:

```yaml
write_plan:
  - {op: create,             path: atlas/decisions/YYYY-MM-DD - title.md, yaml: {...}, body: "..."}
  - {op: append-activity,    path: desks/<Name>/overview.md, entry: "YYYY-MM-DD  <one line>"}
  - {op: update-frontmatter, path: atlas/people/First Last.md, add-to: {related-orgs: ["[[Org]]"]}}
  - {op: enqueue-task,       path: tasks/queue.md, text: "<actionable item>"}
  - {op: clarification,      text: "New org 'X' seen x2 - create?"}   # confirmation gate, resolves nothing
  - {op: rag-change,         target: <org>, from: AMBER, to: GREEN, reason: "<evidence>"}
```

Op meanings:

- **create** - make a new note at `path` with the given frontmatter and body. Must conform to its blueprint.
- **append-activity** - add one dated line to an overview's activity log (most recent first).
- **update-frontmatter** - add values into an existing note's list fields (reciprocity edits land here).
- **enqueue-task** - add an ephemeral item to the queue for later triage.
- **clarification** - surface a confirmation gate (new org, ambiguous entity). Never resolved by synthesize; the human decides.
- **rag-change** - propose a status/RAG transition with its evidence.

## Boundary

> Hand the plan to `note-write`. Do not write files yourself. Do not call other skills. Do not create an organization; emit a `clarification` op instead.
