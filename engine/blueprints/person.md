---
title: Person Blueprint
type: blueprint
blueprint-for: person
scope: base
tags: [blueprint, schema]
plain: "The shape of a person card. The name is always First Last."
---

# Person Blueprint

> **In plain English:** one reusable card per human you work with, filed by their real First and Last name so the same person never gets two cards.

Clone this frontmatter when creating a new person note at `atlas/people/<First Last>.md`. Fill the placeholders, keep the controlled vocabularies, and never hand-edit the auto fields.

## Frontmatter schema

```yaml
---
type: person
name: <First Last>           # ALWAYS First + Last (enforced by the linter)
role: <Title>
organization: <Company>
email: null
related-orgs: []             # ["[[Org]]"] link to atlas/orgs/
related-decisions: []        # ["[[YYYY-MM-DD - title]]"] link to atlas/decisions/
status: active               # active | departed | external | inactive
confidence: confirmed        # confirmed | (confirm)
last-mentioned: <YYYY-MM-DD> # auto-updated by capture; do not hand-edit
date: <YYYY-MM-DD>
aliases: []
tags: [person]
---
```

## Body structure

Standard headings for a person note, in order:

- **Snapshot**: one line. Who they are, their role, and their org.
- **Relationships**: the orgs and people they connect to (linked).
- **Notes**: context, working preferences, and history worth keeping.
- **Recent Mentions**: where they last came up (source or meeting links).

## Notes

- `name` is always First plus Last. A bare first name, a handle, or a title is a linter failure. Put nicknames and handles in `aliases`.
- `confidence: (confirm)` means the identity or a key detail is not yet verified. Never assert a `(confirm)` fact as settled.
- `last-mentioned` is stamped by the capture pass. Treat it as read-only.
- Reciprocity: if this person lists an org in `related-orgs`, that org lists this person in `key-contacts`.

> **In plain English:** real full names only, one card each, verified or flagged.
