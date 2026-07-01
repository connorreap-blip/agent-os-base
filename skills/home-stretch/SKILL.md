---
name: home-stretch
description: "Builds the before-EOD list. Triggered around 15:00 local by a schedule, or on demand when the user asks what is left today, what still needs to ship, or for the home stretch. Reads the task layer, each desk's open items, and today's action items, filters to what is due today or before end of day, produces a short prioritized list, and hands it to notify. Reads the graph only; writes no files."
scope: base
plain: "An afternoon list of what still has to get done before end of day, sent to your Slack."
---

# home-stretch

> **In plain English:** in the mid-afternoon this pulls together the handful of things still due before you log off, puts them in priority order, and hands the list to notify so it lands in your Slack. It reads what is already in your workspace; it does not reach into any tool.

Home Stretch is a read-only reporter that answers one question: what still needs to happen before end of day. It reads the graph, filters hard to today, and hands a short list to `notify`. It writes nothing into `atlas/` or `desks/`.

## Trigger

- A schedule fires it around 15:00 local (see `heartbeat.md`).
- On demand, when the user asks: what is left today, what still needs to ship, the home stretch.

## Steps

1. **Set the window.** Now through end of day, local time.
2. **Read the task layer.** Pull items from `tasks/` that are due today or already overdue.
3. **Read each desk's open items.** For every active desk, pull open action items and next touches dated today.
4. **Pull today's action items.** Gather anything captured today that carries a same-day due.
5. **Filter to before EOD.** Keep only items due today or before end of day. Drop anything with a later date; those wait for tomorrow.
6. **Prioritize.** Order the survivors by what needs the user most: hard external deadlines first, then blockers on others, then internal work. Keep it to a short list, not an inventory.
7. **Hand off to notify.** Pass the prioritized before-EOD list to `notify` for posting to the user's own Slack. Home Stretch does not post directly.

## Output shape

```
# Home Stretch - YYYY-MM-DD

Before EOD:
1. <highest-priority item> - <desk or context> - <why it matters today>
2. <next item>
3. <next item>
```

## Boundaries

- Reads the graph only. No connector calls. No writes into `atlas/` or `desks/`.
- Posting is not its job; it hands the list to `notify`, which owns the one configured self-destination.
- If nothing is due before EOD, say so in one line rather than padding the list.
