# Shape Workflow

## Goal

Translate product requirements and art direction into information architecture,
page hierarchy, components, states, and responsive structure before polishing.
Impeccable should generally lead this stage when installed.

## Inputs

- current brief and success criteria
- selected profile and art direction, if applicable
- existing routes, components, tokens, data contracts, and behavior
- product requirements and representative content

## Process

1. List required content, user decisions, actions, and system feedback.
2. Group content by user task and dependency, not by desired visual component.
3. Establish page hierarchy and the primary path through the surface.
4. Define navigation and orientation, including return and recovery paths.
5. Define major layout regions and their relationships before styling details.
6. Map each region to an existing component or justify a new component.
7. Specify states: default, hover, focus, active, selected, loading, empty,
   partial, error, disabled, success, and permission-limited where relevant.
8. Define responsive behavior for hierarchy, order, disclosure, dense data,
   navigation, media, and actions.
9. Confirm semantic structure and keyboard interaction model.
10. Stress-test with realistic content, long labels, errors, and missing data.
11. Remove regions and containers that do not serve hierarchy or behavior.

## Engine Roles

- **Impeccable:** primary structure, component hierarchy, responsive model,
  interaction states, and critique.
- **Taste:** optional compositional challenge when the profile benefits from it;
  it cannot override product structure or usability.

## Output

Produce a concise implementation map:

```text
Primary user path:
Information hierarchy:
Major regions:
Existing components reused:
New components justified:
State matrix:
Responsive transformations:
Semantic and keyboard model:
Risks to verify during build:
```

Record reusable structural decisions in `src/DESIGN.md` or
`src/.design/DECISIONS.md`.

## Exit Gate

Every required piece of content and behavior has a place, component ownership is
clear, important states exist, and narrow-screen behavior is intentional.
