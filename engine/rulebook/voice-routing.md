---
title: Voice Routing
scope: base
plain: "Pick the register by audience (internal vs external), write to the voice rulebook, then gate the draft through a numeric voiceprint check before anyone sees it."
paths: ["voice/**", "shipped/**"]
tags: [system, rulebook, voice]
---

# Voice Routing

> **In plain English:** the agent matches the writing to who is reading it, then runs a check that scores whether it actually sounds like you before showing it to you.

Loads when a file under `voice/` or `shipped/` is in scope. The mechanism is the `voiceprint` skill (`skills/voiceprint/`); this file is only the routing and the gate.

## Register selection

- Writing to a customer or partner (external): use the external register.
- Writing internally or personally: use the internal register.
- Register is a first-class dimension of the voice profile, so `voiceprint:verify` scores against the right register, not an averaged blend.

## The two-part voice system

- **Voiceprint** (the engine, base): measures your style and scores a draft. Two modes: intake/refresh (build the profile from writing samples, occasional) and verify (score a specific draft, every deliverable). Do not touch its core contract.
- **Voice DNA** (the rulebook, overlay data): two zones. A generated zone (cadence and signature targets, refreshed from intake, marked do-not-hand-edit) and an editorial zone (banned phrases, the no-em-dash rule, fatal patterns, register deltas). The editorial zone is hand-authored decisions the engine never overwrites.

## The verify gate

- Every deliverable passes `voiceprint:verify` as a numeric gate before it is shown. Verify emits a score per register.
- Below threshold (default 80 of 100): auto-revise and re-verify before showing the human. Do not surface a failing draft.
- The `deliverable` skill enforces this gate; it is not optional.

## Learning from what you actually sent

- When the human edits a drafted deliverable, a hook diffs pre and post and appends the delta to `voice/corrections.md`.
- The sent-message loop (read-only) matches an agent-authored draft to the message you actually sent, classifies the change (trivial, moderate, substantive), and appends impactful deltas plus editorial candidates. Guardrails, non-negotiable: read-only (never sends, edits, or deletes), agent-authored only (matched by the authorship marker, never your organic writing), and store deltas and classifications, not full message bodies.
