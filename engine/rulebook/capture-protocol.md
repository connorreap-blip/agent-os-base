---
title: Capture Protocol
scope: base
plain: "Every input runs an ordered pass, overview to people to decisions to meetings to deliverables to knowledge to the activity log, so nothing useful is lost and logging comes last."
paths: ["desks/**", "atlas/**"]
tags: [system, rulebook]
---

# Capture Protocol

> **In plain English:** when something comes in (a call, an email, a doc), the agent files every useful fact everywhere it belongs, in a fixed order, and only writes "this happened" as the very last step.

Loads when a file under `desks/` or `atlas/` is in scope. Every input is intelligence, not just an event. The `capture` skill runs this pass, then hands off to `synthesize` and `note-write`.

## The ordered routing pass

Run these in order for every input. Do not skip a step because the input "looks like" only one thing; an input usually touches several.

1. **Overview.** Update the affected desk's `overview.md`: state, stage, focus, next touch, any status or RAG change (with a reason).
2. **People.** Create or update each mentioned person's atlas card (First and Last naming). A new person is autonomous. A new org for that person is confirm-first.
3. **Decisions.** Capture any decision as its own dated atlas card, with the why and its reversibility.
4. **Meetings.** File the meeting note (the raw transcript is archive, not intelligence); link attendees, decisions, and deliverables.
5. **Deliverables.** Note any artifact promised or produced; link it to the desk.
6. **Knowledge.** Route any reusable product or domain fact into the relevant knowledge note, merged in place, with source traceability.
7. **Activity log.** Only now, append the event line to the desk's activity log, most-recent-first.

Then, if the input touches more than one account, add the cross-account roll-up.

## The discipline

- Logging the event is the last step, not the only one. An input that produced only an activity-log line was not captured; it was merely noted.
- Reciprocity and merge-in-place are enforced by `synthesize` (see `synthesis.md`).
- Unconfirmed facts are flagged `(confirm)`, never asserted (see `self-audit.md`).
