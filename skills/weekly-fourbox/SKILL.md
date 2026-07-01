---
name: weekly-fourbox
description: "Produces a generic weekly leadership update in four boxes: highlights, lowlights, blockers, priorities. Invoke when the user asks for a four-box, weekly update, status update, or leadership summary, or when a weekly schedule fires it. Reads the graph and writes to shipped/. It never sends."
scope: base
plain: "A one-page weekly update in four boxes: what went well, what didn't, what's stuck, what's next."
---

# weekly-fourbox

> **In plain English:** a simple weekly update in four boxes. It reads what happened across your work and fills in the wins, the misses, the blockers, and next week's priorities, then saves it for you.

Weekly-fourbox is a recurring leadership update. The base version is generic, so it works for any role; an overlay can extend it to bind to specific accounts. It reads the graph and writes to `shipped/`; it never transmits.

## Trigger

- User asks: four-box, weekly update, status update, leadership summary.
- A weekly schedule fires it (see `heartbeat.md`).

## Steps

1. **Set the window.** The last seven days (ET).
2. **Read the graph.** Pull recent activity across desks, resolved and open decisions, task movement, and open questions from the ledgers.
3. **Fill the four boxes:**
   - **Highlights** - what went well, with the evidence line.
   - **Lowlights** - what slipped or underperformed.
   - **Blockers** - what is stuck and what it needs to move.
   - **Priorities** - the top items for next week.
4. **Verify voice.** If the update is external-facing, run it through the `voiceprint` gate per `engine/rulebook/voice-routing.md`.
5. **Save** to `shipped/YYYY-MM/YYYY-MM-DD-fourbox.md`.
6. **Report** the path.

## Output shape

```
# Weekly Four-Box - week of YYYY-MM-DD

## Highlights
- <win> (<source>)

## Lowlights
- <miss> (<source>)

## Blockers
- <what is stuck> - needs <what>

## Priorities
- <top item for next week>
```

## Boundaries

- Reads the graph; does not write into `atlas/` or `desks/`.
- Output is a draft in `shipped/`; it is never sent.
- Every claim traces to a source; unverified items are marked `(confirm)`.
