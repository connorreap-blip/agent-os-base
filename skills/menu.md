---
title: Skill Menu
type: registry
scope: base
tags: [system, skills, registry]
aliases: [Skill Registry, Skills Index, The Menu]
plain: "The list of every skill the agent has, what triggers it, and whether a person or another skill calls it."
---

# Skill Menu

The canonical index of every skill in this workspace. If a skill is not in this table, it does not officially exist. If a subagent is named in a skill or in `engine/operator.md` but has no row here and no `<name>/SKILL.md` on disk, that is a phantom, and the keeper flags it.

> **In plain English:** this is the master list of everything the agent can do. Every named helper on this list must be a real file. The keeper checks that the list, the folders, and the delegation map all agree.

Every skill lives at `skills/<name>/SKILL.md` and opens with a plain-English line. Base skills ship with the product. Overlay skills are job-specific and added during onboarding or by the keeper's flywheel.

## How to read this table

- **Invoked by** = who calls it. `user` runs it directly (or a schedule does). `subagent` means an orchestrator dispatches it and it hands work back, never writing files unless that is its job. `auto` means a hook or another skill fires it.
- **Contract** columns for the subagents are defined in full inside their own `SKILL.md`.

## Registry

| Skill | Trigger | Purpose | Invoked by |
|---|---|---|---|
| `onboard` | User runs `/onboard` or `/onboard --refresh` | Eight-step interview that writes the overlay: identity, taxonomy, voice, skills, inputs, memory, outputs, first audit. | user |
| `keeper` | Every write (tier 1), weekly schedule (tier 2), every capture (tier 3) | The auditor and janitor. Lints on write, sweeps weekly, keeps knowledge honest at capture. Read plus propose only, except safe auto-fixes. Emits the State-of-the-System report. | auto / user |
| `capture` | A raw input arrives (transcript, email, note, doc) | Runs the ordered capture protocol on one input, routes it to atlas, desks, and memory, and emits a write plan. | user / auto |
| `refresh` | User runs `/refresh` or a `/loop` fires it | Orchestrator. Dispatches ingest subagents in parallel, hands packs to synthesize, then note-write, then updates MEMORY and the rundown. | user |
| `synthesize` | Called by `capture` or `refresh` | The synthesis brain. Consumes signal packs, resolves entities, enforces reciprocity, emits a write plan. Never writes files. | subagent |
| `note-write` | Called by `synthesize` (via the orchestrator) | Executes a write plan: creates notes, appends activity, updates frontmatter, enforces YAML and link reciprocity. | subagent |
| `ingest-slack` | Called by `refresh` | Reads a scoped Slack window, returns a signal pack. Read-only. | subagent |
| `ingest-gmail` | Called by `refresh` | Reads a scoped Gmail window, returns a signal pack. Read-only. | subagent |
| `ingest-calendar` | Called by `refresh` | Reads a scoped calendar window, returns a signal pack. Read-only. | subagent |
| `ingest-notion` | Called by `refresh` | Reads scoped Notion pages, returns a signal pack. Read-only. | subagent |
| `ingest-drive` | Called by `refresh` | Reads scoped Drive files, returns a signal pack. Read-only. | subagent |
| `daily-rundown` | User runs it, or a schedule fires it | Reads the refreshed graph (no connectors) and writes a dated briefing to `shipped/`. | user |
| `deliverable` | User asks for a voiced draft (email, brief, deck, message) | Generates a voiced deliverable: draft with voice-routing, verify against the voiceprint gate, save to `shipped/`. Never sends. | user |
| `new-account` | User asks to stand up a new customer or partner | Clones the current account blueprint into `desks/<Name>/` and seeds the overview. Confirms before creating the org. | user |
| `weekly-fourbox` | User runs it, or a weekly schedule fires it | Generic recurring leadership update: highlights, lowlights, blockers, priorities. Writes to `shipped/`. | user |
| `voiceprint` | Called by `deliverable` and by voice intake | The stylometry engine. Intake builds the profile; verify scores a draft against it and returns a number. | subagent / user |

## Delegation map (must match `engine/operator.md`)

```
capture   -> synthesize -> note-write
refresh   -> [ingest-slack, ingest-gmail, ingest-calendar, ingest-notion, ingest-drive]
          -> synthesize -> note-write -> (update MEMORY.md, daily-rundown)
deliverable -> voiceprint (verify gate)
onboard   -> voiceprint (intake), keeper (first audit)
keeper    -> proposes into the Gap ledger below
```

If any arrow above points at a skill with no `SKILL.md` on disk, the keeper reports a phantom subagent. If a `SKILL.md` exists but appears in no arrow and no registry row, the keeper reports an orphan skill.

## Gap ledger

The keeper appends here when it observes the same manual workflow repeated N times. Each line is a proposal, not a commitment. A human approves before any skill is scaffolded. On approval, the keeper writes the skeleton `SKILL.md`, adds a registry row above, and adds a delegation-map arrow.

Format:

```
- [ ] PROPOSED SKILL: <name> - observed <pattern> xN - est. value <high|med|low>
```

Proposals:

_(none yet - the keeper adds them as it observes repetition)_
