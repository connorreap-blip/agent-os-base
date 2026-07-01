---
title: Self-Audit
scope: base
plain: "Three levels of cleaning: a linter on every save, a weekly keeper, and a capture-time triad that flags contradictions and gaps, marks unverified facts, and freezes rather than guessing."
tags: [system, rulebook, keeper]
---

# Self-Audit

> **In plain English:** the workspace cleans itself at three levels. A tiny checker on every save fixes safe stuff silently, a weekly janitor audits everything and proposes fixes, and a capture-time triad keeps knowledge honest by flagging contradictions and gaps instead of asserting them.

Always in keeper scope (no `paths:`; it governs the auditor, which runs over the whole workspace). This file defines the discipline; the ledgers themselves live in the overlay.

## The three tiers

| Tier | Trigger | What it does | Auto or propose |
|---|---|---|---|
| 1. On-write linter | every file write (hook) | schema conformance vs blueprints, dangling links, frontmatter validity, `.DS_Store` and lockfile purge | auto-fix the safe ones |
| 2. Keeper | weekly (schedule or `/loop`) | structural audit: bloat, schema drift, stale duplicates, orphaned instructions, secret leakage, phantom subagents, the memory decay pass, repeated-workflow skill candidates, overdue standing outputs, plain-language violations | propose (report plus one-click apply) |
| 3. Self-audit triad | every capture (continuous) | contradictions to the ledger, gaps to the ledger, unverified to `(confirm)` | flag, never assert |

## Auto-fix vs propose

- **Auto-fix (safe, run without asking):** dead-link removal, `.DS_Store` and lockfile purge, `last-*` timestamp updates, memory decay archival past grace, schema-default backfill, moving expired queue items to `_archive/`.
- **Propose (judgment, never auto-applied):** delete a skill, merge two notes, change a rule, promote a pattern to base. These are proposed in the report and applied only on approval.

## The contradiction ledger (flag and freeze)

- When sources disagree, flag and freeze. Do not act on conflicting data.
- Record the conflict as a question, with both sides and both sources, and track its resolution ("Call A says X, Call B says Y, which is correct?" then later "RESOLVED YYYY-MM-DD, ...").
- Never assert a contradiction as settled. A direct statement from the person outranks an indirect or automated source; note the discrepancy.

## The gaps ledger

- Record missing knowledge as gaps rather than guessing. If a needed fact is not there, say so and log it.
- Proposed skills also land here, in the format: `- [ ] PROPOSED SKILL: <name> - observed <pattern> x<N> - est. value <high/med/low>`. When the keeper sees a workflow repeated N times, it appends a proposal; on approval it scaffolds the skeleton (`SKILL.md`, registry entry, delegation-map row).

## `(confirm)` discipline

- Unverified facts are marked `(confirm)` inline or via the `confidence` field, never asserted. Provenance is required: every asserted fact traces to a source.

## The keeper closes its own loop

- A tier-2 finding that recurs (the same drift flagged three weeks running) escalates: the keeper stops merely proposing and offers to fix-and-PR. The system nags itself, then fixes itself.
