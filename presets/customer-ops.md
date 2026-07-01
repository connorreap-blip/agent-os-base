---
title: Customer-Ops Preset
type: preset
scope: base
tags: [preset, onboarding, customer-ops]
plain: "The flagship starting point for anyone who runs a book of customer or partner accounts."
---

# Customer-Ops Preset

The flagship preset. Pick this if your job is a **book of accounts**: you own a set of customers or partners, calls and emails come in, and you turn them into notes, updates, and drafted deliverables. It is the closest fit for customer-success, account-management, growth-partner, and rep-enablement shapes of work.

> **In plain English:** choose this if you look after a list of customers or partners and spend your day turning conversations into notes and follow-ups. It sets the whole system up for that, then you tweak a few names.

This preset pre-fills every `/onboard` question below. Run `/onboard`, accept the answers that fit, and change the ones that do not. Nothing here is your real data. The interview writes your real data into the overlay.

---

## The 8 onboarding steps, pre-filled

### 1. WHO (identity)
Writes `about-me.md` (overlay).

- **Role shape:** you own a portfolio of accounts and are measured on their health, activity, and outcomes.
- **What you are responsible for:** keeping each account moving, capturing every interaction, and shipping clean follow-ups.
- **Leave blank for the interview to fill:** your name, company, who you report to, your quality bar for a finished deliverable.

### 2. DOMAIN (taxonomy)
Names your hubs. Writes the taxonomy label into the overlay and seeds `desks/`.

- **Primary hub:** `desks/`, one folder per account, labeled **"accounts"** in your copy.
- **Each desk holds:** overview, people, decisions, meetings, deliverables, activity log.
- **Atlas cards** (`atlas/`): people, orgs, decisions, terms, sources, cross-linked into the desks.
- **Tweak:** if you serve "partners" or "clients" instead of "accounts," change the one label.

### 3. VOICE (voiceprint intake)
Runs `voiceprint:intake` on 3 to 5 real writing samples. Writes `voice/` and seeds the Voice DNA rulebook.

- **Two registers, both on:** an **external** register for anything a customer or partner reads, and an **internal** register for notes and team messages. The external file `extends` the internal one.
- **Paste when prompted:** a few sent emails to customers (external) and a few internal notes or messages (internal).
- Every drafted deliverable passes `voiceprint:verify` as a numeric gate before you see it.

### 4. SKILLS (skills registry)
Turns on a menu from `skills/menu.md`.

- **capture** : every call, email, or transcript becomes structured intelligence across the right notes, not just a "this happened" log.
- **new-account** : stands up a fresh desk with the full folder shape and a first overview. (Creating the org entity still asks for a yes, per the house rules.)
- **deliverable** : drafts the email, brief, or recap in your external voice, saved for review, never sent.
- **weekly-fourbox** : a per-account four-box status (what happened, what is next, risks, asks).
- **keeper** : the weekly auditor that keeps your files clean. On by default in base.

### 5. INPUTS (connectors and operating mode)
Writes `connectors.md` (overlay) and sets the operating mode.

- **Mode: human-brings-inputs (manual).** You paste the call transcript, the email thread, the note. The agent does the capture and the drafting. Nothing is watched or sent on its own.
- **Why this default:** it is honest about what the environment can actually do, and it needs no connector setup to be useful on day one.
- **Tweak later:** if you wire read-only connectors, you can move toward the ambient mode the executive-assistant preset uses.

### 6. MEMORY (memory policy)
Accepts the default decay from `engine/memory-policy.md`.

- **Default:** memories carry a use-count and an age; cold ones fade and archive themselves; pinned ones never do.
- **Suggested pins for this shape of work:** your top accounts, your quality bar, your standing cadences.
- **Tweak:** tune half-lives or add pins only if the default feels too aggressive.

### 7. OUTPUTS (standing outputs)
Registers recurring deliverables in `heartbeat.md`.

- **Base outputs, on by default:** weekly-review, state-of-the-system, self-audit-report, memory-decay-report, voice-drift-report.
- **Overlay outputs this preset suggests** (added with `base: false`):
  - **account-health roll-up** : a weekly RAG view across your desks.
  - **weekly-fourbox** : one per active account.
  - **kickoff-recap digest** : a clean recap after each new-account kickoff.

### 8. VERIFY (keeper)
Runs the first `keeper` audit. Drives any critical findings to zero, leaves the rest as a gap ledger. When it comes back clean, you are live.

---

*Not quite right? See `presets/executive-assistant.md` (projects and partners with connector ingestion) or `presets/researcher-writer.md` (minimal, sources and terms, no desks).*
