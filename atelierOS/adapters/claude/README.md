# Claude Code Adapter

Run `pnpm design:sync` to generate a project command at
`src/.claude/commands/designkernel.md`. Invoke it before substantial
frontend work when Claude Code has not already followed the repository
`AGENTS.md` entrypoint.

The command routes Claude Code to the Design Director, project product/design
memory, selected profile and workflow, and review gate. Shared skill copies are
also generated under `src/.agents/skills/`.

Keep agent-specific instructions thin. The kernel is the source of truth; do
not fork DesignKernel rules into Claude command files.
