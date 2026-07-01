#!/usr/bin/env node
/*
 * lint-on-write.mjs  (Layer 1 of continuous execution; the on-write linter)
 *
 * In plain English: every time the agent writes or edits a note in atlas/ or
 * desks/, this checks the note has valid frontmatter and a `type:` field, and
 * warns (never blocks) if something looks off. It keeps small mistakes from
 * accumulating into the kind of drift that rotted the old system.
 *
 * Wiring: PostToolUse hook on Write|Edit (see .claude/settings.json).
 * Advisory only. Prints a short note to stderr and always exits 0.
 */
import { readFileSync } from "node:fs";

const REQUIRED_BY_DIR = {
  "atlas/people/": ["type", "name"],
  "atlas/orgs/": ["type", "name", "org-class"],
  "atlas/decisions/": ["type", "title", "date"],
  "atlas/terms/": ["type", "term"],
  "atlas/sources/": ["type", "title"],
  "desks/": ["type"]
};

function main() {
  let raw = "";
  try { raw = readFileSync(0, "utf8"); } catch { return; }
  let payload;
  try { payload = JSON.parse(raw); } catch { return; }

  const file = (payload.tool_input && payload.tool_input.file_path) || "";
  if (!file.endsWith(".md")) return;
  if (/(^|\/)\.about\.md$/.test(file)) return;      // folder notes are exempt
  if (!/(^|\/)(atlas|desks)\//.test(file)) return;  // only knowledge notes

  let text;
  try { text = readFileSync(file, "utf8"); } catch { return; }

  const warnings = [];
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    warnings.push("missing YAML frontmatter");
  } else {
    const block = fm[1];
    let required = null;
    for (const dir of Object.keys(REQUIRED_BY_DIR)) {
      if (file.includes(dir)) { required = REQUIRED_BY_DIR[dir]; break; }
    }
    if (required) {
      for (const key of required) {
        if (!new RegExp(`^${key}:`, "m").test(block)) warnings.push(`missing "${key}:"`);
      }
    }
    if (/[—–]/.test(text)) warnings.push("contains an em/en dash (house style bans them)");
  }

  if (warnings.length) {
    process.stderr.write(
      `[lint] ${file.split("/").slice(-2).join("/")}: ${warnings.join("; ")}\n`
    );
  }
}

try { main(); } catch { /* advisory only */ }
process.exit(0);
