---
name: voiceprint
description: The voice engine. Two modes. Intake/refresh builds or updates a stylometry style-profile from writing samples. Verify scores a specific draft against that profile per register and emits a 0-to-100 numeric gate. Use whenever prose must read as authored by the user (posts, essays, emails, internal updates), to refresh the profile from new samples, or to log a correction after the user edits a draft. This file is the mechanism only. It holds no personal profile data.
scope: base
plain: "Measures a person's writing style, then scores drafts against it with a number. The engine only; the actual voice lives in the overlay."
---

# voiceprint

> **In plain English:** this is the machine that learns how you write and then checks whether a draft actually sounds like you, giving it a score out of 100. It does not contain your voice. Your voice profile is built into your overlay when you run intake.

Voiceprint is an **engine**, not a rulebook. It measures (stylometry) and scores. The companion artifact, `voice/voice-dna.md`, is the human rulebook of editorial decisions. They run in series and stay separate on purpose: the engine cannot know you decided to ban a word, and the rulebook cannot measure whether your cadence drifted. You need both, layered.

**Base vs overlay.** This skill ships in base and is company-agnostic and data-free. It writes and reads files that live in the **overlay**: `voice/style-profile.md` (generated), `voice/voice-dna.md` (two-zone rulebook), `voice/professional-voice.md` (external register, `extends` voice-dna), and `voice/corrections.md` (logged edits). The empty shape of the profile ships beside this file as `style-profile.template.md`.

---

## Two modes

### Mode 1: intake / refresh (occasional)

Build or update the style profile from real writing samples.

1. Collect samples. The corpus lives in `atlas/sources/` (never pasted inline into a context file). Tag each sample with its register (internal / external / social) so the profile is per-register, not an averaged blend.
2. Measure stylometry per register: sentence-length distribution and rhythm, paragraph shape, punctuation habits, lexical fingerprints (favored connectives, hedges, openers, closers), signature moves, and things the person reliably avoids.
3. Write the results into `voice/style-profile.md` (fill the template's `{{placeholders}}`).
4. Regenerate the **generated zone** of `voice/voice-dna.md` directly from the profile, so the rulebook and the profile can never silently diverge (improvement 5). The **editorial zone** of voice-dna is hand-authored and is never overwritten.

Run intake on first setup, when a batch of new samples arrives, quarterly, or after enough corrections accumulate to shift the picture.

### Mode 2: verify (every deliverable)

Score a specific draft against the profile for its register and return a verdict.

- Input: the draft, plus its register (internal / external / social).
- Output: a **numeric score, 0 to 100, for that register**, plus the exact deviations (which cadence target it missed, which banned phrase it used, which signature move is absent).
- The `deliverable` skill hard-gates on this score. Below the threshold (default 80), the draft is auto-revised and re-verified before the user ever sees it (improvement 3). Verify is a gate, not advice.

---

## The two-register model

Register is a first-class dimension of the profile, not a footnote (improvement 1).

- **Internal / personal** register: how the user writes to themselves, teammates, and people they are comfortable with. Governed by `voice/voice-dna.md`.
- **External** register: how the user writes to customers, partners, and other outside parties. Governed by `voice/professional-voice.md`, which declares `extends: "[[voice-dna]]"` and overrides only the deltas that change (formality, warmth, hedging, sign-off).
- **Social** (optional third register, for example short public posts): supported by the same mechanism when the user maintains samples for it.

Verify always scores against the **specific** register in play. It never averages registers together, because an internal Slack note and a partner email are held to different targets.

---

## The drafting pipeline

Referenced from `engine/rulebook/voice-routing.md`. This is the path every written deliverable follows.

```
── INTAKE (occasional) ────────────────────────────────────────────
writing samples (atlas/sources/) ─► voiceprint:intake ─► voice/style-profile.md (generated)
                                                        ─► regenerates the generated zone of voice-dna.md

── DRAFTING (every deliverable) ───────────────────────────────────
task ─► pick register (internal / external / social)
     ─► WRITE using voice-dna editorial rules (banned phrases, fatal patterns, no em dashes)
     ─► voiceprint:verify (numeric gate, 0 to 100 for that register)
     ─► pass (>= threshold)?  deliver  :  auto-revise and re-verify
     ─► user edits the final ─► edit hook diffs pre vs post ─► append delta to voice/corrections.md
```

The write step uses the editorial rulebook; the verify step uses the measured profile. Neither stands alone.

---

## The six improvements

Add these around the stable intake+verify contract. Do not rewrite the core contract.

1. **Native register-awareness.** Register (internal / external / social) is a first-class profile dimension, so verify scores against the right register instead of a blend.
2. **Auto-correction from edits.** A hook diffs pre and post when the user edits a drafted deliverable and appends the delta to `voice/corrections.md`. The model then trains on the user's real edits with zero effort. Highest-leverage improvement.
3. **Numeric gate.** Verify emits a 0-to-100 score per register; `deliverable` hard-gates below the threshold (default 80) and auto-revises before showing the user. Voice goes from advisory to enforced.
4. **Drift detection.** Compare this quarter's samples against last quarter's profile and flag a genuine voice shift, so the profile follows the user rather than anchoring them to old writing.
5. **Voice DNA regeneration.** On intake, the skill writes the generated zone of `voice-dna.md` directly, so the rulebook and the profile cannot silently diverge.
6. **Provenance on every rule.** Each banned phrase and fatal pattern carries a `source:` (a correction, a sample, or an editorial decision), so the rulebook is auditable and the keeper can prune stale rules.

---

## The Sent-Message Loop

The strongest voice signal is not what was drafted; it is what was actually **sent**. This is a **read-only** pass that finds an agent-authored message the user edited and sent, diffs it against the draft, judges whether the change matters, and routes impactful deltas back into corrections. It is a mechanism only and contains no profile data.

```
agent drafts a deliverable ─► saves the draft with a hidden authorship marker (an id in metadata)
        │
        └─► user edits + SENDS via Gmail / Slack
                     │
   (later, read-only connector pass) ─► find the SENT message that matches the draft
                     │                    matched by authorship marker + thread/recipient + time
                     ├─► MATCHER:    confirm this sent message came from an agent draft
                     ├─► DIFF:       sent text vs drafted text
                     ├─► CLASSIFIER: trivial (formatting) | moderate | substantive (word/voice change)
                     └─► ROUTER:     if impactful, append the delta to voice/corrections.md
                                     and flag voice-dna editorial candidates
                                     ("deleted this word 4x -> banned-phrase candidate")
```

- **Matcher.** Identifies the sent message that corresponds to a specific agent draft, using the hidden authorship marker plus thread, recipient, and time. It never treats organic user writing or a third party's message as a match.
- **Classifier.** Grades each diff as trivial, moderate, or substantive so only meaningful changes are learned from.
- **Router.** Appends substantive and moderate deltas to `voice/corrections.md` and flags editorial candidates for `voice/voice-dna.md` (a word deleted repeatedly becomes a banned-phrase candidate).

### Guardrails (non-negotiable)

- **Read-only.** Never sends, edits, reacts to, or deletes a message. It only reads what already shipped. This obeys the constitution's never-send rule.
- **Agent-authored only.** Processes only messages that originated as an agent draft, matched by the authorship marker. It never processes the user's organic writing or anyone else's.
- **Store deltas, not bodies.** Records the change and its classification, not full copies of correspondence.

The connector access this pass uses (which Gmail, which Slack) is overlay configuration. The matcher, classifier, and router are the base mechanism defined here.

---

## What lives where

- **Base (this skill):** the intake and verify contract, the register model, the numeric gate, drift detection, DNA regeneration, provenance, and the sent-message loop mechanism. No personal data.
- **Overlay (built by intake):** `voice/style-profile.md`, `voice/voice-dna.md`, `voice/professional-voice.md`, `voice/corrections.md`, and connector config. The user's actual voice.

This separation means the world gets the voice **system** and each person trains their own voice against it.
