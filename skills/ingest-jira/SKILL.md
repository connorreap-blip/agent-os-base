---
name: ingest-jira
description: Read-only Jira connector subagent. Given a scope (project, JQL, or a set of issue keys, plus a time window), it reads the matching issues, extracts entities and intents, and hands back a signal pack. It never writes files, never calls other skills, and never creates, edits, transitions, or comments on an issue. Dispatched by the refresh orchestrator; not invoked directly by the user.
scope: base
plain: "Reads Jira issues for a given scope and hands back a structured signal pack. Read-only, no writes, no ticket changes."
---

# ingest-jira

> **In plain English:** this reads the Jira tickets you point it at (a project, a search, or specific keys), pulls out who and what they are about and their status, and hands that back as a tidy list. It never creates, edits, moves, or comments on a ticket, and it never saves a file.

This is a **connector subagent**, not a user-facing skill. The `refresh` orchestrator dispatches it, collects its signal pack, and passes the pack to `synthesize`. One job: turn a scope into a signal pack and hand it back. Creating or updating a ticket is out of scope here; a ticket the user wants to file is drafted through `deliverable` and saved for review, never written to Jira.

## Input: a scope

The caller provides what to read. Nothing is pulled that was not asked for.

```yaml
scope:
  project: ""             # project key, e.g. "GROW"; optional if issues/jql given
  jql: ""                 # a JQL query, optional; the precise scope when present
  issues: []              # specific issue keys, optional
  window: "<ISO start>..<ISO end>"   # required time bound on updated-since
```

If the scope has no time window and no explicit target (project, jql, or issues), stop and ask the caller. Do not read the whole tracker by default. Per-connector scoping rules live in `engine/rulebook/data-sources.md`.

## Allowed operations (read-only)

Only read operations: search issues by JQL, read an issue and its fields, read comments and the changelog for context, read a linked epic or parent for hierarchy, resolve an account id to a display name. Nothing else.

**Never** create an issue, edit a field, transition status, add or edit a comment, assign, or link. If a task seems to require any of those, it is out of scope: hand back and let the caller decide.

## Process

1. Read the issues in scope.
2. For each meaningful issue (skip pure noise), draft one signal.
3. Extract entities: people (reporter, assignee, resolve account ids to real names), orgs (the customer the issue concerns, often from a field or the project), decisions or status changes implied, and concepts or jargon.
4. Tag intents (for example: raises-bug, requests-feature, blocked, awaits-answer, committed-date, status-change).
5. Capture the issue key, type, status, priority, and any due date verbatim; trim the description to just enough context to stay legible.

## Output: a signal pack

Hand this structure back to the caller. Store links and keys only, never attachment contents.

```yaml
source: jira
scope:
  project: ""                        # echoed back for traceability
  window: "<ISO start>..<ISO end>"
signals:
  - id: jira-<ISSUEKEY>              # the issue key is the stable id
    timestamp: 2026-07-01T14:22:00Z  # ISO 8601, UTC (last updated)
    raw: "<key, type, status, priority, summary, trimmed description>"
    fields:
      key: ""                         # e.g. GROW-482
      type: ""                        # bug | story | task | epic
      status: ""                      # e.g. In Progress
      priority: ""                    # e.g. High
      due: ""                         # date or empty
    entities:
      people:    []                  # reporter/assignee -> atlas/people
      orgs:      []                  # the customer the issue concerns -> atlas/orgs
      decisions: []                  # decisions/status changes implied -> atlas/decisions
      concepts:  []                  # terms/jargon/topics -> atlas/terms
    intents:     []                  # e.g. ["raises-bug", "blocked"]
    links:
      source-url: "<permalink to the issue>"
      attachments: []                # urls/keys only, never contents
```

## Hard boundary

> Hand back to caller. Do not write files. Do not call other skills. Never create, edit, transition, comment on, or link an issue.

This subagent produces a signal pack and stops. Entity resolution, note writing, and any judgment happen downstream in `synthesize` and `note-write`. If in doubt, return less and flag it; never act on the source.
