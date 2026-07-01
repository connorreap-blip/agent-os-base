#!/usr/bin/env node
/*
 * invoke-count.mjs  (Layer 1 of continuous execution; the memory-decay hook)
 *
 * In plain English: whenever the agent reads one of your memory files, this
 * bumps that file's "used" counter and stamps today's date. Those two numbers
 * (invoke-count and last-invoked) are what the decay engine uses to let cold
 * memories fade on their own. See engine/memory-policy.md.
 *
 * Wiring: PostToolUse hook on the Read tool (see .claude/settings.json).
 * It is deliberately silent and never blocks. If anything goes wrong it exits 0.
 *
 * Scope: acts only on memory/*.md files. Skips memory/_archive/ and MEMORY.md.
 */
import { readFileSync, writeFileSync } from "node:fs";

function main() {
  let raw = "";
  try { raw = readFileSync(0, "utf8"); } catch { return; }
  let payload;
  try { payload = JSON.parse(raw); } catch { return; }

  const tool = payload.tool_name || "";
  if (tool !== "Read") return;

  const file = (payload.tool_input && payload.tool_input.file_path) || "";
  if (!file.endsWith(".md")) return;
  if (!/(^|\/)memory\//.test(file)) return;         // only memory/ notes
  if (/\/memory\/_archive\//.test(file)) return;    // never touch archived
  if (/\/MEMORY\.md$/.test(file)) return;           // the index is not a memory

  let text;
  try { text = readFileSync(file, "utf8"); } catch { return; }

  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return;                                  // no frontmatter, leave it
  let block = fm[1];

  const today = new Date().toISOString().slice(0, 10);

  // bump invoke-count (default 0 -> 1)
  if (/^invoke-count:/m.test(block)) {
    block = block.replace(/^invoke-count:\s*(\d+).*$/m, (_m, n) =>
      `invoke-count: ${parseInt(n, 10) + 1}`);
  } else {
    block += `\ninvoke-count: 1`;
  }

  // stamp last-invoked
  if (/^last-invoked:/m.test(block)) {
    block = block.replace(/^last-invoked:.*$/m, `last-invoked: ${today}`);
  } else {
    block += `\nlast-invoked: ${today}`;
  }

  const updated = text.replace(/^---\n[\s\S]*?\n---/, `---\n${block}\n---`);
  try { writeFileSync(file, updated); } catch { /* never block a Read */ }
}

try { main(); } catch { /* silent by design */ }
process.exit(0);
