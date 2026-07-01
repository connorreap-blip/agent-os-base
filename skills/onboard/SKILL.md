---
name: onboard
description: "The onboarding interview. Invoke when a new user runs /onboard on a fresh base clone, or /onboard --refresh when a role changes. Eight short steps, each writes one overlay file. Also invoke when the user says set me up, get started, build my overlay, or re-onboard me."
scope: base
plain: "A short interview that turns a blank base into your working system in about fifteen minutes."
---

# onboard

> **In plain English:** answer eight quick questions and walk away with a system built around your life. Every question has a sensible default, so you can accept everything and still get a working setup. It saves as it goes, so you can stop and come back.

The interview loads a life onto the base. It writes overlay files only; it never edits base files. Speak plainly, give an example answer with every question, and confirm each write before moving on.

## Trigger

- `/onboard` on a fresh clone (nothing personal filled in yet).
- `/onboard --refresh` when a role changes: re-interview the deltas, re-bias the overlay, archive the old role's data to `attic/`.

## Presets (offer first)

Before step 1, offer a preset so the base is not a blank slate. A preset pre-fills the menus; the interview then tailors it.

- **Customer-Ops** (`presets/customer-ops.md`): accounts/desks taxonomy, capture plus deliverable, two-register voice, human-brings-inputs.
- **Executive-Assistant** (`presets/executive-assistant.md`): projects/partners, refresh plus rundown plus four-box, connector ingestion, ambient loop.
- **Researcher/Writer** (`presets/researcher-writer.md`): sources plus concepts, ingest plus digest plus voice, no accounts.

## The eight steps

Each step writes one overlay file. Resumable: if a file already exists, show it and offer to keep or revise.

### Step 1 - WHO -> `about-me.md`
Ask: name, role, organization, what you are responsible for. Example: "Alex Rivera, Onboarding Lead, Acme Foods, responsible for getting new distributors live."
Default: copy the preset's placeholder identity and mark the fields `(confirm)`.
Write `about-me.md` from `about-me.template.md`, filling the `{{NAME}} {{ROLE}} {{COMPANY}}` slots.

### Step 2 - DOMAIN -> renames `desks/`
Ask: what do you call your primary units of work? Accounts, clients, projects, matters, partners? Example: "I run accounts."
Default: keep `desks/`.
Rename the top-level hub folder to the chosen word and update its `.about.md`. (Safe before data exists; after data exists, move contents.)

### Step 3 - VOICE -> `voice/` via `voiceprint:intake`
Ask for three to five writing samples that sound like you. Example: paste two sent emails and a Slack update.
Default: skip and seed a neutral profile flagged `(confirm)`; you can run intake later.
Call `voiceprint` in intake mode. It writes `voice/style-profile.md` and seeds the generated zone of `voice/voice-dna.md`. Corpus goes to `atlas/sources/`, never inline.

### Step 4 - SKILLS -> `skills/menu.md`
Show the menu. Ask which skills to turn on. Example: "capture, deliverable, daily-rundown, weekly-fourbox."
Default: the preset's skill set.
Mark the chosen skills active in the registry. Base skills are always available; this just sets the user's working set.

### Step 5 - INPUTS -> `connectors.md`
Ask: do you wire connectors (Slack, Gmail, Calendar, Notion, Drive), or do you bring inputs by hand? Example: "human-brings-inputs for now."
Default: human-brings-inputs (honest operating mode, works with no setup).
Write `connectors.md` listing what is wired and the operating mode. Never claim automation the environment cannot perform.

### Step 6 - MEMORY -> memory policy
Ask: accept the default decay, or tune it? Example: "accept defaults." Show the class half-lives (fact 30, preference 90, project 45, reference 120 days).
Default: accept the base `engine/memory-policy.md` values; create an empty `MEMORY.md` index and `memory/facts/`.
Record any overrides in the overlay, not in the base policy file.

### Step 7 - OUTPUTS -> `heartbeat.md`
Ask which recurring outputs to turn on. Example: "weekly review on, four-box on." Weekly review is on by default.
Default: the base standing outputs (weekly-review, state-of-the-system, memory-decay-report, voice-drift-report).
Write the overlay `heartbeat.md` with `extends: "[[house-rules]]"`-style inheritance from the base outputs, adding any job-specific ones.

### Step 8 - VERIFY -> `keeper`
Run the keeper's first sweep. It confirms every overlay file is valid, no phantoms, no leaked secrets, plain-language notes present. Produce the first State-of-the-System report.
Default: run it. If clean, tell the user they are live.

## Acceptance

Running `/onboard` with "accept all" on a fresh clone produces: `about-me.md`, a renamed hubs folder, seed `voice/`, an active skill set in `skills/menu.md`, `connectors.md`, memory defaults with a real `MEMORY.md`, `heartbeat.md`, and a first keeper report. No base file is edited.

## Boundaries

- Writes overlay files only. Never edits a base file to add personal content.
- Every question has a default; "accept all" must yield a working system.
- Confirm before creating any organization or desk.
