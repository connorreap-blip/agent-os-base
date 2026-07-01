---
name: follow-up-email
description: "Drafts a post-meeting or post-thread follow-up email that sorts every open item into fixed buckets: support tickets, feature requests, outstanding questions, due dates, and next steps. Invoke after a call, meeting, or email thread when the user wants a recap that organizes what was said into action. Pulls the source, buckets the items, drafts in the right voice register, runs the voiceprint gate, and saves to shipped/. It never sends."
scope: base
plain: "After a call or thread, it writes the follow-up email for you and sorts everything into support tickets, feature requests, open questions, due dates, and next steps. It checks the voice, then saves it for you to send."
---

# follow-up-email

> **In plain English:** point it at a meeting note or an email thread. It reads the whole thing, separates the loose ends into five clear piles (tickets, feature asks, open questions, dates, next steps), writes a clean follow-up email in your voice, and saves it. You review and send.

A specialized `deliverable`. It shares that skill's contract (voice-routed, gated, saved for review, never sent) and adds a fixed extraction pass so nothing raised in the meeting falls through the cracks. Use it to turn a transcript or thread into an organized, sendable recap.

## Trigger

- User asks for a follow-up, recap, or "what came out of that meeting" email.
- Inputs: the **source** (a `meetings/` note, a Circleback transcript, a Gmail thread, or a desk's recent activity) and the **target** (the person or org it goes to).

## The five buckets (the point of this skill)

Every open item extracted from the source is sorted into exactly one:

| Bucket | What lands here |
|---|---|
| **Support tickets** | A reported problem, bug, or break that needs a fix or an existing ticket. Link the Jira/HubSpot ticket if one is known; mark `(confirm)` if not. |
| **Feature requests** | An ask for something the product does not do yet. A candidate for `atlas/decisions` or `knowledge/` downstream. |
| **Outstanding questions** | Anything unresolved or awaiting an answer, from either side. These become `(confirm)` flags and, where owned, tasks. |
| **Due dates** | Any commitment with a date. Name the owner and the date. |
| **Next steps** | Agreed actions without a hard date. Each carries an owner (me, them, or a named person). |

An item with no clear owner or date is still listed, flagged `(confirm)`, never silently dropped.

## Steps

1. **Read the source.** Extract every commitment, question, problem, ask, and date. Keep each traceable to its line in the source (provenance).
2. **Bucket.** Sort each extracted item into one of the five buckets above. If an item is genuinely two things (a bug that is also a feature ask), split it.
3. **Assign owner and date** where the source supports it; otherwise mark `(confirm)`. Never invent an owner or a deadline.
4. **Pick the register.** External (customer or partner) uses the external voice; internal uses the internal voice. See `engine/rulebook/voice-routing.md`.
5. **Draft.** A short warm opener, then the buckets as clean labeled sections (omit any empty bucket), then a close. Voice DNA rules apply (no em dashes, no arrows, no emoji).
6. **Verify (the gate).** Run `voiceprint` in verify mode. Below threshold (default 80) auto-revise and re-verify. Only a passing draft is shown.
7. **Save.** Write to `shipped/YYYY-MM/` with the authorship marker. Never send.
8. **Feed the graph (optional handback).** Return the bucketed items so the caller can route feature requests to `atlas/decisions`, questions to tasks/`(confirm)`, and tickets to the relevant desk. The email is the deliverable; the buckets are reusable signal.

## Input / output

```
input:  {source: "[[meeting or thread]]", target: "[[Person or Org]]", register: external|internal (default: infer from target)}
output: shipped/YYYY-MM/YYYY-MM-DD-followup-<target>.md   (voice score >= threshold; five buckets; empty buckets omitted)
```

## Boundaries

- Never sends. Saves a draft for review only, per `house-rules.md`.
- Every item traces to the source. No owner, date, or ticket is invented; unknowns are `(confirm)`.
- Nothing raised in the source is dropped. If it does not fit a bucket cleanly, it goes to Outstanding questions flagged for review.
- Hard voice gate: nothing below threshold reaches the human unrevised.
