# Cursor Adapter

Run `pnpm design:sync` to generate
`src/.cursor/rules/designkernel.mdc`. The always-applied rule is intentionally
small: it routes frontend work back to the root `AGENTS.md`, Design Director,
and project design memory.

The synced Design Director and Design Reviewer skills also live under
`src/.agents/skills/` for tools that support the shared skill convention.

Do not paste every rule into `.cursor`. Kernel files are authoritative, and a
thin pointer prevents Cursor configuration from becoming a divergent design
system.
