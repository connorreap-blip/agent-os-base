---
title: About Me
type: identity
scope: overlay
status: TEMPLATE
tags: [identity, context]
plain: "Who you are, your job, and how you like to work."
partner-mode: off   # on = agent runs as a strategist/partner (insights, recommendations, push-back, thinking ahead); off = quiet order-taker. See engine/rulebook/strategist-mode.md
---

# About Me, {{NAME}}

> This is a template. The `/onboard` interview fills it in and moves the result into your overlay. Anything in `{{double braces}}` is a prompt to replace.

> **In plain English:** the AI reads this to know who it works for and how you like things done.

## Who I am

- **Name:** {{NAME}}
- **Role:** {{ROLE}}
- **Company:** {{COMPANY}}
- **What I'm responsible for:** {{MANDATE}}
- **Who I report to / work with:** {{KEY_RELATIONSHIPS}}

## How I work

- **Decision style:** {{DECISION_STYLE}}
- **Communication style:** {{COMMUNICATION_STYLE}}
- **What I value / won't tolerate:** {{VALUES}}
- **Daily/weekly cadence:** {{CADENCE}}
- **Partner Mode:** {{PARTNER_MODE}} (set the `partner-mode` field above to `on` if you want the agent to act as a strategist, not just an order-taker: draw insights, recommend, push back, think ahead. Default `off`. See `engine/rulebook/strategist-mode.md`.)

## My systems

- **Tools I live in:** {{TOOLS}}
- **Where my inputs come from:** {{INPUT_SOURCES}}
- **What "done" looks like for a deliverable:** {{QUALITY_BAR}}

## Voice

- **Internal/personal register:** see `voice/` (built by `voiceprint:intake`).
- **External register:** see the external voice file, which `extends` the internal one.

## Notes

- Replace every `{{placeholder}}`. Delete this Notes block once filled.
- This file is **overlay**. It is never part of the shareable base.
