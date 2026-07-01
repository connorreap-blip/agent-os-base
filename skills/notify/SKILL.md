---
name: notify
description: "Post a synthesized update - the digest, an urgent flag, or the Home Stretch list - to the user's OWN Slack channel or DM; never to anyone else. Invoked by refresh, home-stretch, or the urgency rule to deliver a short internal-register update to the single configured self-destination. Uses the Slack MCP send tools in an interactive or loop session; falls back to a Slack incoming webhook for headless runs. If no destination is configured, it drafts and asks rather than guessing."
scope: base
plain: "Posts your own updates to your own Slack, and only yours."
---

# notify

> **In plain English:** this is the one skill allowed to actually post. It sends your own updates - the digest, an urgent flag, or the Home Stretch list - to your own Slack channel or DM, and nowhere else. It never messages a customer, a partner, or anyone external.

Notify is the first and only skill permitted to transmit through a connector, and it is fenced hard: it posts the user's own updates to the user's own Slack, per the self-updates exception in `house-rules.md`. Every other outbound path stays draft-only. It writes no files into the graph; its whole job is to take one already-synthesized message and put it in the one configured self-destination.

## What it posts

A concise, on-voice, internal-register update. One of three shapes, always short and skimmable:

- **The digest** - the daily or hourly synthesis handed over by `refresh`: what changed, what is next, what needs you.
- **An urgent flag** - a single out-of-cadence alert when a refresh detects an urgent signal (see `engine/rulebook/urgency.md`).
- **The Home Stretch** - the prioritized before-EOD list handed over by `home-stretch`.

Keep it tight. This is an internal note to self, not a report. Lead with what needs the user, trim everything skimmable. Voice is the internal register (see `engine/rulebook/voice-routing.md`), not the external one, because the only audience is the user.

## Where it posts

- One destination: a `notify-channel` read from the overlay config (set in `connectors.md` or an overlay notify config). This is the user's own internal update channel or self-DM.
- If `notify-channel` is unset, do not guess a destination. Draft the message, show it, and ask the user where it should go. A wrong destination is a broken boundary, so an unknown destination is a full stop.
- Exactly one configured, confirmed destination. Notify does not fan out to multiple channels or pick a target from context.

## How it posts

- **Setup A (interactive or loop session).** Use the Slack MCP send tools: `slack_send_message` to post now, or `slack_schedule_message` for a timed post (for example, holding a digest until a set hour). This is the normal path for the ambient brain running inside a `/loop` session.
- **Setup B (headless or unattended fallback).** OAuth connectors do not work headless, so a cloud or unattended run cannot use the MCP send tools. In that case post through a Slack incoming webhook: POST the message to the configured webhook URL. The webhook targets the same single self-destination and carries the same boundaries.
- Confirm the destination resolves before posting. If it does not, fall back to draft-and-ask.

## Hard boundaries

> Only the user's OWN internal update channels or self-DM. One destination, configured and confirmed by the user.

- NEVER post to a customer, partner, DP, or any external channel or DM.
- NEVER @-message a customer or any external person.
- NEVER auto-select a destination from message context. If the destination is unset or ambiguous, stop and ask.
- If asked to notify anyone external, refuse per `house-rules.md`. Save a draft for human review instead; never send it.
