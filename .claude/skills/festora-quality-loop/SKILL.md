---
name: festora-quality-loop
description: Build, modify, debug, and review FESTORA with a strict Doers–Checkers–Judge workflow, a mandatory 9/10 acceptance threshold, and a live local activity-and-website-preview workspace. Use for every FESTORA implementation task.
---

# FESTORA Doers–Checkers–Judge

Use this workflow for every change to FESTORA. Do not skip roles, merge their responsibilities, or mark work complete without a recorded Judge decision.

## Non-negotiable acceptance gate

- The Judge's overall score must be **at least 9.0/10** before a task is accepted.
- A score below 9.0 means **NOT APPROVED**. Record the specific failures, send the task back to Doers, and repeat implementation → checks → judging.
- Never inflate scores, hide failed checks, or claim a test passed without actually running it.
- If a required test cannot be run because of missing credentials, unavailable services, or environment limits, mark it **BLOCKED / NOT VERIFIED**. Do not silently count it as passed.
- Do not stop merely because the iteration count is high. Continue until 9.0+ is achieved or clearly report a genuine blocker and the exact work needed to unblock it. Never fake approval.
- Keep changes scoped. Preserve FESTORA's existing visual identity and working behavior unless the task explicitly calls for changing them.
- Never invent event listings, venue layouts, seat availability, artist details, prices, ratings, or booking confirmations. Label fixtures and prototypes as demo data.

## The three roles

### 1. DOERS — implement

- Understand the requested outcome and inspect the relevant existing files before editing.
- Identify affected pages, scripts, styles, data, APIs, and dependencies.
- Make the smallest coherent implementation; do not rewrite unrelated areas.
- Match the established FESTORA design language. For artist/genre pages, use the approved artist-specific atmosphere while retaining consistent FESTORA navigation and brand identity.
- Follow accessibility, responsive-design, performance, security, and reduced-motion requirements.
- Update the live workspace state before work starts, when the active task/phase changes, and after each meaningful milestone.
- Record files changed, decisions, and any assumptions.

### 2. CHECKERS — independently verify

Check the implementation rather than trusting the Doers' description. Where possible, inspect the changed code independently.

**Functional checks**
- Requested behavior works in the real page flow.
- Navigation, links, forms, filters, state, and error handling work.
- No console errors, broken assets, dead controls, or obvious regressions.
- Existing relevant behavior remains intact.

**Visual and aesthetic checks**
- Compare the running page with the supplied reference and the current FESTORA design.
- Inspect desktop and mobile layouts, spacing, typography, color, image crops, hierarchy, hover/focus states, and transitions.
- Check that the result feels intentional and premium, not merely technically functional.
- Respect reduced-motion settings and keyboard/focus accessibility.

**Engineering checks**
- Review changed code for unsafe HTML injection, exposed secrets, insecure client-side authorization, data-loss risks, and unnecessary dependencies.
- Run available syntax checks, tests, lint/build commands, and browser checks. If the repository has no test command, use the strongest practical checks available and state the limitation.
- Verify the actual running page through the live preview/browser when available. A source-only inspection is not a visual test.

Checkers must return PASS, FAIL, or BLOCKED for each relevant category, with evidence and reproducible steps. Any critical functional, security, or visual defect is a failure.

### 3. JUDGE — score and decide

The Judge reviews the request, implementation summary, Checkers' evidence, and the live preview. Score each category from 0–10:

| Category | Weight |
|---|---:|
| Functional correctness | 30% |
| Visual quality and FESTORA aesthetic | 30% |
| Responsive behavior and accessibility | 15% |
| Code quality, security, and maintainability | 15% |
| Regression checks and evidence | 10% |

Calculate the weighted overall score. A category score cannot be inferred from an unrun test. If a critical check is FAIL or BLOCKED, the task cannot be approved even if the arithmetic average reaches 9.0.

- **9.0–10.0:** APPROVED only if all critical checks pass and evidence is recorded.
- **Below 9.0:** NOT APPROVED. List prioritized fixes and return to Doers.
- **Critical check blocked:** BLOCKED, not approved. Explain what access or environment is needed.

The Judge must be demanding but fair. Do not award 9+ just to finish.

## Mandatory loop

1. Doers implement the scoped task.
2. Checkers independently verify behavior, aesthetics, responsiveness, accessibility, and code quality.
3. Judge records category scores, weighted total, decision, and evidence.
4. If the total is below 9.0 or a critical check fails, return to step 1 with the Judge's fix list.
5. Repeat until the Judge approves at 9.0+ or a real blocker prevents verification.
6. Only after approval, summarize what changed, what was tested, the final score, and anything still unverified.

Do not bypass the loop for "small" CSS, copy, or configuration changes.

## Live workspace: activity panel + website preview

FESTORA includes a local workspace dashboard at `http://127.0.0.1:4173/__workspace`. It has:
- a live activity panel showing the current task, role statuses, iteration, checks, Judge score, decision, and recent notes;
- a live website preview of the current local FESTORA site in an adjacent pane;
- a refresh control for the preview.

### Start it

From the repository root, run:

```bash
node tools/festora-workspace/server.mjs
```

Open `http://127.0.0.1:4173/__workspace` in the available browser. Keep this dashboard open throughout the task. It is a local development tool; it does not deploy changes or expose a public dashboard. If the port is occupied, set `PORT` to another local port and use that URL.

### Update the activity panel

Before work, update state to show the task and Doers as active:

```bash
node tools/festora-workspace/update-state.mjs '{"task":"Describe the current task","phase":"implementation","iteration":1,"statuses":{"doers":"active","checkers":"waiting","judge":"waiting"},"score":null,"decision":"pending","notes":["Work started"]}'
```

At each role transition, update statuses and append a concise note. Example after implementation:

```bash
node tools/festora-workspace/update-state.mjs '{"phase":"verification","statuses":{"doers":"done","checkers":"active","judge":"waiting"},"notes":["Implementation ready for independent checks"]}'
```

When Checkers find issues, record them and increment `iteration` when the next implementation pass begins. After judging, record the weighted score and decision. If not approved, set Doers active again and include the Judge's fix list. On approval, set all roles to done and decision to approved. Do not report an approved score unless the Judge has actually evaluated the evidence.

The updater merges supplied top-level fields and nested `statuses` / `checks` fields into the current state. It appends supplied notes to the activity history.

### If the dashboard cannot run

Do not pretend the live panel or preview is active. Report the exact reason (for example, Node.js unavailable or port blocked), continue the quality loop using a written activity log, and use the environment's actual browser preview if available. A screenshot/mockup is not a substitute for the live website.

## Task report template

At completion, report:

- **Task:** ...
- **Files changed:** ...
- **Doers:** ...
- **Checkers:** functional / visual / responsive-accessibility / engineering / regressions, with evidence
- **Judge:** category scores and weighted overall score
- **Decision:** APPROVED (9.0+) / NOT APPROVED / BLOCKED
- **Iterations:** ...
- **Remaining limitations:** ...

## FESTORA-specific guardrails

- Current event/artist/venue records may be demo data. Never present sample data as verified live listings.
- Reservations stored only in browser storage are not real ticket purchases or confirmed admissions.
- Do not claim seat availability until server-side inventory and temporary holds exist. Use clearly labelled demo layouts for prototypes; do not invent real venue geometry.
- Background music must remain off until the visitor explicitly starts it. Respect browser autoplay restrictions.
- Preserve the agreed product direction: 2D + optional 3D venue exploration, no automatic music, and artist/genre-specific atmospheres within a consistent FESTORA brand.
- Do not add paid services, billing requirements, or secret keys without explicit approval. Never put service-role/private credentials in browser code.
