# Automation: the four-layer continuous-execution stack

The engine stays clean because a janitor runs whether or not you remember to run it. That janitor is spread across four layers, so drift has nowhere to hide. No single layer is perfect (laptops sleep, sessions close, cloud cannot write local files), so they cover each other.

> **In plain English:** four small safety nets that keep the workspace tidy on their own. A tiny check on every save, a check when you open the workspace, a full nightly cleanup on your Mac, and a weekly cloud check that runs even if your Mac is off.

| Layer | Runs | Writes to | You enable it by |
|---|---|---|---|
| 1. On-write linter | every file save | local | it is already on (`.claude/settings.json` -> `lint-on-write.mjs`) |
| 1. Invoke-count hook | every memory Read | local | already on (`.claude/settings.json` -> `invoke-count.mjs`) |
| 2. Session-start sweep | when you open the workspace | local | already on (`.claude/settings.json` -> `session-start.sh`) |
| 3. Nightly local keeper | daily, on your Mac | local, then commits/pushes | install `keeper.launchd.plist.template` (below) |
| 4. Weekly cloud backstop | weekly, in the cloud | the repo (a PR or issue) | create a scheduled routine (below) |

## Layer 3: the nightly local keeper (macOS launchd)

The workhorse. Because it runs on your machine, it can write your files (a cloud routine cannot). Install:

1. Copy `keeper.launchd.plist.template`, replace `{{WORKSPACE_PATH}}` and `{{HOUR}}`/`{{MINUTE}}`.
2. Save to `~/Library/LaunchAgents/com.agentos.keeper.plist`.
3. `launchctl load ~/Library/LaunchAgents/com.agentos.keeper.plist`.

It runs `claude -p "Run the keeper skill, then the refresh skill. Commit and push."` and re-runs on next wake if the Mac was asleep. Requires the `claude` CLI on PATH.

## Layer 4: the weekly cloud backstop

The safety net for "laptop off all week." A scheduled cloud routine cannot touch your local files, but it does not need to: it audits the repo and opens a PR or issue with drift findings, which your next `git pull` (or the Layer 2 sweep) brings home. The repo is the sync bus (this only works because the workspace is a real git repo with a remote).

Set it up with the Claude Code `/schedule` command (weekly), pointed at the fork repo, running the keeper against the checked-out tree.

## Ambient mode (on demand)

For real-time "watch my world" behavior during an active work session:

```
/loop 30m  run refresh, then keeper-lite, then update the rundown
```

This makes ambient-assistant behavior real in the CLI, where writes actually land. Use it on heavy days; rely on Layers 1 to 4 otherwise.

## Why this matters

The system this replaced rotted for one reason: nothing ran continuously. Five stacked generations, a stale archive polluting the live graph, a "3x per day refresh" that ran twice in six weeks. These four layers plus decay-by-physics (see `engine/memory-policy.md`) and the excluded `attic/` make that failure structurally hard to repeat.
