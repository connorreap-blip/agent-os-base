---
name: refresh
description: "Orchestrates a full graph refresh from connectors. Invoke when the user runs /refresh, asks to sync, pull updates, catch up on Slack/email/calendar, or when a /loop fires it on a cadence. Dispatches the read-only ingest subagents in parallel, synthesizes their packs, writes the results, and updates MEMORY and the rundown. Requires connectors to be wired; otherwise use capture on brought inputs."
scope: base
plain: "Pulls what is new from your connected tools, files it, and updates what the agent remembers."
---

# refresh

> **In plain English:** this reaches into your connected tools (read-only), gathers what is new, files all of it, and updates memory and your briefing. It is the connector-driven version of capture.

Refresh is the top orchestrator for connector ingestion. It fans out the ingest subagents in parallel, collects their signal packs, hands them to `synthesize` as one batch, sends the resulting write plan to `note-write`, then refreshes the memory index and the daily rundown.

## Trigger

- User runs `/refresh`, or asks: sync, pull updates, catch me up.
- A `/loop` fires it on a cadence during a session.
- Requires connectors in `connectors.md`. With none wired, use `capture` on human-brought inputs instead.

## Steps

1. **Scope the window.** Determine the time range and which connectors to read (default: since last refresh).
2. **Dispatch ingest subagents in parallel.** Send one scope to each configured ingest skill: `ingest-slack`, `ingest-gmail`, `ingest-calendar`, `ingest-notion`, `ingest-circleback`. Each is read-only and returns a signal pack. Do not call an ingest skill that has no `SKILL.md` on disk; the keeper flags phantoms.
3. **Collect the packs.** Wait for all; drop any that returned empty.
4. **Synthesize.** Hand the combined packs to `synthesize`. It resolves entities across sources, enforces reciprocity, and returns one write plan.
5. **Write.** Hand the write plan to `note-write` for execution.
6. **Update memory.** Refresh the `MEMORY.md` index; the invoke-count hook has already stamped anything read this session.
7. **Update the rundown.** Call `daily-rundown` to regenerate the briefing from the freshly written graph.
8. **Report** the counts: signals in, notes written, tasks enqueued, clarifications pending.
9. **Notify.** In ambient mode, hand the synthesized digest and any urgent flags to the `notify` skill (urgent items post immediately per `engine/rulebook/urgency.md`; the rest go in the scheduled digest). Notify posts only to the user's own configured self-destination.

## Delegation

```
refresh -> [ingest-slack, ingest-gmail, ingest-calendar, ingest-notion, ingest-circleback]  (parallel, read-only)
        -> synthesize -> note-write -> (update MEMORY.md, daily-rundown) -> notify (digest + urgent)
```

This map must match `engine/operator.md` and `skills/menu.md`.

## Boundaries

- Every ingest subagent is read-only. An attempt to send, edit, or delete via a connector is refused per `house-rules.md`.
- Orchestrates only; the write happens in `note-write`, not here.
- Honest operating mode: if a connector is not wired, say so; do not fabricate a pull.
