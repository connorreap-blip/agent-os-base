---
title: Meeting Blueprint
type: blueprint
blueprint-for: meeting
scope: base
tags: [blueprint, schema]
plain: "The shape of a meeting note. The raw transcript is an archive, not intelligence."
---

# Meeting Blueprint

> **In plain English:** one note per meeting or call. The transcript sits here as a record, but the useful facts get routed out into people, decisions, and the account.

Clone this frontmatter when creating a new meeting note at `desks/<Name>/meetings/<...>.md`. Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: meeting
title: <subject>
date: <YYYY-MM-DD>
org: "[[<Org>]]"             # link to atlas/orgs/ (the desk this belongs to)
attendees: []                # ["[[First Last]]", ...] link to atlas/people/
meeting-type: kickoff        # kickoff | follow-up | technical | growth | internal | intake
source: <transcript id | ref>  # provenance (recording or transcript reference)
decisions: []                # ["[[YYYY-MM-DD - title]]"] link to atlas/decisions/
deliverables: []             # ["[[...]]"] link to any artifacts produced
processed: null              # date the capture ran; null = unprocessed (idempotency guard)
status: raw                  # raw | processed
last-touched: <YYYY-MM-DD>   # auto-updated by capture; do not hand-edit
tags: [meeting]
---
```

## Body structure

Standard headings for a meeting note, in order:

- **Summary**: two or three lines. What happened and why it mattered.
- **Attendees**: the linked people who were present.
- **Discussion**: the key points, decisions in the making, and open threads.
- **Decisions**: the linked decisions this meeting produced.
- **Action Items / Deliverables**: what was committed and by whom (linked).
- **Transcript**: the raw text, kept as archive. Never mine it twice; the `processed` flag guards against that.

## Notes

- `processed: null` means capture has not run yet. Once synthesis mines the note, capture stamps the date and sets `status: processed`. This makes reprocessing idempotent.
- The transcript is an archive, not the intelligence. Facts belong in `atlas/` cards and the desk `overview.md`, linked back here for provenance.
- `last-touched` is stamped by the capture pass. Treat it as read-only.

> **In plain English:** file the meeting, route the facts out, and mark it processed so it never gets double-counted.
