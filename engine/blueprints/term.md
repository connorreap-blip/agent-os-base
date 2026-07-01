---
title: Term Blueprint
type: blueprint
blueprint-for: concept
scope: base
tags: [blueprint, schema]
plain: "The shape of a glossary term (a concept card that defines the jargon)."
---

# Term Blueprint

> **In plain English:** one card per piece of jargon, so the system (and anyone reading it) always knows what a word means. Doubles as the glossary.

Clone this frontmatter when creating a new term note at `atlas/terms/<Term>.md`. Note the `type` is `concept` (the term is the concept's label). Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: concept
term: <Term>
definition: <one-line plain meaning>
related-terms: []            # ["[[Term]]"] link to other atlas/terms/
related-orgs: []             # ["[[Org]]"] link to atlas/orgs/
confidence: confirmed        # confirmed | (confirm)
last-invoked: <YYYY-MM-DD>   # auto-updated on use; drives conservative decay; do not hand-edit
status: active               # active | deprecated
source: <where it came from>
date: <YYYY-MM-DD>
aliases: []
tags: [concept]
---
```

## Body structure

Standard headings for a term note, in order:

- **Definition**: the one-line plain meaning (mirrors the frontmatter field).
- **Explanation**: the fuller description, in plain language.
- **Related Terms**: linked concepts this connects to.
- **Examples / Usage**: how it shows up in practice.

## Notes

- `type` is `concept` even though the file lives in `atlas/terms/`. The `term` field carries the label.
- `last-invoked` is stamped whenever the concept is surfaced. It feeds a conservative decay: only an unreferenced, low-confidence, never-invoked concept is ever proposed for archival.
- Retire an obsolete term with `status: deprecated` rather than deleting it.
- `confidence: (confirm)` marks a definition you are not yet sure of.

> **In plain English:** define the jargon once, link it, and let unused terms fade slowly rather than vanish.
