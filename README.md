# Agent OS (Base)

A personal AI-agent operating system, expressed as plain markdown and YAML. A Claude agent reads this directory as its operating instructions and its knowledge. Every file is either an **instruction** (changes what the agent does) or **data** (what the agent works on).

> **In plain English:** this is a set of plain text files that tells an AI how to be your assistant, holds everything it knows about your work, and improves itself as you use it.

## What you're looking at

This is the **base**: a clean, company-agnostic engine anyone can use. Your real life (identity, contacts, customers, voice, memories) is not in here. You add that by running the onboarding interview, which writes it into your own **overlay** on top of the base.

- **Base** = the engine: rules, note schemas, skills, the auditor, the onboarding flow, the memory-decay math, the voice mechanism.
- **Overlay** = yours: your identity, your data, your voice profile, your connectors.

The two are kept apart by one rule: *base files are never edited in your copy; the overlay extends or overrides them.* They live in two separate repos: your private copy pulls engine upgrades DOWN from the shared base, and generic patterns move UP by promotion (a deliberate, sanitized copy into the base), never by pushing your private data. See `engine/rulebook/promotion.md`.

## The parts that matter most

- **Memory that forgets on purpose.** Memories carry a use-count and an age. Cold, unused ones fade and archive themselves; pinned ones never do; archived ones come back if their subject reappears. The always-loaded footprint stays small without anyone hand-trimming it. See `engine/memory-policy.md`.
- **A voice system that learns from what you sent.** A stylometry engine (voiceprint) measures and scores your writing; a rulebook (`Voice DNA`) holds your editorial choices. When you edit and send an agent-drafted email or Slack, a read-only pass reads what you actually sent, notes what changed, and (if it matters) teaches the model. See `skills/voiceprint/` and `engine/rulebook/voice-routing.md`.
- **A janitor that runs whether or not you remember to.** A linter cleans on every save, an auditor (the `keeper`) sweeps weekly, and continuous execution runs it four ways so drift has nowhere to hide. See `skills/keeper/` and `engine/rulebook/self-audit.md`.
- **Works from the command line, can go ambient when driven.** The engine is complete on its own; passive comms-watching is an optional add-on. See `engine/rulebook/operating-mode.md`.

## Ambient operations

The agent can run as a background brain: a loop that ingests, synthesizes, and posts a digest plus urgent flags to your OWN Slack (never to a customer). It runs from a persistent `/loop` session on an always-on machine, or, later, as an unattended token-based job. See `engine/rulebook/operating-mode.md` for the model and `automation/README.md` for the runbook.

## Get started

Run the onboarding interview:

```
/onboard
```

It asks who you are, how you work, and what you write like, then builds your overlay in about 15 minutes. Pick the preset closest to your work (`presets/customer-ops.md`, `presets/executive-assistant.md`, `presets/researcher-writer.md`) and tweak from there.

## The map

| Where | What it is |
|---|---|
| `CLAUDE.md` | The front door. The agent reads this first; it points to everything else. |
| `house-rules.md` | The non-negotiables: what the agent will and won't ever do. |
| `about-me.md` | Who you are, your job, how you like to work. (Template until you onboard.) |
| `MEMORY.md` | What the agent remembers about you, and forgets when it goes cold. |
| `engine/` | The machinery: schemas, the detailed rulebook, the agent's identity. You rarely open this. |
| `skills/` | Everything the agent knows how to do (plus `menu.md`, the index). |
| `atlas/` | Your map of people, orgs, decisions, and terms. One card each. |
| `desks/` | One folder per customer or partner. Everything about them in one place. |
| `knowledge/` | Your synthesized product/domain knowledge, one topic note per area, traceable to its sources. |
| `memory/` | What the agent remembers, with a shelf-life. |
| `heartbeat.md` | The things the system makes on a schedule, whatever you're working on. |
| `shipped/` | Finished deliverables the agent produced. |
| `tasks/` | The to-do layer. |
| `attic/` | Old stuff, kept but out of the way. The agent never reads it. |

## Design standard

If a folder, skill, or rule can't be explained in one plain sentence, it isn't ready to ship. Every one of them carries a one-line plain-English note.
