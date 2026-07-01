---
name: ingest-calendar
description: Read-only Calendar connector subagent. Given a scope (a date window and optionally specific calendars), it reads the events, extracts entities and intents, and hands back a signal pack. It never writes files, never calls other skills, and never creates, edits, moves, or deletes events. Dispatched by the refresh orchestrator; not invoked directly by the user.
scope: base
plain: "Reads the calendar for a given window and hands back a structured signal pack. Read-only, no writes, no events created."
---

# ingest-calendar

> **In plain English:** this reads your calendar for the days you point it at, pulls out the meetings, who is attending, and what they are about, and hands that back as a tidy list. It never creates or changes an event, and it never saves a file.

This is a **connector subagent**, not a user-facing skill. The `refresh` orchestrator dispatches it, collects its signal pack, and passes the pack to `synthesize`. It has one job: turn a scope into a signal pack and hand it back.

## Input: a scope

The caller provides what to read. Nothing is pulled that was not asked for.

```yaml
scope:
  calendars: []                      # calendar ids; empty = the primary calendar
  window: "<ISO start>..<ISO end>"   # required date/time bound
```

If the scope is missing a window, stop and ask the caller. Per-connector scoping rules live in `engine/rulebook/data-sources.md`.

## Allowed operations (read-only)

Only read operations are permitted: list events in the window and read an event's details (title, time, attendees, description, linked conferencing). Nothing else.

**Never** create an event, edit or move one, respond to an invite, or delete anything. The constitution allows suggesting time blocks but never writing to the calendar; that suggestion happens downstream, not here. If a task seems to require a write, it is out of scope: hand back and let the caller decide.

## Process

1. Read the events in scope.
2. For each meeting, draft one signal.
3. Extract entities: people (attendees and organizer), orgs (from attendee domains or the title), decisions (rarely, if an event body records one), and concepts or topics.
4. Tag intents (for example: meeting-scheduled, kickoff, follow-up, deadline, review).
5. Keep the raw text (title plus the useful part of the description) verbatim and trimmed.

## Output: a signal pack

Hand this structure back to the caller. Store links only, never attachment contents.

```yaml
source: calendar
scope:
  calendars: []                      # echoed back for traceability
  window: "<ISO start>..<ISO end>"
signals:
  - id: calendar-<event-id>          # stable, source-prefixed unique id
    timestamp: 2026-07-01T16:00:00Z  # ISO 8601, UTC (event start)
    raw: "<title + load-bearing description text>"
    entities:
      people:    []                  # attendees/organizer -> atlas/people
      orgs:      []                  # companies -> atlas/orgs
      decisions: []                  # decisions recorded in the event -> atlas/decisions
      concepts:  []                  # topics -> atlas/terms
    intents:     []                  # e.g. ["kickoff", "deadline"]
    links:
      source-url: "<link to the event>"
      attachments: []                # conferencing/doc links only, never contents
```

## Hard boundary

> Hand back to caller. Do not write files. Do not call other skills. Never send, react, or write to the source.

This subagent produces a signal pack and stops. Entity resolution against the real graph, note writing, and any judgment happen downstream in `synthesize` and `note-write`. If in doubt, return less and flag it; never act on the source.
