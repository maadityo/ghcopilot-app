import { equipment } from './data'

export const STORAGE_KEY = 'shiftboard-demo.notes.v1'
export const NOTE_LIMIT = 500
export type Notes = Record<string, string>

export function validateNote(text: string): string | null {
  if (!text.trim()) return 'Enter a handover note before saving.'
  if (text.length > NOTE_LIMIT) return `Keep the note to ${NOTE_LIMIT} characters or fewer.`
  return null
}

export function loadNotes(): { notes: Notes; error: string | null } {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === null) return { notes: {}, error: null }
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('Invalid notes')
    }
    const notes: Notes = {}
    for (const [id, text] of Object.entries(parsed)) {
      if (!equipment.some((item) => item.id === id)
        || typeof text !== 'string' || validateNote(text)) {
        throw new Error('Invalid note entry')
      }
      notes[id] = text.trim()
    }
    return { notes, error: null }
  } catch {
    return {
      notes: {},
      error: 'Saved demo notes could not be read. Browser storage may be unavailable or the saved data is invalid. Reset demo to clear invalid data, or enable storage and reload.',
    }
  }
}

export function saveNotes(notes: Notes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function resetNotes() {
  window.localStorage.removeItem(STORAGE_KEY)
}
