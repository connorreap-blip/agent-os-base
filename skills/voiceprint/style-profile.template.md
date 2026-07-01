---
title: Style Profile
type: style-profile
scope: overlay
status: TEMPLATE
tags: [voice, stylometry, generated]
derived-from: "atlas/sources/ (your tagged writing samples)"
generated-by: voiceprint:intake
last-refreshed: "{{YYYY-MM-DD}}"
plain: "The measured picture of how you write, per register. Built by voiceprint intake; the engine reads it to score drafts."
---

# Style Profile - {{NAME}}

> This is an **empty template**. It ships in base as the shape of a stylometry profile. It holds no real writing and no real rules. Running `voiceprint:intake` fills the `{{placeholders}}` from your samples and writes the result into your overlay at `voice/style-profile.md`. Every example below is labeled EXAMPLE and is generic, not anyone's actual voice.

> **In plain English:** this is the fill-in-the-blank form the engine uses to remember how you write. It is blank until intake measures your samples.

This file is the **generated** artifact. It is refreshed from samples and marked "auto - do not hand-edit." Your editorial decisions (banned phrases you chose, the no-em-dash rule) live in the editorial zone of `voice/voice-dna.md`, not here.

---

## Registers

Voice is measured per register. Fill in only the registers you maintain samples for. Leave the rest blank.

- [ ] internal / personal
- [ ] external (customer / partner)
- [ ] social (short public posts)

Repeat the blocks below once per active register.

---

## Register: {{internal | external | social}}

### Cadence targets

Measured rhythm the engine scores against.

- **Median sentence length:** {{n}} words   _(EXAMPLE: 14)_
- **Sentence-length range (p10 to p90):** {{n}} to {{n}} words   _(EXAMPLE: 6 to 28)_
- **Short-sentence rate (< 8 words):** {{n}}%   _(EXAMPLE: 25%)_
- **Paragraph shape:** {{sentences per paragraph}}   _(EXAMPLE: 2 to 4)_
- **Question rate:** {{n per 100 sentences}}   _(EXAMPLE: 4)_
- **Rhythm note:** {{how variety is used}}   _(EXAMPLE: short punch line after a long setup)_

### Signature moves

Patterns that read as unmistakably this person. Keep this list from measurement, not preference.

- {{move}}   _(EXAMPLE: opens with a one-line claim, then supports it)_
- {{move}}   _(EXAMPLE: closes on a concrete next step, never a summary)_
- {{move}}

### Lexical fingerprints

- **Favored connectives:** {{list}}   _(EXAMPLE: "so", "and", "but")_
- **Favored openers:** {{list}}   _(EXAMPLE: "Here's the thing", "Quick note")_
- **Favored closers:** {{list}}   _(EXAMPLE: "Let me know", "Happy to dig in")_
- **Hedging level:** {{low | medium | high}}   _(EXAMPLE: low)_
- **Contractions:** {{frequent | rare}}   _(EXAMPLE: frequent)_

### Banned-phrase list (measured avoidances)

Words and constructions this register reliably does NOT use. This is the measured mirror of the editorial banned list in `voice-dna.md`; hand-chosen bans belong there, with a `source:`.

- {{phrase}}   _(EXAMPLE: "delve")_
- {{phrase}}   _(EXAMPLE: "in today's fast-paced world")_
- {{construction}}   _(EXAMPLE: em dashes)_

### Register deltas (how this register differs from internal)

Fill only for external and social. State just what changes relative to the internal baseline.

- **Formality:** {{delta}}   _(EXAMPLE: one notch more formal)_
- **Warmth:** {{delta}}   _(EXAMPLE: same)_
- **Hedging:** {{delta}}   _(EXAMPLE: slightly more)_
- **Sign-off:** {{delta}}   _(EXAMPLE: full name instead of first name)_
- **Sentence length:** {{delta}}   _(EXAMPLE: slightly longer)_

---

## Verify thresholds

The numeric gate the `deliverable` skill enforces, per register. Default is 80.

| Register | Pass threshold (0 to 100) |
|---|---|
| internal | {{80}} |
| external | {{80}} |
| social | {{80}} |

---

## Drift log

Set by drift detection when a quarter's samples diverge from the standing profile. Blank until the first drift check.

- {{YYYY-MM-DD}}: {{what shifted}}   _(EXAMPLE placeholder, delete once real entries exist)_

---

## Provenance

- **Corpus:** {{links to atlas/sources/ samples used}}
- **Sample count by register:** internal {{n}}, external {{n}}, social {{n}}
- **Last intake run:** {{YYYY-MM-DD}}

> Delete every `{{placeholder}}` and every EXAMPLE line as you fill this in. A profile still carrying template scaffolding is an audit finding.
