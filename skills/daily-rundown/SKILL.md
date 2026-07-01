---
name: daily-rundown
description: "Reads the current graph and writes a dated briefing. Invoke when the user asks for a rundown, daily brief, what's going on, catch me up on my accounts, or when a schedule fires it. Reads notes only; calls no connectors. Add --weekly for the wider weekly review."
scope: base
plain: "A short dated briefing built from your notes: what changed, what's next, what needs you."
---

# daily-rundown

> **In plain English:** this reads what is already in your workspace and writes you a short, dated briefing. It does not reach into any tool; run refresh first if you want fresh data.

Daily-rundown is a read-only reporter. It never ingests from connectors and never writes into the graph; it only reads the graph and writes one briefing file to `shipped/`. To brief on fresh data, run `refresh` first.

## Trigger

- User asks: rundown, daily brief, what's going on, catch me up.
- A schedule fires it (see `heartbeat.md`).
- `--weekly` produces the wider weekly review (the base standing output).

## Steps

1. **Set the window.** Today (ET) for the daily; the last seven days for `--weekly`.
2. **Read the desks.** For each active desk, pull `current-focus`, `next-touch`, RAG status, and the most recent activity lines.
3. **Read the task layer.** Surface due and overdue items from `tasks/tasks.md` and anything hot in `tasks/queue.md`.
4. **Read the open questions.** Pull unresolved lines from the contradictions and gaps ledgers.
5. **Assemble the briefing** in the shape below.
6. **Write** to `shipped/YYYY-MM/YYYY-MM-DD-rundown.md` (or `-weekly-review.md`).
7. **Report** the path and a one-line summary.

## Briefing shape

```
# Rundown - YYYY-MM-DD

## What changed
- <account>: <the meaningful delta>

## What's next
- <account>: <next touch and date>

## Needs you
- <decision, confirmation, or blocker awaiting the human>

## Open questions
- <unresolved contradiction or gap>
```

## Boundaries

- Reads the graph only. No connector calls. No writes into `atlas/` or `desks/`.
- Output goes to `shipped/`; it is a briefing, not a record of truth.
- States plainly when data is stale (no refresh since the last window).
