---
title: Urgency and Interrupts
scope: base
tags: [rules, urgency, notify]
paths: ["desks/**", "tasks/**"]
plain: "What counts as urgent, and the rule that urgent things get posted right away instead of waiting for the next scheduled digest."
---

# Urgency and Interrupts

> **In plain English:** most updates wait for the next scheduled digest. A few things cannot wait. This defines which ones, and says the agent posts those immediately instead of holding them.

Loads when a file under `desks/` or `tasks/` is in scope. It governs one decision: when a refresh finds something, does it go out now or wait for the cadence.

## What counts as urgent

A signal is URGENT when it is one of these:

- A `#codered` post - the explicit break-glass tag.
- A direct DM or an @mention asking for something time-sensitive.
- A customer escalation signal: stalled, blocker, unhappy, at-risk, churn.
- A desk flipping to RED status.

Everything else is non-urgent by default.

## The interrupt rule

- When a refresh detects an urgent signal, hand it to `notify` immediately, out of cadence. Do not wait for the next scheduled digest.
- Everything non-urgent waits for the cadence. It rides in the next scheduled digest rather than interrupting.
- The interrupt still respects every boundary in `notify` and `house-rules.md`: it posts only to the user's own configured self-destination, never to a customer, partner, or external channel.

## Why interrupt at all

An update that arrives after the moment it mattered is noise. The whole point of the ambient brain is that a RED desk or a customer escalation reaches the user while there is still time to act. Batching those into a scheduled digest would defeat it. So urgency is the one thing allowed to break cadence, and only through the same single, self-only channel.
