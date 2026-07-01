---
title: Promotion and Repo Safety
scope: base
tags: [rules, promotion, git, safety]
paths: ["skills/**", "engine/**"]
plain: "The system is two separate repos: a private instance holding your data, and a shared base holding the generic engine. Base improvements flow down by pulling upstream; generic patterns flow up only by copying a scrubbed file into the base repo. The instance is never pushed upstream."
---

# Promotion and Repo Safety

> **In plain English:** there are two separate repos. Your private copy holds your data. The shared engine holds the generic parts. Upgrades come down to you by pulling from the shared engine. Your good generic ideas go up only by copying a cleaned, data-free version into the shared engine repo. Your private copy is never pushed up.

Loads when a file under `skills/` or `engine/` is in scope. This is the rule the `promote` skill enforces.

## The two repos

- **Instance (private).** Your working copy. Holds the overlay: `desks/`, `atlas/`, `memory/`, `voice/`, `about-me.md`, and your connectors. This is yours and stays private. It pushes only to its own private `origin`.
- **Base (shared).** The generic engine that anyone can use: `skills/`, `engine/`, templates, and the house rules. No personal or company data lives here. The instance tracks it as the `upstream` remote.

## The one-way links

- **Base improvements flow DOWN.** You receive engine upgrades by pulling from `upstream` (fetch and merge). This never touches your data.
- **Generic patterns flow UP by promotion-by-copy.** A reusable, data-free pattern is lifted up by copying a scrubbed version of one file into the base repo. It never flows up by pushing the instance.

These are the only two paths between the repos, and each runs one way.

## Hard rules

- **NEVER `git push upstream` from the instance.** Upstream push is disabled by design. Leave it disabled. Pushing the instance up would publish private data.
- **The instance pushes only to its private `origin`.** That is its own backup remote, never the shared base.
- **Promotion is a copy, not a push.** To promote: copy the data-free file into the base repo at the same relative path, sanitize its specifics to `{{placeholders}}`, scan for private markers, then commit and push the **base** repo's own remote. The base repo's pre-push guard double-checks and blocks any overlay or private data.
- **Path discipline keeps private data structurally out of the public repo.** Overlay data lives only in overlay paths (`desks/`, `atlas/`, `memory/`, `voice/`, `about-me.md`). Only base-path files (`skills/`, `engine/`, templates, house rules) are eligible to promote. This structure, not vigilance, is what keeps private data out of the shared base.

## Who does what

- **The `promote` skill prepares and proposes.** It picks the candidate, produces the sanitized copy, runs the private-marker scan, stages the copy into the base repo, and pulls the result back. It does not auto-publish.
- **A human approves.** Every promotion is executed under human approval. The skill sets it up; a person says yes.
- **The keeper flags and audits.** The keeper proposes promotion candidates in its Gap ledger when it sees a generic pattern repeated, and it audits that no overlay data ever leaked into base paths. It proposes; it never promotes on its own.

See `skills/promote/SKILL.md` for the step-by-step, and `house-rules.md` for the constitutional stop on pushing the instance upstream.
