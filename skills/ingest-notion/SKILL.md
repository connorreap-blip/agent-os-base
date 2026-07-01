---
name: ingest-notion
description: Read-only Notion connector subagent. Given a scope (pages, databases, or a search query plus a time window), it reads the content, extracts entities and intents, and hands back a signal pack. It never writes files, never calls other skills, and never creates, edits, comments on, or moves anything in Notion. Dispatched by the refresh orchestrator; not invoked directly by the user.
scope: base
plain: "Reads Notion pages or databases for a given scope and hands back a structured signal pack. Read-only, no writes, no comments."
---

# ingest-notion

> **In plain English:** this reads the Notion pages or database rows you point it at, pulls out who and what was mentioned, and hands that back as a tidy list. It never creates, edits, comments, or moves anything in Notion, and it never saves a file.

This is a **connector subagent**, not a user-facing skill. The `refresh` orchestrator dispatches it, collects its signal pack, and passes the pack to `synthesize`. It has one job: turn a scope into a signal pack and hand it back.

## Input: a scope

The caller provides what to read. Nothing is pulled that was not asked for.

```yaml
scope:
  pages: []                          # page ids to read
  databases: []                      # database/data-source ids to query
  query: "<search query>"            # optional, when the target is not known by id
  window: "<ISO start>..<ISO end>"   # bound by last-edited time
```

If the scope has no target and no query, stop and ask the caller. Do not crawl the whole workspace by default. Per-connector scoping rules live in `engine/rulebook/data-sources.md`.

## Allowed operations (read-only)

Only read operations are permitted: search, fetch a page, query a database or data source, and read comments for context. Nothing else.

**Never** create a page or database, update a page or property, create or reply to a comment, move a page, or change a view. If a task seems to require a write, it is out of scope: hand back and let the caller decide.

## Process

1. Read the pages or rows in scope, preferring items edited inside the window.
2. For each meaningful block or row, draft one signal.
3. Extract entities: people (mentions and person-properties), orgs, decisions stated or implied, and concepts or jargon.
4. Tag intents (for example: documents-decision, tracks-task, defines-term, shares-status).
5. Keep the raw text verbatim and trimmed to the load-bearing content.

## Output: a signal pack

Hand this structure back to the caller. Store links only, never page contents beyond the raw excerpt.

```yaml
source: notion
scope:
  pages: []                          # echoed back for traceability
  window: "<ISO start>..<ISO end>"
signals:
  - id: notion-<page-id>-<block-id>  # stable, source-prefixed unique id
    timestamp: 2026-06-29T18:40:00Z  # ISO 8601, UTC (last edited)
    raw: "<verbatim block or row text, load-bearing content only>"
    entities:
      people:    []                  # mentions/person-properties -> atlas/people
      orgs:      []                  # companies -> atlas/orgs
      decisions: []                  # decisions stated or implied -> atlas/decisions
      concepts:  []                  # terms/jargon/topics -> atlas/terms
    intents:     []                  # e.g. ["documents-decision", "tracks-task"]
    links:
      source-url: "<link to the page or row>"
      attachments: []                # linked files only, never contents
```

## Hard boundary

> Hand back to caller. Do not write files. Do not call other skills. Never send, react, or write to the source.

This subagent produces a signal pack and stops. Entity resolution against the real graph, note writing, and any judgment happen downstream in `synthesize` and `note-write`. If in doubt, return less and flag it; never act on the source.
