# Shift-handover review — User journey (fictional demo)

> The persona, scenario, reactions, and opportunities below are fictional demo material. They are not customer research or validated findings.

## Persona and goal

Fictional persona: a reviewer looking through a demo shift-handover list. Their goal is to find unfinished fictional items, narrow the list, and write a browser-local note. The persona and goal are planning assumptions, not a real customer profile.

## Stages

### 1. Arrive at the fictional handover list
- Does: Opens the demo list containing five fictional records.
- Thinks: “Which items are still open?”
- Feels: Not established; any reaction here is hypothetical.
- Pain point: No supplied evidence of a pain point. A possible discovery question is whether the list makes unfinished status easy to identify.
- UX opportunity: Make the fictional-record context and status information easy to scan; keep the demo boundary apparent.

### 2. Narrow to unfinished items
- Does: Chooses the status dropdown/filter for Open items, which includes Open and In progress and excludes Closed. May also enter a search term; the two filters can combine.
- Thinks: “Does this show both open statuses, and can I narrow it further?”
- Feels: Not established; any reaction here is hypothetical.
- Pain point: No supplied evidence of a pain point. Filtering that returns no matches could be confusing if the empty state is unclear.
- UX opportunity: Show the active filters, make the meaning of Open items clear, and distinguish no matches from an empty underlying list.

### 3. Review a matching record
- Does: Scans matching fictional records and selects one to read its handover context.
- Thinks: “Am I looking at the record I intended?”
- Feels: Not established; any reaction here is hypothetical.
- Pain point: No supplied evidence of a pain point. Ambiguous record selection is a question for prototype review.
- UX opportunity: Keep record identity and selected context legible, including when the list is filtered.

### 4. Write a browser-local note
- Does: Enters a note associated with a selected fictional record and attempts to save it.
- Thinks: “Was this saved, and where will it be available?”
- Feels: Not established; any reaction here is hypothetical.
- Pain point: Storage may be blocked, full, or unreadable; these errors must be explicit. A failed save must not be represented as success.
- UX opportunity: Associate the editor with the selected record, give an accurate save result, and explain that notes remain only in this browser origin/profile.

### 5. Reset demo state or leave
- Does: If choosing Reset, reviews a confirmation before clearing notes and filters. Cancels or proceeds.
- Thinks: “What will this clear?”
- Feels: Not established; any reaction here is hypothetical.
- Pain point: An unclear reset scope could lead to an unintended expectation. No real-user evidence is supplied.
- UX opportunity: State that reset affects notes and filters only; require confirmation. Cancellation or failure must leave state unchanged and must not claim a reset succeeded.

## Success signals

Proposed, unvalidated experience signals:

- The reviewer can identify the four open items among five fictional records and understands that Closed is excluded.
- The reviewer can combine status and search and can tell when the combination has no matching records.
- The reviewer can identify which record is selected and can understand the note's browser-origin/profile-specific persistence boundary.
- A storage error is visible and accurately describes a failed or unavailable operation; it does not announce save success.
- Reset scope is clear, and canceling or failing reset leaves notes and filters unchanged.
- Keyboard users can reach and operate the same controls, focus remains visible, content reflows responsively, and text/control contrast is sufficient.

## Supplied facts, assumptions, and open questions

- Supplied facts:
  - The fictional demo contains five records, four of them open.
  - Open items includes Open and In progress and excludes Closed; status filtering and search can combine.
  - Notes persist only in browser local storage for the current origin/profile. Blocked, full, or unreadable storage must be reported explicitly; failed saves are never described as successful.
  - Reset clears notes and filters only after confirmation. Cancellation or failure leaves state unchanged.
- Assumptions:
  - The fictional reviewer selects a record to read its context and access a note editor.
  - The stages and hypothetical thoughts describe a useful demo journey; none are observed user behavior.
- Open questions:
  - What is the intended reviewer’s role, goal, context, current workaround, pain points, and review frequency?
  - What would the impact of a confusing or failed interaction be in the intended scenario?
  - Which devices, browsers, and accessibility needs should the prototype represent?
  - What selection and unsaved-draft behavior is expected when filters change?
