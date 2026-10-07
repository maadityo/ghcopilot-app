# Shiftboard: a small Petrosea UI/UX conversation

A fictional shift-handover prototype and a complete presenter guide for a **first meeting with Petrosea**, a mining contractor. Demonstrate the **GitHub Copilot desktop app**, not the VS Code extension: understand a screen, plan a small UX improvement, approve it, preview it, and review the code change.

**Start with [the demo guide](docs/DEMO-GUIDE.md).** It contains the customer story, exact prompts, expected outcomes, reusable repository recommendations, rehearsal instructions, and a fallback.

**Figma integration:** [open the editable fictional UX reference](https://www.figma.com/design/Vq8CVHkbb2P86dtsDGAeJ4?node-id=1-2), then follow [the Figma demo steps](docs/FIGMA-DEMO.md). The reference contains active/inactive shortcut designs and acceptance notes. Figma is connected to the agent through MCP, not to the running React application.

**One format, multiple company styles:** use **Visual theme** to switch between the original demo, Petrosea-inspired draft, and Petrindo-inspired draft without changing the layout or losing filters and notes. See [the multi-brand walkthrough and public color sources](docs/MULTI-BRAND-DEMO.md). These are website-inspired drafts, not approved corporate branding or separate company workspaces.

## Run locally

Use Node.js **22.12 or newer** and npm. These commands also work in the Copilot app's terminal:

```powershell
npm ci
npm run dev -- --port 5173 --strictPort
```

Open the printed local URL in the app's integrated browser. The server binds to your machine's loopback interface, not the network. If port 5173 is occupied, choose another free port and use that same URL throughout the demo.

```powershell
npm run check
```

Runs the focused behavior tests, TypeScript checking, and production build. `npm run preview -- --port 5173 --strictPort` serves the build after `npm run build`. Stop a manually started server with Ctrl+C in its terminal. On Windows, stop running Vite servers before rerunning `npm ci`; their esbuild process can lock dependency files.

`.github/github-app.yml` defines manual Setup, Run demo, and Check demo scripts and automatic opening of the detected preview URL. **Review and accept this configuration in the app** before using it. Installation requires registry access; the Copilot agent also needs its service connection. The UI itself has no remote API, font, or image dependency.

## What works

Five fictional equipment records, search combined with status filtering, open-item summary, equipment-linked notes, visible validation/storage errors, and a confirmed demo reset. "Open items" means **Open plus In progress**, not equipment availability or permission to operate.

Notes are **browser-local**, with one latest note per equipment. Saving replaces that equipment's previous personal note; nothing is sent to a supervisor or another device. Reset clears only the `shiftboard-demo.notes.v1` storage key and resets the screen. Switching equipment with an unsaved draft asks for confirmation; leaving the page with a draft uses the browser's unsaved-change warning.

Changing the visual theme preserves the current data, filters, equipment selection, and draft. It does not switch tenants or isolate company data. Reload and a successful Reset demo return the visual theme to Original demo; no additional theme storage is used.

## Boundaries

**Fictional demo - not for operational use.** This is not a Petrosea product or a replica of its systems. No Petrosea branding assets, real site or employee data, authentication, maintenance guidance, equipment controls, backend, telemetry, Minerva integration, or cloud deployment.

The screen is an original, lean React/TypeScript/Vite implementation. The guide recommends two verified MIT dashboard repositories for future reuse; neither was imported. The baseline intentionally leaves an **"Open items only" shortcut** for the live Copilot app exercise, while retaining a working status dropdown.

## Project map

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Screen, selection, note feedback, and scoped reset |
| `src/data.ts` | Fictional equipment and combined filtering |
| `src/notes.ts` | Versioned browser storage and note validation |
| `src/styles.css` | Responsive industrial-style UI |
| `src/themes.ts` | Shared semantic palette tokens for the original and two company-inspired drafts |
| `src/App.test.tsx` | Behavior and failure-path tests |
| `docs/DEMO-GUIDE.md` | Presenter script, prompts, and repo options |
| `docs/FIGMA-DEMO.md` | Figma connection checks, frame links, and design-to-code prompts |
| `docs/MULTI-BRAND-DEMO.md` | One-template brand adaptation case, palette provenance, and Figma variants |
| `.github/github-app.yml` | Copilot app project instructions and manual scripts |