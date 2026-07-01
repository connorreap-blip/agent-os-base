---
title: Account (Desk) Blueprint
type: blueprint
blueprint-for: desk
scope: base
tags: [blueprint, schema]
plain: "The shape of a desk overview: an org card plus live operational state."
---

# Account (Desk) Blueprint

> **In plain English:** the single summary page for one account (a customer or partner you actively run). It is the organization card plus the day-to-day state, so "what is going on here" is one read.

Clone this frontmatter when creating a new desk at `desks/<Name>/overview.md`. It inherits the full organization schema and adds operational state. The overlay may extend it with job-specific fields via `extends`. Fill the placeholders and keep the controlled vocabularies.

## Frontmatter schema

```yaml
---
type: desk
extends: null                # overlay: extends: "[[base/blueprints/account]]"
# --- inherits the full organization schema ---
type-org: organization
name: <Name>
org-class: customer          # customer | partner | vendor | prospect
status: GREEN                # GREEN | AMBER | RED
stage: kickoff               # prospect | kickoff | implementing | live | churned
region: NOAM                 # controlled per your org list; NOAM is a placeholder default
erp: null                    # e.g. "Microsoft Dynamics 365"; mark (confirm) if unverified
key-contacts: []             # ["[[First Last]]", ...] link to atlas/people/
internal-owners: ["[[<Your Name>]]"]
decisions: []                # ["[[YYYY-MM-DD - title]]"] link to atlas/decisions/
source: sales-handoff        # provenance
health: null                 # free-note; drives status
# --- operational state (desk-only) ---
current-focus: <one line>
next-touch: <YYYY-MM-DD>
open-tasks: []               # ["[[tasks/...]]"]
last-touched: <YYYY-MM-DD>   # auto-updated by capture; do not hand-edit
date: <YYYY-MM-DD>
aliases: []
tags: [desk, organization]
---
```

## Body structure

Standard headings for a desk overview, in order:

- **State**: the snapshot line (status, stage, and current focus in a sentence).
- **Current Focus**: what is being worked right now.
- **Open Tasks**: the linked tasks from `tasks/`.
- **Key Contacts**: the linked people at this account.
- **Decisions**: the linked decisions that shaped it.
- **Meetings**: recent linked meeting notes.
- **Deliverables**: finished artifacts produced for this account.
- **Activity Log**: append-only, most-recent-first. Capture writes here.

## Notes

- The desk overview IS the canonical org card for an actively-run account. The `atlas/orgs/<Name>.md` note holds only a stub link to it (no duplication).
- People and decisions are NOT duplicated into the desk. They live in `atlas/` and are linked, so cross-account queries still work.
- `last-touched` is stamped by the capture pass. Treat it as read-only.
- The overlay may set `extends: "[[base/blueprints/account]]"` and add job-specific fields (for example a handoff date, a watch flag, or an escalation contact) without editing this base file.

> **In plain English:** one page per account, the org card and its live state together, with people and decisions linked in rather than copied.
