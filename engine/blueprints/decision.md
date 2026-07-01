---
title: Decision Blueprint
type: blueprint
blueprint-for: decision
scope: base
tags: [blueprint, schema]
plain: "The shape of a decision card, capturing what was decided and why."
---

# Decision Blueprint

> **In plain English:** one card per real decision, recording not just the call but the reasoning behind it, so future you knows why.

Clone this frontmatter when creating a new decision note at `atlas/decisions/YYYY-MM-DD - <title>.md`. Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: decision
title: <what was decided>
date: <YYYY-MM-DD>
decided-by: "[[<Your Name>]]"          # link to the person who made the call
context-source: "[[meeting or thread]]"  # link to where it happened
related-orgs: []             # ["[[Org]]"] link to atlas/orgs/
reversibility: reversible    # reversible | committed
status: active               # active | reversed | superseded
tags: [decision]
---
```

## Body structure

Standard headings for a decision note, in order:

- **Decision**: the one-line statement of what was decided.
- **Context**: the situation and the why. What forced the call.
- **Options Considered**: the alternatives and why they were rejected.
- **Consequences**: what this commits or unlocks, plus a note on reversibility.
- **References**: the source meeting or thread and any related decisions (linked).

## Notes

- `reversibility` says whether the decision can be walked back cheaply (`reversible`) or is a one-way door (`committed`).
- Decisions are pruned conservatively. A stale decision is not archived by disuse; it is marked `status: reversed` or `status: superseded` and kept for the historical record.
- Every decision traces to a `context-source`. If none exists, mark the source `(confirm)`.

> **In plain English:** capture the call and the reasoning; never delete a decision, retire it.
