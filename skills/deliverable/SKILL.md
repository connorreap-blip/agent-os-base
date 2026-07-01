---
name: deliverable
description: "Generates a voiced deliverable. Invoke when the user asks to draft an email, brief, deck, summary, recap, or message for a person or account. Takes an input type and a target, drafts in the right voice register, runs the voiceprint verify gate, and saves to shipped/. It never sends. Replaces per-item build scripts with one general skill."
scope: base
plain: "Drafts something in your voice, checks it really sounds like you, and saves it for review. It never sends."
---

# deliverable

> **In plain English:** tell it what to make and who it is for. It writes a first draft in the right voice, scores it against your voiceprint, fixes it if it falls short, and saves it for you to review. Sending is always your call.

Deliverable is the one general skill for producing written artifacts. It replaces a pile of per-account build scripts. It routes by audience, drafts, gates on a numeric voice score, and saves. It never transmits.

## Trigger

- User asks to draft: email, brief, deck, recap, summary, message.
- Inputs: the **type** (what to make) and the **target** (who or which account it is for).

## Steps

1. **Gather context.** Read the target's `atlas/` and `desks/` notes for facts, decisions, and recent activity. Every asserted fact traces to a source; mark anything unverified `(confirm)`.
2. **Pick the register.** External (customer/partner) uses the external voice; internal/personal uses the internal voice. See `engine/rulebook/voice-routing.md`.
3. **Draft.** Write using the Voice DNA editorial rules (banned phrases, no em dashes, register deltas) plus the generated cadence targets.
4. **Verify (the gate).** Run `voiceprint` in verify mode against the chosen register. It returns a numeric score (0 to 100).
5. **Enforce the threshold.** If the score is below threshold (default 80), auto-revise against the reported deviations and re-verify. Only a passing draft is shown to the human.
6. **Save.** Write to `shipped/YYYY-MM/` with a hidden authorship marker in metadata (so the sent-message loop can later match your edits). Never send.
7. **Report** the path and the final voice score.

## Input / output

```
input:  {type: email|brief|deck|recap|summary|message, target: "[[Person or Org]]", intent: "<what it should achieve>"}
output: shipped/YYYY-MM/YYYY-MM-DD-<type>-<target>.md   (voice score >= threshold, authorship marker set)
```

## Boundaries

- Never sends, posts, or transmits. Saves a draft for review only.
- Hard voice gate: nothing below threshold reaches the human unrevised.
- Facts trace to sources; unverified items are marked `(confirm)`, never asserted.
