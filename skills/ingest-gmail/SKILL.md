---
name: ingest-gmail
description: Read-only Gmail connector subagent. Given a scope (a search query or thread set plus a time window), it reads the matching mail, extracts entities and intents, and hands back a signal pack. It never writes files, never calls other skills, and never sends, drafts, labels, or archives mail. Dispatched by the refresh orchestrator; not invoked directly by the user.
scope: base
plain: "Reads Gmail for a given scope and hands back a structured signal pack. Read-only, no writes, no sends."
---

# ingest-gmail

> **In plain English:** this reads the emails you point it at, pulls out who and what was mentioned, and hands that back as a tidy list. It never sends, replies, labels, or files anything, and it never saves a file.

This is a **connector subagent**, not a user-facing skill. The `refresh` orchestrator dispatches it, collects its signal pack, and passes the pack to `synthesize`. It has one job: turn a scope into a signal pack and hand it back.

## Input: a scope

The caller provides what to read. Nothing is pulled that was not asked for.

```yaml
scope:
  query: "<search query>"            # e.g. sender, label, or subject filter
  threads: []                        # specific thread ids, optional
  window: "<ISO start>..<ISO end>"   # required time bound
```

If the scope is missing a time window or a target, stop and ask the caller. Do not read the whole mailbox by default. Per-connector scoping rules live in `engine/rulebook/data-sources.md`.

## Allowed operations (read-only)

Only read operations are permitted: search threads within the scope, read a matched thread, and list labels for context. Nothing else.

**Never** send, reply, forward, create or edit a draft, add or remove a label, archive, star, or delete. Reading a draft the agent itself previously saved is allowed only when the caller explicitly asks (this is how the sent-message loop matches authorship); even then, do not modify it. If a task seems to require a write, it is out of scope: hand back and let the caller decide.

## Process

1. Read the threads in scope.
2. For each meaningful message, draft one signal.
3. Extract entities: people (from senders, recipients, and the body), orgs, decisions stated or implied, and concepts or jargon.
4. Tag intents (for example: asks-question, commits-to, raises-risk, shares-update, schedules).
5. Keep the raw text verbatim, trimmed to just enough surrounding context to stay legible. Do not copy whole long threads: capture the load-bearing lines.

## Output: a signal pack

Hand this structure back to the caller. Store links and filenames only, never attachment contents.

```yaml
source: gmail
scope:
  query: "<search query>"            # echoed back for traceability
  window: "<ISO start>..<ISO end>"
signals:
  - id: gmail-<thread-id>-<msg-id>   # stable, source-prefixed unique id
    timestamp: 2026-06-30T09:05:00Z  # ISO 8601, UTC
    raw: "<verbatim message text, load-bearing lines only>"
    entities:
      people:    []                  # senders/recipients/mentions -> atlas/people
      orgs:      []                  # companies -> atlas/orgs
      decisions: []                  # decisions stated or implied -> atlas/decisions
      concepts:  []                  # terms/jargon/topics -> atlas/terms
    intents:     []                  # e.g. ["commits-to", "asks-question"]
    links:
      source-url: "<permalink to the thread>"
      attachments: []                # filenames only, never contents
```

## Hard boundary

> Hand back to caller. Do not write files. Do not call other skills. Never send, react, or write to the source.

This subagent produces a signal pack and stops. Entity resolution against the real graph, note writing, and any judgment happen downstream in `synthesize` and `note-write`. If in doubt, return less and flag it; never act on the source.
