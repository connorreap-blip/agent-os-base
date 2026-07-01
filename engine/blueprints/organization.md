---
title: Organization Blueprint
type: blueprint
blueprint-for: organization
scope: base
tags: [blueprint, schema]
plain: "The shape of a company card (customer, partner, vendor, or prospect)."
---

# Organization Blueprint

> **In plain English:** the card for any company you deal with (a customer, a partner, or a vendor), all one shape, told apart by the `org-class` field.

Clone this frontmatter when creating a new organization note at `atlas/orgs/<Name>.md`. Fill the placeholders, keep the controlled vocabularies, and never hand-edit the auto fields.

## Frontmatter schema

```yaml
---
type: organization
name: <Name>
org-class: customer          # customer | partner | vendor | prospect
status: GREEN                # GREEN | AMBER | RED
stage: kickoff               # prospect | kickoff | implementing | live | churned
region: NOAM                 # controlled per your org list; NOAM is a placeholder default
erp: null                    # e.g. "Microsoft Dynamics 365"; mark (confirm) if unverified
key-contacts: []             # ["[[First Last]]", ...] link to atlas/people/
internal-owners: ["[[<Your Name>]]"]   # who on your side runs this account
slack-channel: null            # e.g. "#dp-<name>" - this org's Slack channel; joins the priority ingest list and routes its messages to this desk
decisions: []                # ["[[YYYY-MM-DD - title]]"] link to atlas/decisions/
source: sales-handoff        # provenance (where this org came from)
health: null                 # free-note; drives status
last-touched: <YYYY-MM-DD>   # auto-updated by capture; do not hand-edit
date: <YYYY-MM-DD>
aliases: []
tags: [organization]
---
```

## Body structure

Standard headings for an organization note, in order:

- **Overview**: one paragraph. Who they are and the nature of the relationship.
- **Key Contacts**: the linked people from `atlas/people/` who matter here.
- **Decisions**: the linked decisions from `atlas/decisions/` that touch this org.
- **Health**: the free note that justifies `status` (why GREEN, AMBER, or RED).
- **Activity Log**: append-only, most-recent-first. If this org is run as a desk, replace the body with a one-line stub pointer to `desks/<Name>/overview.md` (no duplication).

## Notes

- `org-class` unifies what other systems split into "customer" and "partner" and "vendor". One shape, one folder.
- Reciprocity: if this org lists a person in `key-contacts`, that person's note lists this org in `related-orgs`. The synthesize skill validates both sides before write.
- `last-touched` is stamped by the capture pass. Treat it as read-only.
- An actively-run account's canonical card is its desk `overview.md` (see `account.md`); the `atlas/orgs/` note is then just a stub link.

> **In plain English:** one card per company, four kinds, and both ends of every link stay in sync.
