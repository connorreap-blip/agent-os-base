#!/usr/bin/env bash
# session-start.sh  (Layer 2 of continuous execution; the session-start sweep)
#
# In plain English: whenever you open the workspace, this pulls down any changes
# the cloud auditor pushed while you were away, then reminds you to run the keeper
# if it has been a while. It is the "catch drift the moment you sit down" layer.
#
# Wiring: SessionStart hook (see .claude/settings.json). Safe and non-fatal.

set -u
ROOT="${CLAUDE_PROJECT_DIR:-.}"
cd "$ROOT" 2>/dev/null || exit 0

# Pull cloud-auditor / upstream changes if a remote exists. Fast-forward only,
# never merge-conflict a working session. Failures are ignored on purpose.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git remote | grep -q .; then
    git pull --ff-only --quiet 2>/dev/null || true
  fi
fi

# Nudge to run the weekly keeper if the last State-of-the-System report is stale.
REPORT_DIR="shipped/_health"
if [ -d "$REPORT_DIR" ]; then
  LATEST=$(ls -t "$REPORT_DIR"/state-of-the-system-*.md 2>/dev/null | head -1)
  if [ -n "${LATEST:-}" ]; then
    if find "$LATEST" -mtime +7 >/dev/null 2>&1 && [ -n "$(find "$LATEST" -mtime +7 2>/dev/null)" ]; then
      echo "[agent-os] Keeper report is over a week old. Consider running the keeper skill."
    fi
  else
    echo "[agent-os] No keeper report yet. Run the keeper skill to generate the first one."
  fi
fi

exit 0
