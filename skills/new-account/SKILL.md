---
name: new-account
description: "Stands up a new customer or partner. Invoke when the user says add an account, onboard a new customer, create a desk for X, or set up a new client. Clones the current account blueprint into desks/<Name>/ and seeds the overview. Because this creates a new organization, it confirms with the human before writing."
scope: base
plain: "Sets up a fresh folder and overview for a new customer or partner, after you confirm."
---

# new-account

> **In plain English:** this creates a clean folder and starter overview for a new customer or partner, using your standard blueprint. Because adding a company is a real commitment, it asks you to confirm first.

New-account clones the account blueprint into a new desk and seeds its overview. Creating an organization is a confirmation-gated action per `house-rules.md`; this skill always confirms before it writes.

## Trigger

- User says: add an account, onboard a new customer, create a desk for X, set up a new client.

## Steps

1. **Collect the essentials.** Name, org-class (customer, partner, vendor, prospect), region, key contacts, internal owner, source (for example sales-handoff), and current stage. Mark anything unverified `(confirm)`.
2. **Confirm.** Show the proposed org card and desk name. Wait for an explicit yes. Do not proceed without it.
3. **Clone the blueprint.** Create `desks/<Name>/` with the standard subfolders: `meetings/`, `deliverables/`, `raw-assets/`.
4. **Seed the overview.** Write `desks/<Name>/overview.md` from the `desk` blueprint in `engine/blueprints/desk.md`: full organization frontmatter plus operational state (`current-focus`, `next-touch`, `open-tasks`) and an empty Activity Log.
5. **Link, do not duplicate.** Create a stub `atlas/orgs/<Name>.md` that points to the desk overview (the overview is the canonical org card for a live account). Add key contacts as `atlas/people/` cards (First plus Last), linked reciprocally.
6. **Report** the created paths.

## Input / output

```
input:  {name, org-class, region, key-contacts: [...], internal-owner, source, stage}
output: desks/<Name>/overview.md  (+ subfolders)  and  atlas/orgs/<Name>.md stub  (+ people stubs)
```

## Boundaries

- Confirmation-gated: never creates an organization or desk without an explicit yes.
- People and decisions live in `atlas/` and are linked, never duplicated into the desk.
- Seeds structure only; it does not invent facts. Unknowns are `(confirm)`.
