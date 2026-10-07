# Petrosea first meeting: one small UI/UX improvement

## The outcome to show

Show a working, fictional handover screen, then ask the **GitHub Copilot desktop app** to make one visible improvement. The customer sees the request, plan, approval, browser result, and reviewable change together.

This is a product-team collaboration demo, not a demo of coding autocomplete, VS Code, an AI maintenance assistant, or a mining-management platform.

**Figma-enabled version:** use [the Figma walkthrough](FIGMA-DEMO.md) between baseline preview and plan approval. It adds an editable design reference for the same small shortcut, not a second feature or a new system. [Open the prepared reference board](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-2).

**Opening talk track**

> "For this first conversation, let's keep it small. Imagine an incoming shift supervisor who wants to find the handover items that still need attention. These are fictional records, not your operations. We'll show how your team could describe one UX improvement, review the plan, and inspect the working result using the GitHub Copilot app."

Ask verbally whether a handover or equipment-record screen is familiar to the customer. Do not assume this is an actual Petrosea pain point. Public mining context informs the vocabulary; the customer must validate the real workflow.

## Prepare before the meeting

Use an installed, signed-in GitHub Copilot app with access to this project and permissions allowed by your organization's policy. Use synthetic data only. Verify the app capabilities in your installed version; menus and preview features may differ.

Use Node.js 22.12+ and npm. In the app, open this repository's local working folder and review/accept `.github/github-app.yml`. The file is not applied merely because it exists. Its scripts are manual, not automatic installation triggers.

Run **Setup** (`npm ci`), then **Check demo** (`npm run check`), then **Run demo** (`npm run dev -- --port 5173 --strictPort`). The printed URL should open in the integrated browser. Otherwise, ask the agent to open that exact URL in the browser canvas. Do not launch VS Code.

If the port is occupied, run with a different port and use the printed URL. Keep the same host, port, and browser profile when demonstrating note persistence: localStorage is origin- and profile-specific. Narrowing the browser panel is enough to show the responsive layout.

Confirm these baseline facts: five records, four open handover items, zero personal saved notes after reset, the status dropdown offers "Open items", and no "Open items only" shortcut exists yet. Clear demo notes with **Reset demo** and accept its confirmation. Keep a second local browser preview available if the app preview surface fails.

Initial installation needs network access. The Copilot agent needs its service connection and appropriate entitlement. Once installed, the local UI can run without a remote data service; this does **not** mean the Copilot agent is offline.

### Repeatable baseline

The delivered files may initially be uncommitted. Before creating a new isolated session from a Git ref, deliberately save the baseline through the app's normal commit workflow and inspect the resulting commit. **A new worktree does not inherit uncommitted files.** No commit or push is automatically part of this demo setup.

Use that saved baseline ref when starting a separate rehearsal session. Preserve the delivered baseline and leave the shortcut exercise in the rehearsal branch. For another rehearsal, start another isolated session from the same baseline ref. Do not use destructive reset commands or assume archiving a session restores another session's code.

The in-screen reset clears **data and filters only**, not code changes. If you cannot prepare an isolated rehearsal, run the working baseline and use the prepared change prompt as a discussion exercise.

## Presentation sequence

### 1. Understand the small workflow

Open this project in a local app session. Use **Plan** mode for the explanation so no implementation happens accidentally.

Paste:

```text
Explain this shift-handover prototype to a product owner, not a developer.
Read README.md, docs/DEMO-GUIDE.md, and the relevant source files.
Explain how an incoming supervisor finds equipment issues and reads or saves
context. Identify the fictional-data and browser-local-only boundaries.
Do not edit files or propose a larger system.
```

**Expected:** a grounded explanation referencing the actual screen and files. Explain that the app works with a repository in a session; it is not just a design image generator. Keep any code discussion brief.

### 2. Show the baseline

Run the app's **Run demo** script and show the integrated browser.

| Presenter action | Expected visible result |
| --- | --- |
| Point at the disclaimer and site label | Fictional prototype; no implied connection to Petrosea systems |
| Select **Open items** in Issue status | Four records; the closed water-truck record disappears |
| Search `HT` while Open items is selected | HT-208 and HT-211; both filters work together |
| Click **View handover** on HT-208 | The note panel selects HT-208 and focuses the note input |
| Type `Documentation update still pending. Next shift needs the record.` and save | A browser-only success message, saved note, and one personal-note count |
| Reload the preview and choose HT-208 in Equipment | The saved note is still present on this browser |
| Clear search and select All | All five fictional records return |

State explicitly that a documentation issue does not indicate whether equipment is safe or available. The latest personal note replaces a previous personal note for the same equipment; this is not an auditable shared handover log.

**Transition talk track**

> "The screen works, but the supervisor has to open a dropdown to focus on unresolved items. Let's describe one small improvement in normal language and inspect what changes."

### 3. Ask for a plan, not an instant rewrite

In **Plan** mode, paste:

```text
Plan one small UX improvement to this fictional shift-handover screen:
add an "Open items only" shortcut above the equipment list, with an open-item
count and a clear active state. Do not implement yet.

Open items means both Open and In progress, excluding Closed. Reuse the
existing status state and filterEquipment helper; do not introduce another
independent filter. Activating the shortcut sets status to "Open items".
Activating it again when active returns status to "All". Changing the
dropdown must update the shortcut's active state. Preserve the search.
The badge count is the site-wide four open items, not the search-result count;
keep the separate filtered result count.

Keep notes, error handling, reset confirmation, keyboard operation, and
responsive layout intact. No real customer data, operational controls, backend,
authentication, telemetry, or integrations. Identify files and acceptance tests.
```

**Expected:** a small plan affecting `src/App.tsx`, `src/styles.css`, and `src/App.test.tsx`. Show the plan's boundaries and the approval moment. Reject scope creep such as a new dashboard, database, or API.

### 4. Approve and implement

Use the app's plan approval control to proceed interactively. If a follow-up prompt is needed:

```text
Implement the approved "Open items only" shortcut plan only. Use a real button
with aria-pressed and a visible active state, reuse the existing status state,
and keep the site-wide count and filtered result count distinct.
Add focused tests for toggle on/off, search preservation, dropdown
synchronization, and reset. Run npm run check and open the running local
preview in the integrated browser. Explain any failure rather than claiming
success. Do not commit, push, create a PR, or expand the scope.
```

**Expected:** an actual code change with tests, not a mock screenshot. The agent may ask for tool permissions: review those requests. Copilot can make mistakes; the plan and code still need human review.

### 5. Inspect the result and diff

Show the browser and click the shortcut. Confirm:

| Check | Expected outcome |
| --- | --- |
| Shortcut inactive at All | Button has `aria-pressed="false"` and no active styling |
| Click once | Open + In progress only; four records when search is empty |
| Search `HT` | Two matching records; shortcut still says four site-wide open items |
| Click again | Status becomes All; search remains `HT` |
| Select Closed in dropdown | Shortcut inactive; only Closed records can match |
| Select Open items in dropdown | Shortcut active without separate state drifting |
| Reset and confirm | All records, empty search, shortcut inactive, personal notes cleared |
| Keyboard activation and narrow preview | Visible focus, working toggle, no horizontal overflow |

Review the changed files in the app's diff surface. Highlight one meaningful state change and one test, not every line. Confirm the agent did not alter fictional data, broaden permissions, or change storage boundaries.

Paste for a final focused check:

```text
Check the implemented shortcut against the approved acceptance criteria.
Run npm run check. Inspect the actual local preview and compare the changed
files. Check toggle behavior, dropdown synchronization, preserved search,
site-wide versus filtered counts, keyboard access, narrow layout, and
unchanged browser-local notes and reset. Report concrete failures or
verification limitations. Do not add unrelated features.
```

**Closing talk track**

> "We started with a familiar small screen and turned one UX request into a working, inspectable change. The app brings intent, implementation, preview, and review into one workflow. It doesn't remove the need for your team's design judgment or operational validation."

Ask verbally: "Which small screen in your current workflow would be worth improving first?" Do not propose a full operational rollout or promise measured productivity gains.

## What the app helps the team do

| Demonstrated capability | Value in this conversation |
| --- | --- |
| Repository-aware explanation | Product and engineering discuss what the current screen actually does |
| Plan mode and human approval | Agree a small UX scope before implementation |
| Agent-assisted code changes | Translate plain-language feedback into a working UI, not just a concept |
| Local browser preview / canvas | Customer and presenter see the behavior and can give concrete feedback |
| Diff inspection and focused checks | The team can review how the change works and catch regressions |
| Isolated worktree sessions | Rehearse or explore without overwriting the saved baseline |
| Repository instructions and manual scripts | Carry the demo's boundaries and repeatable commands into later sessions |
| Figma MCP design reference | Discuss the shortcut's active/inactive appearance before implementing it in the existing screen |

Figma integration is now a prepared demo option; follow [its connection and access checks](FIGMA-DEMO.md) before presenting. Parallel agents, automations, custom canvases, computer use, and PR lifecycle automation are **not needed for this first meeting**. A PR is an optional later handoff requiring repository permissions and explicit intent, not a necessary live step.

## Reusable repositories: verified options, not imported code

Both repositories were inspected through GitHub API metadata and package/README files. They were public, unarchived, and identified as MIT. This is metadata/source inspection, **not** a dependency security audit or proof that either application runs in your environment.

| Repository | Why it can help | Why not import it for this first meeting |
| --- | --- | --- |
| [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin) | React/Vite/TypeScript dashboard UI; reusable list, form, sidebar, and responsive patterns | Its README explicitly says it is **not a starter template**. Includes TanStack routing, partial Clerk authentication, and many pages |
| [shadcndashboard/shadcndashboard](https://github.com/shadcndashboard/shadcndashboard) | React/Vite/TypeScript admin template with shadcn UI and many application examples | Includes editors, charts, routing, and other dependencies unrelated to a one-screen handover |

Recommendation: **use this lean prototype now**. If the customer later needs a wider admin experience, assess the relevant patterns in `satnaing/shadcn-admin` first, or the full alternative template. Do not start the meeting by installing a large suite.

Inspected upstream revision anchors:

- `satnaing/shadcn-admin`: [`e16c87f213a5ba5e45964e9b67c792105ec74d26`](https://github.com/satnaing/shadcn-admin/tree/e16c87f213a5ba5e45964e9b67c792105ec74d26)
- `shadcndashboard/shadcndashboard`: [`386235c3199168fa743db593d7acf014a40f1ca1`](https://github.com/shadcndashboard/shadcndashboard/tree/386235c3199168fa743db593d7acf014a40f1ca1)

Recheck the license at the exact adopted revision, preserve copyright and permission notices for copied code, and review dependencies and third-party assets separately. MIT does not grant trademark rights. This prototype imports neither repository's source nor Petrosea branding.

## Failure and fallback

| Problem | Presenter response |
| --- | --- |
| Agent/network unavailable | Show the already-installed baseline, then read the prepared improvement prompt and explain acceptance criteria. Do not claim a change ran |
| Integrated preview unavailable | Open the same loopback URL in a local browser; explain this is a preview fallback, not a VS Code workflow |
| Installation fails | Resolve it before the meeting; use the previously prepared local build with `npm run preview` if available |
| Windows `npm ci` reports EPERM on esbuild | Stop this project's running Vite server from its terminal, then retry Setup; do not kill unrelated processes or run as administrator by default |
| Browser storage blocked/full | Show the explicit error; notes are not shared and failed saves are not reported as successful. Enable storage or use an allowed browser profile |
| Unexpected agent edits | Stop the change, inspect the diff, and return to the preserved baseline session; do not hide errors or broadly reset files |
| Browser-local notes do not appear elsewhere | Explain that another profile, host, port, or device has a separate storage origin |

If no working local UI is available, use the guide as a walkthrough and say plainly that it is not a live product demonstration.

## Rehearsal checklist

Before presenting, run `npm ci` from the lockfile and `npm run check`. Exercise search, both open statuses, empty results, notes, reload, confirmed reset, and cancellation. Verify a narrow viewport and keyboard navigation. Never type real customer details.

Rehearse the shortcut in a separate session from the saved baseline. Measure success by the acceptance table, not by an attractive screenshot or the agent's assertion. Generated implementations can vary; keep the accepted baseline untouched.

The delivered tests cover baseline filters, validation limits, note association/replacement, keyboard saving, reload, draft protection, unreadable/full storage, and scoped reset. The shortcut is intentionally **not** in the baseline. The exact live agent exercise still needs rehearsal on the presenter's installed app and saved baseline; do not label it preverified simply because the baseline tests pass.

## Sources and next-step boundaries

- [GitHub Copilot app overview](https://docs.github.com/en/copilot/how-tos/github-copilot-app)
- [Agent sessions and modes](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions)
- [Repository configuration and trust](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/repository-configuration)
- [Canvas collaboration](https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions)
- [Petrosea company site](https://petrosea.com/) for company context; this prototype makes no claims about its internal UX or data

Real adoption would require customer workflow discovery, privacy/security review, authorization, shared persistence, audit history, operational validation, actual design guidelines, and an agreed integration scope. Those are intentionally outside this first-meeting demo.
