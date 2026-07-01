---
name: meeting-agenda-email
description: "Drafts a pre-meeting agenda email. Invoke before a scheduled call or meeting when the user wants to send an agenda. Pulls the target's open items, last meeting's next steps, unanswered questions, and upcoming due dates from the graph, builds a structured agenda (objective, topics, decisions needed, open questions, pre-reads), drafts in the right voice register, runs the voiceprint gate, and saves to shipped/. It never sends."
scope: base
plain: "Before a meeting, it writes the agenda email for you: what the meeting is for, what to cover, what to decide, and what is still open, pulled from everything the system already knows about that account. It checks the voice, then saves it for you to send."
---

# meeting-agenda-email

> **In plain English:** tell it who the meeting is with. It looks up where that account stands (open items, last meeting's follow-ups, unanswered questions, upcoming dates), turns that into a tight agenda, writes it as an email in your voice, and saves it. You review and send.

A specialized `deliverable`. It shares that contract (voice-routed, gated, saved for review, never sent) and adds an agenda-assembly pass that reads the graph so the agenda reflects the real state of the relationship, not a blank template.

## Trigger

- User asks for a meeting agenda, a pre-read, or "an agenda email for the call with X."
- Inputs: the **target** (person, org, or a specific upcoming meeting) and optionally the **objective** (what this meeting is meant to achieve).

## What it assembles (read from the graph, not invented)

1. **Carryover.** The `next steps` and open items from the target's last `meetings/` note and its desk, with status.
2. **Open questions.** Anything on the desk marked `(confirm)` or unresolved that this meeting could settle.
3. **Decisions pending.** Items in `atlas/decisions` tied to this target that await a call.
4. **Upcoming dates.** Due dates or milestones on the horizon for this account.
5. **Objective.** The stated objective if given; otherwise inferred from the carryover and flagged `(confirm)` for the user to confirm.

## Steps

1. **Gather context.** Read the target's `atlas/` and `desks/` notes: last meeting, open items, pending decisions, upcoming dates. Every line traces to a source.
2. **Build the agenda structure.** Objective, then a short ordered list of topics (each a talking point with the carryover or question behind it), then Decisions needed, then Open questions, then any Pre-reads. Keep it tight; an agenda that lists everything decides nothing.
3. **Pick the register.** External (customer or partner) uses the external voice; internal uses the internal voice. See `engine/rulebook/voice-routing.md`.
4. **Draft.** A brief opener naming the meeting and its objective, the agenda body, and a close inviting additions. Voice DNA rules apply (no em dashes, no arrows, no emoji).
5. **Verify (the gate).** Run `voiceprint` in verify mode. Below threshold (default 80) auto-revise and re-verify. Only a passing draft is shown.
6. **Save.** Write to `shipped/YYYY-MM/` with the authorship marker. Never send.
7. **Report** the path, the final voice score, and any `(confirm)` items the user should resolve before sending.

## Input / output

```
input:  {target: "[[Person or Org or Meeting]]", objective: "<optional>", register: external|internal (default: infer from target)}
output: shipped/YYYY-MM/YYYY-MM-DD-agenda-<target>.md   (voice score >= threshold; agenda reflects real desk state)
```

## Boundaries

- Never sends. Never creates the calendar event (suggest a time block only, per `house-rules.md`). Saves a draft for review.
- Agenda items trace to the graph. Nothing about the account is fabricated; gaps are `(confirm)`.
- Hard voice gate: nothing below threshold reaches the human unrevised.
