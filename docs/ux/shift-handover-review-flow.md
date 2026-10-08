# Shift-handover review — Flow specification (fictional demo)

> This flow describes a fictional prototype interaction. It is unvalidated demo planning material, not customer research or operational guidance.

## Entry point

The fictional reviewer opens the handover-list screen. It presents five fictional records, with four open items: statuses Open and In progress count as open; Closed does not. No real customer, site, equipment, or operational data is represented.

## Steps and decision points

1. **Inspect the list**
   - Show the fictional-record context, each record's status, and the available status dropdown/filter, search, and note affordance.
   - The reviewer may leave the status filter at All or select Open items.

2. **Filter and search**
   - Selecting Open items includes Open and In progress and excludes Closed.
   - The reviewer may enter a search term while a status filter is active. Search and status filtering combine.
   - Keep active criteria and the result count understandable. Do not imply the result count is the same as the overall four open items.
   - If no records match the combined criteria, show a no-matches state that lets the reviewer revise or clear criteria.
   - If the list itself has no records, show a distinct empty-list state. The demo fixture is supplied as five records, so this is a relevant generic state rather than the expected fixture result.

3. **Select a record and review its context**
   - The reviewer selects a matching fictional record and opens its handover context.
   - Keep the selected record identifiable while the reviewer reads or writes a note.
   - If the selected record is no longer available in the current list, provide a clear selection-unavailable state rather than associating a note with an ambiguous record. Handling of this case is an assumption to validate.

4. **Write and save a note**
   - The reviewer enters a note for the selected fictional record and attempts to save.
   - On confirmed success, show a clear browser-local save result and the associated note. State that it persists only in local storage for this browser origin/profile; it is not shared or guaranteed on another device/profile/origin.
   - If storage is blocked, full, or unreadable, show an explicit error. Do not show a success message or otherwise claim that the note was saved.
   - Preserve the entered draft when practical after a failed save; whether drafts should remain after navigation is an open question, not a guaranteed behavior.

5. **Optionally reset**
   - The reviewer chooses Reset and sees a confirmation that reset clears notes and filters only.
   - If confirmed and reset succeeds, clear the notes and filters and show an accurate completion result.
   - If canceled, close the confirmation and leave notes and filters unchanged.
   - If reset fails, show an explicit failure and leave notes and filters unchanged. Do not claim success.
   - Reset does not imply clearing records or changing code.

## Exit states

- Success:
  - The reviewer has filtered/searched the fictional list and reviewed a record; or
  - A note save succeeds and is accurately identified as browser-local to the current origin/profile; or
  - A confirmed reset succeeds and only notes and filters are cleared.
- Partial:
  - Filters/search return useful records but the reviewer has not written a note.
  - The reviewer has written a draft but has not saved it.
  - No records match the selected criteria; the reviewer can revise the filters/search without treating this as an application failure.
  - The reviewer cancels reset; all notes and filters remain as they were.
- Blocked:
  - Local storage is blocked, full, or unreadable, preventing a confirmed note save; display the relevant explicit error and never claim the save succeeded.
  - A reset attempt fails; display an explicit error and leave notes and filters unchanged.
  - The selected record is unavailable or ambiguous; avoid associating a note with the wrong record and provide a clear way back to the list.

## Accessibility requirements

- All filters, search, record selection, note entry/save, reset, and confirmation actions must be operable by keyboard without requiring pointer gestures.
- Provide a clearly visible focus indicator in every interactive state; focus order should follow the visual and task order, and dialogs should manage and restore focus appropriately.
- Use semantic labels and native or equivalently accessible controls. Expose selected/expanded/pressed states and result or error updates to assistive technology; do not communicate status by color alone.
- Maintain sufficient text, boundary, and control contrast in all states, including focus, selected filters, errors, and disabled controls.
- Support responsive reflow at narrow and wide viewport sizes without lost content, clipped controls, or unnecessary horizontal scrolling. Keep zoom and text resizing usable.

## Assumptions and open questions

- Supplied facts:
  - The fixture has five fictional records and four open items.
  - Open items means status Open plus In progress and excludes Closed.
  - Status dropdown/filter and search can combine.
  - Notes persist only in browser local storage, specific to the browser origin and profile.
  - Storage errors include blocked, full, and unreadable cases and must be explicit; a failed save is never reported as success.
  - Reset clears notes and filters only after confirmation; cancellation or failure does not alter state.
- Assumptions:
  - The reviewer can select a record from the filtered list and access its note editor.
  - A save-success message can distinguish browser-local storage from shared persistence.
  - A draft may be retained after a save failure, but draft lifetime and navigation behavior are not specified.
  - A selected record that disappears from the current filtered results should not silently change the note association.
- Open questions:
  - What is the intended reviewer role, goal, context, frequency, and current workaround?
  - Which devices, browsers, assistive technologies, and other accessibility needs should be represented?
  - Should the selected record remain selected when filters/search change, and what should happen to an unsaved draft?
  - What are the expected note editing/replacement and maximum-length behaviors?
  - What exact confirmation wording, focus behavior, and recovery affordance best fit the intended reviewer?

