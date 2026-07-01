---
name: ingest-circleback
description: Pull recent Circleback meeting notes (the verified record of what was actually said) and return them as a signal pack. Use when refreshing an account, reconciling a desk against the source of truth, or when asked to pull the last few days of meetings.
scope: base
plain: "I read your Circleback meeting notes (verified truth) and hand back the summaries and action items."
---

# ingest-circleback

> **In plain English:** I pull your real meeting notes from Circleback and return them as structured signals for the agent to file. Circleback is the verified record of what was said; I never write files myself.

## Source-of-truth rule

Circleback notes are the VERIFIED record of a meeting. Prefer them over any implementation/CRM "sync" or "weekly update" content that is auto-generated and pending approval (for example the Cut+Dry Projects workspace drafts). When the two disagree, Circleback wins. See `engine/rulebook/data-sources.md`.

## Inputs (scope)

- A time window (default: last 7 days) and/or an account or meeting-title filter.

## How to pull (two paths, prefer 1)

1. **Circleback MCP (preferred, if connected).** Check `claude mcp list` for a `circleback` server. If present, use its tools to search recent meetings, read the notes, and get action items. (Tool names come from the server; typically a search-meetings, read-meeting/get-notes, and get-action-items set.)

2. **Gmail fallback (always available, proven).** Circleback emails every meeting's notes. Using the Gmail connector:
   - Search `from:notifications@circleback.ai newer_than:<window>` (subjects read "Notes for <meeting title>").
   - Open each relevant thread with full content. The note body contains: an **Overview** (bullets), themed **sections**, and an **Action Items** list (owner + description).
   - Match a meeting to an account by its title and by the customer email domains in the invitee list.

## Output: a signal pack (hand back to the caller; do NOT write files)

```yaml
source: circleback
signals:
  - id: circleback-<meeting-id-or-date-slug>
    meeting-title: "<title>"
    date: <YYYY-MM-DD>
    attendees: [ "<name> <email>", ... ]   # tag customer email domains
    account: "<desk / org if identifiable>"
    overview: [ "<bullet>", ... ]
    action-items:
      - owner: "<name>"
        text: "<action>"
    entities: { people: [], orgs: [], decisions: [], concepts: [] }
    verified: true                          # Circleback is the verified record
    links: { source-url: "<circleback view link if available>" }
```

## Boundaries (hard)

- Read-only. Never write files, never call other skills, never send or reply to anything. Hand the signal pack back to the caller.
- Only real Circleback notes count as verified: the Circleback MCP, or the `notifications@circleback.ai` emails. Do not pass off projects-workspace draft content as Circleback.

## What the caller does next

The orchestrator routes the pack through `synthesize` then `note-write` per the capture protocol: action items become the desk's open items/tasks, decisions become `atlas/decisions/`, new people become `atlas/people/`, and the meeting summary appends to the desk's activity log. Facts sourced here are marked verified.
