---
title: Source Blueprint
type: blueprint
blueprint-for: source
scope: base
tags: [blueprint, schema]
plain: "The shape of a source card: one per document fed into the system."
---

# Source Blueprint

> **In plain English:** one card per document, transcript, or article you feed in, so every fact can trace back to where it came from.

Clone this frontmatter when creating a new source note at `atlas/sources/YYYY-MM-DD - <title>.md`. Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: source
title: <document title>
date: <YYYY-MM-DD>
source-type: transcript      # transcript | document | email | thread | article | deck
origin: null                 # url or file path
related-orgs: []             # ["[[Org]]"] link to atlas/orgs/
related-people: []           # ["[[First Last]]", ...] link to atlas/people/
ingested: <YYYY-MM-DD>       # when it entered the system
processed: false             # true after synthesis has mined it
confidence: high             # high | medium | low
tags: [source]
---
```

## Body structure

Standard headings for a source note, in order:

- **Summary**: what this document is and why it matters.
- **Key Excerpts**: the load-bearing passages, quoted.
- **Extracted Entities**: the people, orgs, decisions, and terms found in it (linked).
- **Notes**: synthesis observations and anything left to follow up.

## Notes

- A large writing corpus (voice samples, long transcripts) lives here as a source, not pasted inline into another note.
- `processed: false` means synthesis has not mined it yet. Flip to `true` once its facts are routed, so it is not re-mined.
- `confidence` grades how much to trust the document itself (`high | medium | low`), separate from any single fact drawn from it.

> **In plain English:** every fact points back to a source card, and each source is mined exactly once.
