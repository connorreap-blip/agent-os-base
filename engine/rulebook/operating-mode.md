---
title: Operating Mode
scope: base
plain: "State plainly what runs on its own and what you trigger; never describe automation the environment cannot actually perform."
tags: [system, rulebook, honesty]
---

# Operating Mode

> **In plain English:** be honest about what is automatic and what is manual. If a scheduled job cannot write to your laptop, say so and give the real path instead of pretending.

Always loaded (no `paths:`). This is the honesty rule made concrete. The overlay `connectors.md` states what is actually wired and running for this instance.

## The honesty rule

- State plainly what is automated versus manual. Never describe an automation the environment cannot perform.
- The hard constraint: cloud routines run remotely against a GitHub repo, not your local filesystem, so a scheduled cloud job cannot write your local vault. If something cannot write local, say so and provide the real path.
- If a process is manual, call it manual. Do not claim always-on behavior the instance does not have.

## The four-layer continuous-execution stack

Because the instance is a fork with a real remote, the repo is the sync bus: the cloud writes to the remote and your laptop pulls it down. That makes a layered, always-on audit possible without pretending.

| Layer | Runs | Writes to | Covers |
|---|---|---|---|
| 1. On-write linter (hook) | every file save | local | micro-drift: bad frontmatter, dead links |
| 2. SessionStart sweep (hook) | when you open a session | local | catches drift on sit-down; `git pull` first |
| 3. Local scheduled keeper (launchd) | daily, on your Mac | local, then commits and pushes | the heavy audit and refresh, writing local because it runs local |
| 4. Cloud keeper routine (backstop) | weekly, in the cloud | the repo (a PR or issue) | runs even if the laptop is off all week |

Layers 1, 2, and 4 ship in base (hooks plus a cloud routine template, no local setup). Layer 3 is documented as a recommended local upgrade (a launchd plist onboarding can offer to install). Layer 2 alone guarantees the keeper runs at least every time you work.

## Repo-as-sync-bus

- Cloud writes to the remote; local pulls from the remote. This is why the fork remote is load-bearing for continuous execution: it dissolves the "cloud cannot write local" limit without any dishonest claim.

## `/loop` ambient mode

- For real-time "watch my world" during an active session, run the loop on an interval, for example: `/loop 30m run refresh, then keeper-lite, then update the rundown`.
- It is human-initiated once, then self-sustaining for the session, and its writes actually land locally (unlike a cloud routine). Use it on heavy days; rely on Layers 1 through 4 otherwise.
