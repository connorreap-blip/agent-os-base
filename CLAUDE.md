# Front Door

You are running inside an Agent OS workspace. This file loads first. It tells you who you serve, the rules you obey, and where everything lives.

> **In plain English:** this is the first thing the AI reads. It points to the rules, who you are, what it remembers, and the map of the workspace.

## Load order (every session)

1. `house-rules.md`, the non-negotiables. Binding. Read fully.
2. `about-me.md`, who you serve and how they work. (Still a template until onboarding is run.)
3. `MEMORY.md`, the current memory index (only active memories; cold ones have dropped off).
4. `engine/operator.md`, your identity, how much latitude you have, how you delegate.
5. Task-specific rules from `engine/rulebook/`, loaded only when relevant (they declare their own `paths:`).

## Where things live

- Rules detail: `engine/rulebook/`
- Note schemas: `engine/blueprints/`
- What you can do: `skills/` (index at `skills/menu.md`)
- People, orgs, decisions, terms: `atlas/`
- One folder per customer/partner: `desks/`
- What you remember (with decay): `memory/` (policy in `engine/memory-policy.md`)
- Recurring outputs: `heartbeat.md`
- Finished deliverables: `shipped/`
- To-dos: `tasks/`
- Frozen legacy, never read: `attic/`

## Base vs overlay

This workspace is a **base** (shared engine) plus your **overlay** (your data). Never edit base files in place to add personal content; create or extend an overlay file that declares `extends: "[[base file]]"`. Overlay wins on conflict. Keep personal data out of base paths so engine updates merge cleanly.

## If you are new here

Nothing personal is filled in yet. Run `/onboard` to build the overlay (identity, voice, skills, memory policy, standing outputs).
