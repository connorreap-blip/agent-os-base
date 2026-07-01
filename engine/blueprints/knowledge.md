---
title: Knowledge Blueprint
type: blueprint
blueprint-for: knowledge
scope: base
tags: [blueprint, schema]
plain: "The shape of a knowledge-base note: synthesized, topic-aggregated, and traceable."
---

# Knowledge Blueprint

> **In plain English:** one note per topic (a feature, a flow, a policy) that gathers everything the system has learned about it, merged in place and traceable to the sources it was built from.

Clone this frontmatter when creating a new knowledge note (product or domain KB). Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: knowledge
topic: <feature or flow>     # e.g. a product area, a workflow, a policy
source-transcripts: []       # ["<transcript-id>", ...] traceable back to synthesis inputs
confidence: high             # high | medium | low
supersedes: null             # ["[[old note]]"] if this merges or replaces a prior note
last-synthesized: <YYYY-MM-DD>  # auto-updated when synthesis refreshes it; do not hand-edit
tags: [knowledge]
---
```

## Body structure

A knowledge note is topic-aggregate: one H2 heading per sub-concept or flow, refined in place. Under each heading, in order:

- **What it is**: the plain description.
- **How it works**: the mechanics or steps.
- **Edge cases**: exceptions, gotchas, and limits.
- **Open questions**: anything unconfirmed (carry a `(confirm)`).

## Notes

- Merge, never append-duplicate. When new signal arrives on a topic, refine the existing heading in place rather than stacking a second copy.
- `source-transcripts` keeps the synthesis auditable: every claim traces to the inputs it was mined from.
- `supersedes` links a note this one replaces or absorbs, so the keeper can retire the old one cleanly.
- `last-synthesized` is stamped by the synthesis pass. Treat it as read-only.

> **In plain English:** one living note per topic, kept current by merging, and always traceable to its sources.
