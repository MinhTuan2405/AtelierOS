# External Engines

This directory contains replaceable, Git-managed upstream design engines:

- `taste/`: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
- `impeccable/`: [pbakaus/impeccable](https://github.com/pbakaus/impeccable)

The canonical AtelierOS entry points are:

- Taste: `taste/skills/taste-skill/SKILL.md` (`design-taste-frontend`)
- Impeccable: `impeccable/plugin/skills/impeccable/SKILL.md` (`impeccable`)

These paths are declared in `designkernel.config.json` and validated by
`pnpm design:doctor`. The repositories retain their own Git history and
`origin/main` tracking so `pnpm design:update` can fast-forward them safely.

Load only the engine selected by the Design Director. Taste's other skills are
optional variants, not a bundle to apply simultaneously. Impeccable's provider
directories are upstream distribution artifacts; its plugin skill is the
portable entry point used by AtelierOS.

Never add DesignKernel-specific rules to an engine checkout. Custom behavior
belongs in `atelierOS/kernel/`, `atelierOS/rules/`, `atelierOS/profiles/`,
`atelierOS/workflows/`, or `atelierOS/adapters/` so an
engine can be fast-forwarded, replaced, or removed safely.

`pnpm design:update` updates only clean Git-managed directories directly below
`atelierOS/engines/`, using a fast-forward merge. It never writes outside that directory.
