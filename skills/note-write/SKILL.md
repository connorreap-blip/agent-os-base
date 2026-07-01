---
name: note-write
description: "Executes a write plan produced by synthesize. Called by the orchestrator (capture or refresh), never by a user directly. Creates notes, appends activity, updates frontmatter, enqueues tasks, and enforces YAML validity and link reciprocity. This is the only skill in the pipeline that writes files."
scope: base
plain: "The writer. It takes the plan and actually creates and updates the notes, keeping the YAML valid and every link two-way."
---

# note-write

> **In plain English:** this is the only step that touches files. It takes the exact plan from synthesize and carries it out, making sure every note follows its schema and every link points both ways.

Note-write is a subagent. It is deliberately dumb about meaning and strict about form: synthesize already decided what to write; note-write's job is to write it correctly and safely.

## Trigger

- Called by `capture` or `refresh` with a completed write plan. Not user-invoked.

## Input: WRITE PLAN (from synthesize)

```yaml
write_plan:
  - {op: create,             path: ..., yaml: {...}, body: "..."}
  - {op: append-activity,    path: ..., entry: "..."}
  - {op: update-frontmatter, path: ..., add-to: {...}}
  - {op: enqueue-task,       path: tasks/queue.md, text: "..."}
  - {op: clarification,      text: "..."}
  - {op: rag-change,         target: ..., from: ..., to: ..., reason: "..."}
```

## How each op executes

- **create** - validate the frontmatter against the note's blueprint in `engine/blueprints/`; reject on a missing required field or an unknown field; write the file; stamp `date` and the `last-*` field to today (ET).
- **append-activity** - prepend the dated line to the overview's activity log (most recent first); stamp `last-touched`.
- **update-frontmatter** - merge values into the target's list fields; deduplicate; never overwrite a scalar the human set; stamp the relevant `last-*` field.
- **enqueue-task** - append the item to `tasks/queue.md`.
- **clarification** - do not create anything; surface the question to the human as a pending confirmation.
- **rag-change** - update the status/RAG field with the given reason recorded in the activity log.

## Invariants it enforces

1. **YAML validity.** Every written note parses and conforms to its blueprint. A malformed or off-schema note is rejected, not written half-formed.
2. **Link reciprocity.** Before finalizing, confirm every `[[X]]` either resolves to an existing note or is created in this same plan. If a link dangles, either add the reciprocal note (when the plan created its counterpart) or drop the link and flag it. Never leave a dangling link.
3. **Confirmation gates.** A `clarification` op halts creation of the thing it questions. Nothing behind a gate is written until the human answers.
4. **No deletion.** Updates and archival only. Never delete a note.

## Boundary

> Execute the plan exactly as given. Do not re-synthesize, do not add ops, do not create an organization behind a `clarification` gate. Write valid, reciprocal notes or reject the op and report why.
