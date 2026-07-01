# Memory Index

> The loaded index of what the agent remembers. One line per **active** memory. Cold memories drop off this list automatically (they still exist in `memory/`, and archived ones move to `memory/_archive/`). The decay rules live in `engine/memory-policy.md`.

> **In plain English:** the short list of what the AI currently keeps in mind. It shrinks on its own as things go stale, so this never turns into a wall of text.

_No memories yet. They appear here as the agent learns, and drop off as they go cold. Pinned memories stay regardless._

<!-- format: - [Title](memory/<file>.md), one-line hook, pinned? -->
