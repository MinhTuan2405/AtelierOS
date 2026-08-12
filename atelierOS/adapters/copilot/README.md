# GitHub Copilot Adapter

GitHub Copilot integration is disabled by default. When enabled in
`designkernel.config.json`, `pnpm design:sync` generates
`src/.github/instructions/designkernel.instructions.md`.

The instruction file applies to frontend files and routes Copilot to repository
`AGENTS.md`, the Design Director, project memory, and the review gate. It does
not duplicate the full ruleset.

Confirm that the installed Copilot client supports repository instruction files.
The kernel remains authoritative if a client uses a different discovery path.
