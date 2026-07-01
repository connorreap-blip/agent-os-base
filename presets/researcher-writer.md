---
title: Researcher-Writer Preset
type: preset
scope: base
tags: [preset, onboarding, researcher-writer, minimal]
plain: "The minimal starting point for someone who reads, thinks, and writes, with no accounts to manage."
---

# Researcher-Writer Preset

The minimal preset. Pick this if your work is **reading, thinking, and writing**: you gather sources, build up ideas, and produce prose. There is no book of accounts and no partners to track, so this preset leaves out the desks entirely and keeps the system light.

> **In plain English:** choose this if you mostly research and write. It keeps a tidy library of your sources and ideas and helps you draft in your own voice. No customers, no partners, nothing extra.

This preset pre-fills every `/onboard` question below. Run `/onboard`, keep what fits, change what does not. Everything here is generic. The interview writes your real data into the overlay.

---

## The 8 onboarding steps, pre-filled

### 1. WHO (identity)
Writes `about-me.md` (overlay).

- **Role shape:** you produce written work backed by research. You are measured on the quality of what you publish, not on managing relationships.
- **What you are responsible for:** capturing what you read, developing ideas, and shipping drafts.
- **Leave blank for the interview to fill:** your name, what you write about, your quality bar for a finished piece.

### 2. DOMAIN (taxonomy)
Names your hubs. Writes the taxonomy label into the overlay.

- **No desks.** `desks/` stays empty; there is nothing to manage a folder-per-account for.
- **Two atlas note types carry the work** (`atlas/`):
  - **sources** : one card per book, paper, article, interview, or dataset you draw on.
  - **terms** : atomic idea notes, densely cross-linked, that grow into the backbone of what you write.
- **Tweak:** if you later take on clients, you can turn on the desks taxonomy from the customer-ops preset.

### 3. VOICE (voiceprint intake)
Runs `voiceprint:intake` on 3 to 5 real writing samples. Writes `voice/` and seeds the Voice DNA rulebook.

- **One primary register: your authored voice**, the one your published writing goes out in. This is the center of this preset, so spend the most care here.
- **Paste when prompted:** a few finished pieces that sound the way you want to sound.
- Every draft passes `voiceprint:verify` before you see it, and a monthly voice-drift report tells you if your style is moving.

### 4. SKILLS (skills registry)
Turns on a small menu from `skills/menu.md`.

- **capture** : a source or a passage becomes a source card plus linked term notes, not just a clipping.
- **deliverable** : drafts the piece (essay, post, brief, chapter) in your authored voice, saved for review.
- **voiceprint** : the voice engine, front and center here for both drafting and the drift check.
- **keeper** : the weekly auditor. On by default in base. It also flags dangling links between your idea notes.

### 5. INPUTS (connectors and operating mode)
Writes `connectors.md` (overlay) and sets the operating mode.

- **Mode: human-brings-inputs (manual).** You paste the text, the link, the excerpt. The agent turns it into source and term notes. Nothing is watched or sent.
- **Why this default:** research inputs are things you choose to bring in, not a stream to monitor. Manual is the honest and sufficient mode.

### 6. MEMORY (memory policy)
Accepts the default decay from `engine/memory-policy.md`.

- **Default:** use-count plus age; cold memories fade and archive; pinned ones stay.
- **Suggested pins for this shape of work:** the through-lines of your current project, the sources you keep returning to.
- **Tweak:** term notes you consider permanent can be pinned so they never cool off.

### 7. OUTPUTS (standing outputs)
Registers recurring deliverables in `heartbeat.md`.

- **Base outputs, on by default:** weekly-review, state-of-the-system, self-audit-report, memory-decay-report, voice-drift-report.
- **Overlay output this preset suggests** (added with `base: false`):
  - **reading digest** : a weekly summary of the sources you captured and the new idea notes they spawned.

### 8. VERIFY (keeper)
Runs the first `keeper` audit. Drives criticals to zero, leaves the rest as a gap ledger. When it comes back clean, you are live.

---

*Need more structure? See `presets/customer-ops.md` (a book of accounts) or `presets/executive-assistant.md` (projects and partners with connectors).*
