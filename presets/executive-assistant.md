---
title: Executive-Assistant Preset
type: preset
scope: base
tags: [preset, onboarding, executive-assistant]
plain: "For someone who supports a person or team across many projects and partners, with connectors feeding the agent."
---

# Executive-Assistant Preset

Pick this if your work is **projects and partners**, not a book of accounts. You support a person or a team, many things are in flight at once, and inputs arrive through connectors (mail, calendar, chat, docs) that the agent can read. It leans on ambient watching rather than pasted transcripts.

> **In plain English:** choose this if you keep a lot of projects and relationships moving for someone, and you want the agent to pull from your connected tools and give you a running briefing.

This preset pre-fills every `/onboard` question below. Run `/onboard`, keep what fits, change what does not. Everything here is generic. The interview writes your real data into the overlay.

---

## The 8 onboarding steps, pre-filled

### 1. WHO (identity)
Writes `about-me.md` (overlay).

- **Role shape:** you support one principal or a small team and hold the state of many parallel projects.
- **What you are responsible for:** knowing the status of everything, surfacing what needs attention, and preparing drafts and briefings.
- **Leave blank for the interview to fill:** your name, who you support, your cadence, your quality bar.

### 2. DOMAIN (taxonomy)
Names your hubs. Writes the taxonomy label into the overlay and seeds `desks/`.

- **Two hubs:** `desks/` labeled **"partners"** (one folder per external relationship) and a **"projects"** view over your tasks and notes for tracking work in flight.
- **Atlas cards** (`atlas/`): people, orgs, decisions, terms, sources, cross-linked into projects and partners.
- **Tweak:** rename "partners" to "stakeholders" or "vendors" if that fits better.

### 3. VOICE (voiceprint intake)
Runs `voiceprint:intake` on 3 to 5 real writing samples. Writes `voice/` and seeds the Voice DNA rulebook.

- **Two registers, both on:** an **external** register for messages partners read, and an **internal** register for briefings and notes to your principal. The external file `extends` the internal one.
- **Paste when prompted:** a few sent external messages and a few internal updates or briefings.
- Every drafted deliverable passes `voiceprint:verify` before you see it.

### 4. SKILLS (skills registry)
Turns on a menu from `skills/menu.md`.

- **refresh** : re-reads the connected sources and updates the state of every project and partner.
- **daily-rundown** : a start-of-day briefing of what changed, what is due, and what needs a decision.
- **weekly-fourbox** : a four-box status per partner or project (what happened, what is next, risks, asks).
- **ingest fleet** : the read-only connector subagents (mail, calendar, chat, docs) that pull inputs in. Only the connectors you actually wire get turned on.
- **keeper** : the weekly auditor. On by default in base.

### 5. INPUTS (connectors and operating mode)
Writes `connectors.md` (overlay) and sets the operating mode.

- **Mode: connector ingestion, ambient `/loop`.** The ingest fleet reads your connected tools on an interval; `refresh` and `daily-rundown` run on a schedule so a briefing is waiting for you.
- **Read-only, draft-only:** connectors read; nothing is ever sent through them. Sending stays a human action, per the house rules.
- **Honesty rule:** only document ambient behavior the environment can actually run. If a connector cannot be reached, the mode falls back to manual and says so.

### 6. MEMORY (memory policy)
Accepts the default decay from `engine/memory-policy.md`.

- **Default:** use-count plus age; cold memories fade and archive; pinned ones stay.
- **Suggested pins for this shape of work:** your principal's preferences, standing meetings, active project owners.
- **Tweak:** lengthen half-lives if long-running projects keep aging out before they close.

### 7. OUTPUTS (standing outputs)
Registers recurring deliverables in `heartbeat.md`.

- **Base outputs, on by default:** weekly-review, state-of-the-system, self-audit-report, memory-decay-report, voice-drift-report.
- **Overlay outputs this preset suggests** (added with `base: false`):
  - **daily-rundown** : the morning briefing, on a schedule.
  - **partner four-box** : one per active partner, weekly.
  - **project status roll-up** : a weekly view across everything in flight.

### 8. VERIFY (keeper)
Runs the first `keeper` audit. Drives criticals to zero, leaves the rest as a gap ledger. It also confirms every wired connector resolves to a real subagent so there are no phantom inputs. When it comes back clean, you are live.

---

*Not quite right? See `presets/customer-ops.md` (a book of accounts, human brings inputs) or `presets/researcher-writer.md` (minimal, sources and terms, no desks).*
