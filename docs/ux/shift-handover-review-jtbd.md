# Shift-handover review — JTBD (fictional demo)

> All people, records, situations, and examples in this artifact are fictional demo material. This is not customer research, and no statements below are validated findings.

## Job statement

When I am reviewing a fictional shift handover and need to find items that are not closed, I want to see and filter the unfinished items and write a browser-local note, so I can review the relevant context in this demo.

## User and context

- Role: Fictional reviewer of a shift-handover list; the role is not a real or validated customer persona.
- Context: A fictional list contains five records, four of which are open items. “Open items” means status Open or In progress and excludes Closed. The reviewer can combine the status dropdown/filter with search.
- Frequency/device/accessibility: Frequency and actual device are unknown. The prototype is viewed in a browser and should support keyboard operation, visible focus, semantic controls, sufficient contrast, and responsive layouts.
- Notes boundary: Notes persist only in browser local storage and are specific to the browser origin and profile. No shared or cross-device persistence is implied.

## Current approach and pain points

- Supplied facts:
  - There are five fictional records and four open items.
  - Open items includes Open plus In progress and excludes Closed.
  - The status dropdown/filter and search can be combined.
  - Notes persist only in browser local storage, specific to the browser origin and profile.
  - Storage errors must be explicit for blocked, full, or unreadable storage; a failed save must never be described as successful.
  - Reset clears notes and filters only after confirmation. Cancellation or reset failure does not alter state.
- Assumptions:
  - The fictional reviewer may benefit from narrowing the list before reading or writing a note.
  - A clearly associated note editor may make it easier to understand which fictional record a note belongs to.
  - The reviewer understands that browser-local notes are personal to the current origin/profile; this needs confirmation in a later review.
- Open questions:
  - Who is the intended reviewer in the scenario, and what is their actual goal and context?
  - What current alternative or workaround do they use, and what pain points have they supplied?
  - How often would they review items, and what impact would a missed, hidden, or misunderstood item have in the intended demo narrative?
  - Which device, browser, and accessibility needs should the prototype represent?
  - What note content and length should the fictional interaction demonstrate, if any?

## Desired outcomes

- The reviewer can distinguish the four fictional open items from the one Closed item.
- The reviewer can combine status filtering and search and understand when there are no matches.
- The reviewer can tell which fictional record a note is associated with and whether it was saved in this browser origin/profile.
- Storage and reset errors are communicated plainly without implying a successful save or reset when one failed.
- The reviewer can complete the experience with keyboard and assistive technology, at narrow and wide viewport sizes.

