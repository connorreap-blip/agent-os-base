---
name: ingest-slack
description: Read-only Slack connector subagent. Given a scope (channels or threads plus a time window), it pulls the messages, extracts entities and intents, and hands back a signal pack. It never writes files, never calls other skills, and never sends, reacts, or writes to Slack. Dispatched by the refresh orchestrator; not invoked directly by the user.
scope: base
plain: "Reads Slack for a given scope and hands back a structured signal pack. Read-only, no writes, no sends."
---

# ingest-slack

> **In plain English:** this reads the Slack messages you point it at, pulls out who and what was mentioned, and hands that back as a tidy list. It never posts, reacts, or changes anything in Slack, and it never saves a file.

This is a **connector subagent**, not a user-facing skill. The `refresh` orchestrator dispatches it, collects its signal pack, and passes the pack to `synthesize`. It has one job: turn a scope into a signal pack and hand it back.

## Input: a scope

The caller provides what to read. Nothing is pulled that was not asked for.

```yaml
scope:
  channels: []            # channel ids or names to read; empty = caller must specify
  threads: []             # specific thread timestamps, optional
  window: "<ISO start>..<ISO end>"   # required time bound, e.g. last refresh -> now
```

If the scope is missing a time window or a target, stop and ask the caller. Do not read the whole workspace by default. Per-connector scoping rules live in `engine/rulebook/data-sources.md`.

## Allowed operations (read-only)

Only read operations are permitted: list channels, read a channel's messages in the window, read a thread, read a user profile to resolve a handle to a name, read reactions and canvases for context. Nothing else.

**Never** send a message, post a draft, add a reaction, create a channel or canvas, schedule a message, or edit anything. If a task seems to require any of those, it is out of scope for this subagent: hand back and let the caller decide.

## Process

1. Read the messages in scope.
2. For each meaningful message (skip pure noise), draft one signal.
3. Extract entities: people (resolve @handles to real names where a profile read makes it unambiguous), orgs, decisions stated or implied, and concepts or jargon.
4. Tag intents (for example: asks-question, commits-to, raises-risk, shares-update, schedules).
5. Keep the raw text verbatim, trimmed to just enough surrounding context to stay legible.

## Output: a signal pack

Hand this structure back to the caller. Store links and filenames only, never attachment contents.

```yaml
source: slack
scope:
  channels: []                       # echoed back for traceability
  window: "<ISO start>..<ISO end>"
signals:
  - id: slack-<channel>-<ts>         # stable, source-prefixed unique id
    timestamp: 2026-06-30T14:22:00Z  # ISO 8601, UTC
    raw: "<verbatim message text with minimal surrounding context>"
    entities:
      people:    []                  # names/handles -> resolve later to atlas/people
      orgs:      []                  # companies -> atlas/orgs
      decisions: []                  # decisions stated or implied -> atlas/decisions
      concepts:  []                  # terms/jargon/topics -> atlas/terms
    intents:     []                  # e.g. ["asks-question", "raises-risk"]
    links:
      source-url: "<permalink to the message or thread>"
      attachments: []                # urls/filenames only, never contents
```

## Hard boundary

> Hand back to caller. Do not write files. Do not call other skills. Never send, react, or write to the source.

This subagent produces a signal pack and stops. Entity resolution against the real graph, note writing, and any judgment happen downstream in `synthesize` and `note-write`. If in doubt, return less and flag it; never act on the source.
