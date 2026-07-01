---
title: Memory Policy
scope: base
plain: "How the agent keeps what you use, lets go of what you don't, and never sunsets what you pin, by a weekly math pass instead of hand-trimming."
tags: [system, engine, memory]
---

# Memory Policy

> **In plain English:** the agent remembers with a shelf-life. Memories you use stay warm, memories you ignore cool off and archive themselves, and anything you pin never leaves. A weekly pass does this with a formula so you never hand-prune the index.

This is the decay engine. It carries the math, the field definitions, the class defaults, the hook spec, and the pin rules. It holds no data. Your actual memories live in the overlay (`MEMORY.md`, `memory/facts/`, `memory/continuity-log.md`).

## The three layers

| Layer | What it is | Where | Loaded when |
|---|---|---|---|
| 1. Native memory | `MEMORY.md` index plus per-fact files in `memory/facts/` | overlay | the index auto-loads every session |
| 2. Continuity log | the session narrative, `memory/continuity-log.md` | overlay | on demand; rolls up monthly |
| 3. Graph facts | the atlas notes themselves | overlay | on demand |

Layers 1 and 2 are working memory and decay aggressively by the score below. Layer 3 is the historical record and decays conservatively (see the last section).

## Frontmatter every memory file carries

```yaml
---
type: memory
class: fact | preference | project | reference
created: 2026-06-30            # time of entry
last-invoked: 2026-06-30       # updated whenever this memory is surfaced or used
invoke-count: 0                # times invoked
half-life-days: 30             # decay speed; class-defaulted, overridable
pinned: false                  # true = never sunset
status: active                 # active | cooling | archived
source: <where it came from>
---
```

## Class half-life defaults (tunable at onboarding)

- `fact: 30`
- `preference: 90`
- `project: 45`
- `reference: 120`

## The decay score (computed on the weekly keeper pass)

```
recency   = days_since(last-invoked)
frequency = invoke-count
age       = days_since(created)

decay_score = recency / half-life-days            # how cold it is
              - log(1 + frequency) * 0.5           # frequent use keeps it warm
              + (age / 180) * 0.2                  # very old and unused sinks faster
```

Recency dominates, frequency rescues, age is a gentle tiebreaker. Frequency uses `log` so one heavily-used memory (invoke-count 200) does not become immortal noise, while a genuinely useful memory used twice this week still gets saved.

## Tiers and the grace window

- `decay_score < 1`: active. Leave it.
- `1 <= decay_score < 2`: cooling. The keeper flags it in the weekly report; you can pin it or let it slide.
- `decay_score >= 2` and not `pinned`: archived automatically after a 7-day grace window. The file moves to `memory/_archive/`, drops off the loaded index, and is never deleted.

## Two policies, one engine

- Layers 1 and 2 prune aggressively by the score above.
- Layer 3 (graph facts) prunes conservatively. A decision or person is not sunset by disuse; it is marked `status: superseded | reversed | departed` and its `confidence` fades, but the file is kept. Only unreferenced, low-confidence, never-invoked concept notes get proposed for archival.

The principle: working memory is aggressively pruned, the historical record is conservatively preserved. Two policies, one engine, applied by class.

## Resurrection

If an archived memory's subject is mentioned again, the retrieval path pulls the file back from `memory/_archive/` and resets its clock (`last-invoked` to today, `status` to active). Because a cold memory can always come back, aggressive pruning is safe.

## Pinning

`pinned: true` means the memory never sunsets, regardless of score. Pin sparingly: identity, the constitution's hard-stops, active-project anchors, voice-profile pointers. The keeper flags if the pinned set grows past a threshold, because pinning everything defeats decay.

## The invoke-count hook (the one piece of harness wiring)

- **Trigger:** `SessionStart` and/or `PostToolUse` on a Read of a `memory/facts/*.md` file. Configured in `settings.json` under `hooks`.
- **Action:** `hooks/invoke-count.sh <file>` parses the target's YAML, increments `invoke-count` by 1, sets `last-invoked` to today (Eastern Time), and writes the file back.
- **What it stamps:** exactly two fields, `invoke-count` (plus one) and `last-invoked` (today ET). Nothing else is touched.
- **Idempotency:** it does not double-count the same file twice in one session; it tracks seen files in a session-scoped temp.
- **Fallback:** if no hook is wired, the keeper scans session transcripts weekly to approximate invocations (lossier, zero-config). The hook is the recommended default and makes the decay engine exact rather than estimated.

## The MEMORY.md index

One line per active memory. Cooling and archived entries drop off, so the always-loaded footprint stays bounded by the decay pass rather than by hand-trimming. The continuity log stays append-only for auditability but rolls up: raw entries older than 30 days compress into a monthly digest that itself carries decay frontmatter.
