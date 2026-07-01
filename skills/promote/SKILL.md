---
name: promote
description: "Promote a generic, data-free pattern or skill from the private instance up to the shared base, safely. Invoke when a pattern has proved broadly useful and is generic (or can be stripped to placeholders), or when the keeper proposed it in the Gap ledger and a human approved. Prepares and proposes the lift; it never auto-publishes and never pushes private data."
scope: base
plain: "Lifts a scrubbed, reusable skill or rule from your private copy up to the shared engine, after a human says yes. It never pushes your private data."
---

# promote

> **In plain English:** when something you built turns out to be generally useful and has no personal or company data in it, this carefully copies a clean version of it into the shared engine repo, checks it for leaks, and then pulls the improvement back into your copy. A human approves every promotion; it never pushes your private files upstream.

Promote moves a generic pattern from the private instance up to the shared base. It does this by **copying a data-free file into the base repo**, not by pushing the instance anywhere. See `engine/rulebook/promotion.md` for the full operating rule.

## The one rule it enforces

The instance and the base are **two separate git repos**. The private instance holds your overlay (identity, contacts, customers, voice, memory). The base is the generic engine (skills, rulebook, blueprints, house rules).

- NEVER `git push` the instance to `upstream`. Upstream push is disabled and stays disabled. Pushing the instance up would publish private data.
- Promotion is a **deliberate copy** of a single data-free file into the base repo, sanitized and scanned first.
- Base improvements flow **down** into the instance by pulling from `upstream`. Generic patterns flow **up** only by this copy, never by a push of the instance.

## When to use

- A skill or pattern has proved broadly useful and is already generic (no personal, customer, or company specifics in it).
- Or its specifics can be cleanly stripped down to `{{placeholders}}` without gutting what makes it useful.
- Or the keeper proposed it as a promotion candidate in the Gap ledger and a human approved the lift.

If none of these hold, do not promote. Leave it in the overlay.

## Steps

1. **Pick the candidate and confirm it is generic.** Choose the file to promote. Read it end to end. Confirm it either contains no personal or company data, or that every such specific can be replaced with a `{{placeholder}}`. If it cannot be made generic, stop here.
2. **Sanitize into a data-free copy.** Produce a clean copy where every personal or company specific is replaced with a `{{placeholder}}` (for example `{{company}}`, `{{person}}`, `{{customer}}`). Do not edit the original instance file in place for this; work on the copy that will land in base.
3. **Scan for private markers, and STOP if any remain.** Grep the sanitized copy for: email addresses; customer and org names (cross-check against `atlas/orgs/` and `desks/`); people names (`atlas/people/`); and overlay paths (`desks/`, `atlas/`, `memory/`, `voice/`, references to `about-me.md`). If any private marker survives, STOP and fix the sanitization. A single leaked marker halts the promotion.
4. **Copy the sanitized file into the base repo working tree.** Write the clean file into the base checkout at the **same relative path** (for example `skills/<name>/SKILL.md` in the instance becomes `skills/<name>/SKILL.md` in the base). Write into the base checkout directly. Do not edit base files from inside the instance tree.
5. **Commit in the base repo and push the base repo's own remote (`origin`).** Commit the new file in the base repo, then push the **base** repo's own `origin`. The base repo's pre-push guard double-checks that no overlay or private data is present and blocks the push if it finds any.
6. **Pull the improvement back into the instance.** From the instance, fetch and merge the base:
   ```
   git -C <instance> fetch upstream
   git -C <instance> merge --no-edit upstream/main
   ```
7. **Log it.** Add or update the row in `skills/menu.md` if a skill was promoted, and note the promotion in the keeper report so the lift is visible in the State-of-the-System output.

## Hard boundaries

- Never `git push upstream` from the instance. Upstream push is disabled; leave it disabled.
- Never promote a file that still contains company or customer data. The scan in step 3 is a hard stop, not a warning.
- A human approves every promotion. This skill prepares and proposes; it does not auto-publish.

## What stays private

- Everything in the overlay paths is never promoted: `desks/`, `atlas/`, `memory/`, `voice/`, and `about-me.md`.
- Only generic base-path files are eligible: `skills/`, `engine/`, templates, and the house rules.
- Path discipline is the guarantee: private data lives structurally outside the base paths, so it cannot ride along in a promotion.
