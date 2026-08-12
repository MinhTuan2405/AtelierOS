# Codex Adapter

Codex should discover the root `AGENTS.md` as its entrypoint and project-local
skills under `src/.agents/skills/` after `pnpm design:sync`.

## Exposure

1. Keep `AGENTS.md` concise and route substantial frontend work to the Design
   Director.
2. Sync `atelierOS/kernel/design-director/SKILL.md` and
   `atelierOS/kernel/design-reviewer/SKILL.md` into `src/.agents/skills/`.
3. Keep a generated pointer at `src/.codex/designkernel.md` for environments
   that expose `.codex` project context.
4. In a task prompt, explicitly ask Codex to use the Design Director when the
   task is substantial and automatic skill discovery is unavailable.

The kernel, rules, profiles, workflows, and project design memory remain the
source of truth. Do not maintain Codex-specific copies of those documents.
