---
name: capture
description: "Orchestrates the capture protocol on a single raw input (a transcript, email, note, message, or document). Invoke when a new input arrives to be filed, when the user says capture this, process this, file this, or log this call, or automatically when a raw asset lands in a desk. Routes the input everywhere it matters and emits a write plan; it does not write files itself."
scope: base
plain: "Takes one thing that came in and files every useful fact from it into the right places."
---

# capture

> **In plain English:** when something comes in (a call, an email, a doc), this routes every useful fact to where it belongs, then hands a plan to the writer. Logging that it happened is the last step, not the only step.

Capture is the orchestrator for one input. It runs the ordered routing pass from `engine/rulebook/capture-protocol.md`, then hands a signal pack to `synthesize`, which returns a write plan for `note-write` to execute. Capture never writes files.

## Trigger

- A raw input needs filing (transcript, email, note, message, document).
- User says: capture this, process this, file this, log this call.
- A raw asset appears in `desks/<Name>/raw-assets/`.

## Steps

1. **Identify the input.** Type, source, date, and which account or entity it concerns. Create or update the matching `atlas/sources/` card so provenance is traceable.
2. **Idempotency check.** If the source is already `processed: true`, stop and report "already captured." Do not reprocess.
3. **Run the routing pass, in order** (from `capture-protocol.md`). For each stage, extract what the input adds:
   - Overview (account state, RAG, stage)
   - People (who was involved; First plus Last)
   - Decisions (what was decided, and why)
   - Meetings (the raw record, as archive)
   - Deliverables (anything to produce)
   - Knowledge (product or domain facts, merged not appended)
   - Activity log (the event line; this is last)
4. **Build the signal pack** in the schema below.
5. **Hand the pack to `synthesize`.** It resolves entities, enforces reciprocity, and returns a write plan.
6. **Hand the write plan to `note-write`** for execution.
7. **Report** what was captured and where it landed.

## Output: signal pack (capture -> synthesize)

```yaml
source: <input-type>          # transcript | email | note | message | document
signals:
  - id: <source>-<uid>
    timestamp: <ISO>
    raw: "<text with enough context to resolve entities>"
    entities: {people: [], orgs: [], decisions: [], concepts: []}
    intents: []                # e.g. ["decision-made", "task-implied", "status-change"]
    links: {source-url: null, attachments: []}
# Boundary: hand back to caller. Do not write files. Do not call other skills.
```

## Boundaries

- Runs the full protocol; logging the event is the last step, never the only one.
- Emits a write plan via synthesize; does not write files itself.
- Flags a new organization for confirmation; never creates one silently.
- Marks unverified facts `(confirm)`; never asserts them.
