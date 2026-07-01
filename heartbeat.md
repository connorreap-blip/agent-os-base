---
title: Heartbeat
type: registry
scope: base
tags: [system, standing-outputs, registry, heartbeat]
aliases: [Standing Outputs, Recurring Outputs]
plain: "The one list of everything the system produces on a schedule, no matter what you're working on."
---

# Heartbeat

The registry of **standing outputs**: the things this system makes on a cadence, on its own, regardless of the task in front of you. If you want to know what your second brain produces without being asked, and when, this is the single file that answers it.

> **In plain English:** this is the one place that lists the reports the system makes on its own, and how often. You never have to dig through the skills to find out what runs on a schedule.

One file, on purpose. Cadences that live scattered across a dozen skills always drift out of sync with reality. Keeping them here means the truth is in one place, and it means the `keeper` can check it: an output that is three weeks overdue is itself an audit finding.

---

## How to read an entry

Each output is one block with these fields:

- **name** : what it is called.
- **cadence** : how often it runs. Times resolve to the timezone set in `about-me.md`.
- **trigger** : `schedule` (a scheduled run), `keeper-pass` (produced as part of the weekly keeper sweep), or `loop` (fired from a persistent ambient `/loop` session, see `engine/rulebook/operating-mode.md`).
- **skill** : the skill (and flags) that produces it. These live in `skills/`.
- **destination** : where the finished file lands under `shipped/`.
- **base** : `true` if it ships with the product and contains no company data; `false` if it is a job-specific output your overlay added.

---

## The registry

```yaml
outputs:

  # --- BASE (generic, ships with the product, no company data) ---

  - name: state-of-the-system          # the flagship one-pager
    cadence: "Sun 18:00, weekly"
    trigger: schedule
    skill: keeper --state-of-system
    destination: shipped/_health/
    base: true
    # Fuses the heartbeat into one page: what changed in the graph,
    # what is cooling in memory, what contradictions are open,
    # what the keeper wants to propose, what is overdue.
    # The single artifact that tells you the system is healthy.

  - name: weekly-review
    cadence: "Fri 16:00, weekly"
    trigger: schedule
    skill: daily-rundown --weekly
    destination: shipped/YYYY-MM/
    base: true
    # What happened this week and what is next.

  - name: self-audit-report
    cadence: "Mon 08:00, weekly"
    trigger: schedule
    skill: keeper
    destination: shipped/_health/
    base: true
    # The keeper's structural findings: bloat, drift, stale
    # duplicates, orphaned instructions, phantom skills.

  - name: memory-decay-report
    cadence: weekly
    trigger: keeper-pass
    skill: keeper --memory
    destination: shipped/_health/
    base: true
    # What is cooling, what archived itself, what is pinned.

  - name: voice-drift-report
    cadence: monthly
    trigger: schedule
    skill: voiceprint --drift
    destination: shipped/_health/
    base: true
    # Is your written voice moving away from your profile.

  - name: hourly-digest
    cadence: hourly during work hours
    trigger: loop
    skill: refresh then notify
    destination: the user's Slack
    base: true
    # The background-brain digest: refresh ingests and synthesizes,
    # then notify posts the digest and any urgent items to your Slack.
    # Runs from a persistent /loop session (Setup A) or an unattended
    # token-based job (Setup B). See engine/rulebook/operating-mode.md.

  - name: home-stretch
    cadence: "weekdays 15:00 local"
    trigger: loop
    skill: home-stretch then notify
    destination: the user's Slack
    base: true
    # The end-of-day push: what still needs to land before you log off,
    # handed to notify for a Slack post.

  - name: urgent-notify
    cadence: on-trigger
    trigger: loop
    skill: notify
    destination: the user's Slack
    base: true
    # Fires the moment an urgent signal clears the bar, out of band from
    # the digest cadence. See engine/rulebook/urgency.md.

  # --- OVERLAY (job-specific, added by your preset or by hand) ---
  # These bind to your real data, so they carry base: false.
  # Example (from the customer-ops / executive-assistant presets):
  #
  # - name: partner-four-box
  #   cadence: weekly
  #   trigger: schedule
  #   skill: weekly-fourbox
  #   destination: shipped/YYYY-MM/
  #   base: false
```

---

## Base outputs vs overlay outputs

- **Base outputs** are valuable for anyone and hold no company data: the *state-of-the-system* one-pager, the *weekly review*, the *self-audit report*, the *memory-decay report*, and the *voice-drift report*. They ship on by default so a fresh install has a heartbeat from day one.
- **Overlay outputs** bind to your real accounts, partners, or projects: a *partner four-box*, an *account-health roll-up*, a *kickoff-recap digest*, a *reading digest*. Your preset proposes these during `/onboard`, and they are added here with `base: false`. Job-specific outputs never carry `base: true`.

An overlay output that proves generally useful can be promoted to base later. The keeper only proposes that move; a human executes it, per the house rules.
