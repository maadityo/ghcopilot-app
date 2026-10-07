# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary user is an incoming shift supervisor in a fictional mining scenario. They use the screen to find unresolved handover items and carry context into the next shift. Customer and product stakeholders are the audience for the first-meeting demo, not confirmed users of a deployed product.

## Product Purpose

This prototype makes one shift-handover workflow tangible for a customer conversation. Success means stakeholders can explore a small, working example and discuss a possible UX improvement; it does not claim operational or productivity outcomes.

## Positioning

This is a deliberately small, inspectable UI/UX demo for discussing how a team could improve a handover screen using the GitHub Copilot desktop app. It is not an operational mining product, a customer system, or a substitute for validating a real workflow with its users.

## Operating Context

The demo presents a fictional incoming-shift workflow: search equipment records, filter issue status, review the outgoing context, and optionally save a personal note for that equipment. It is intended for a first customer meeting and must be presented as fictional and not for operational use.

## Capabilities and Constraints

- The web prototype has five fictional equipment records, combined search and status filtering, and an open-item count. “Open items” means Open plus In progress; it does not indicate equipment availability or permission to operate.
- Notes are browser-local only, with one latest note per equipment. Storage errors remain visible, and reset is confirmed and scoped to this demo's notes and screen state.
- Visual themes are website-inspired drafts, not approved branding, company workspaces, or tenant boundaries. Theme changes preserve note and filter state.
- Keep the prototype small, responsive, and keyboard accessible.
- Do not add real customer or operational data, equipment controls, maintenance advice, external APIs, authentication, telemetry, or production integrations without an explicit scope change.

## Brand Commitments

No company branding is approved for this demo. Petrosea-inspired and Petrindo-inspired colors are visual drafts based on public website references, not official brand guidance or customer endorsement.

## Evidence on Hand

The repository contains the running prototype and behavior tests (`src/App.tsx`, `src/data.ts`, `src/notes.ts`, `src/themes.ts`, and `src/App.test.tsx`) plus presenter documentation under `docs/`. All displayed records and example notes are fictional. No real customer research, operational evidence, approved brand assets, or measured outcomes are provided; future work must not fabricate them.

## Product Principles

- Keep examples synthetic and visibly separate from operational use.
- Improve one narrow handover workflow at a time.
- Keep personal notes local and make storage failures explicit.
- Preserve the shared interaction and state model when previewing visual themes.
- Keep interactions responsive and usable by keyboard.

## Accessibility & Inclusion

Keyboard operation and responsive layouts are product requirements for this prototype. No conformance level has been specified.
