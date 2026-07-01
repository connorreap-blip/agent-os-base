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

## Ambient mode (background brain)

The agent can run as a background brain that ingests, synthesizes, and posts a digest plus urgent flags to your own Slack on a cadence. There are two honest ways to do this, and one way that does not work.

### Setup A: persistent `/loop` session (live connectors)

Keep a Claude Code session open on an always-on machine in your instance, with connectors authorized. That session runs `refresh` then `notify` on a cadence, driven by `/loop`. Because the send and the ingest happen inside a live interactive session, the session's authorized connectors (Slack, Gmail, Circleback) are used directly, so Slack posting and Gmail/Circleback ingest actually work. This is the recommended start.

### Setup B: unattended, token-based (hands-off)

For a hands-off setup with no session open, a launchd job (macOS) or a Desktop scheduled task runs the agent headless on a cadence with token-based access: a Slack bot token (passed via a header) or an incoming webhook, rather than an OAuth connector. This is necessary because OAuth connectors (Slack, Gmail, Circleback) do NOT work in headless `claude -p` or cron runs; only token-based access can post from an unattended process.

### Cloud `/schedule` routines are not used here

Cloud `/schedule` routines are deliberately not used for ambient posting. They clone a fresh copy from GitHub and run remotely, so they cannot write your local files and do not carry your live connectors. Ambient posting is therefore always either an open `/loop` session (Setup A) or a token-based unattended job (Setup B).
