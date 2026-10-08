import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { equipment, filterEquipment } from './data'
import { loadNotes, NOTE_LIMIT, STORAGE_KEY, validateNote } from './notes'

beforeEach(() => {
  localStorage.clear()
})

describe('equipment filtering', () => {
  it('combines trimmed case-insensitive search and status', () => {
    expect(filterEquipment(' HT ', 'Open items').map((item) => item.id)).toEqual(['HT-208', 'HT-211'])
    expect(filterEquipment(' HT ', 'Open').map((item) => item.id)).toEqual(['HT-211'])
    expect(filterEquipment('workshop', 'In progress').map((item) => item.id)).toEqual(['HT-208'])
    expect(filterEquipment('', 'All')).toHaveLength(5)
    expect(filterEquipment('', 'Closed').map((item) => item.id)).toEqual(['WT-031'])
  })

  it('renders empty results and clears both filters', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.selectOptions(screen.getByLabelText('Issue status'), 'Closed')
    await user.type(screen.getByLabelText('Search equipment or issue'), 'HT-208')
    expect(screen.getByText('No matching equipment')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(screen.getAllByRole('article')).toHaveLength(equipment.length)
    expect(screen.getByLabelText('Issue status')).toHaveValue('All')
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('')
  })

  it('toggles open items with a site-wide count and preserves search', async () => {
    const user = userEvent.setup()
    render(<App />)
    const shortcut = screen.getByRole('button', { name: /Open items only/ })
    const count = within(shortcut).getByLabelText('4 open items across the fictional site')
    expect(shortcut).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getAllByRole('article')).toHaveLength(5)
    expect(count).toHaveTextContent('4')

    await user.click(shortcut)
    expect(shortcut).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('Issue status')).toHaveValue('Open items')
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('article', { name: 'Haul truck 208' })).toHaveTextContent('In progress')
    expect(screen.queryByRole('article', { name: 'Water truck 031' })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Search equipment or issue'), 'HT')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByText('2 of 5 records')).toBeInTheDocument()
    expect(count).toHaveTextContent('4')
    expect(shortcut).toHaveAttribute('aria-pressed', 'true')
    await user.click(shortcut)
    expect(screen.getByLabelText('Issue status')).toHaveValue('All')
    expect(shortcut).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('HT')
    await user.click(shortcut)
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('HT')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(count).toHaveTextContent('4')
  })

  it.each(['All', 'Open', 'In progress', 'Closed'])('synchronizes the shortcut with dropdown status %s', async (status) => {
    const user = userEvent.setup()
    render(<App />)
    const shortcut = screen.getByRole('button', { name: /Open items only/ })
    await user.selectOptions(screen.getByLabelText('Issue status'), 'Open items')
    expect(shortcut).toHaveAttribute('aria-pressed', 'true')
    await user.selectOptions(screen.getByLabelText('Issue status'), status)
    expect(shortcut).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getAllByRole('article')).toHaveLength(filterEquipment('', status as Parameters<typeof filterEquipment>[1]).length)
    await user.click(shortcut)
    expect(screen.getByLabelText('Issue status')).toHaveValue('Open items')
    expect(shortcut).toHaveAttribute('aria-pressed', 'true')
  })

  it('clears an active shortcut from empty results without changing its site-wide count', async () => {
    const user = userEvent.setup()
    render(<App />)
    const shortcut = screen.getByRole('button', { name: /Open items only/ })
    await user.click(shortcut)
    await user.type(screen.getByLabelText('Search equipment or issue'), 'WT-031')
    expect(screen.getByText('No matching equipment')).toBeInTheDocument()
    expect(within(shortcut).getByLabelText('4 open items across the fictional site')).toHaveTextContent('4')
    await user.click(screen.getByRole('button', { name: 'Clear filters' }))
    expect(shortcut).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByLabelText('Issue status')).toHaveValue('All')
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })

  it('supports keyboard toggling and retains the selected equipment, draft, and saved notes', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'EX-104': 'Saved context' }))
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Your handover note'), 'Unsaved context')
    screen.getByLabelText('Issue status').focus()
    await user.tab()
    const shortcut = screen.getByRole('button', { name: /Open items only/ })
    expect(shortcut).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(shortcut).toHaveAttribute('aria-pressed', 'true')
    await user.keyboard(' ')
    expect(shortcut).toHaveAttribute('aria-pressed', 'false')
    expect(shortcut).toHaveFocus()
    expect(screen.getByLabelText('Equipment')).toHaveValue('EX-104')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('Unsaved context')
    expect(screen.getByText('Saved context')).toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY)).toContain('Saved context')
  })
})

describe('handover notes', () => {
  it('rejects blank and over-limit notes and accepts exactly 500 characters', () => {
    expect(validateNote('   ')).toContain('Enter')
    expect(validateNote('x'.repeat(NOTE_LIMIT + 1))).toContain('500')
    expect(validateNote('x'.repeat(NOTE_LIMIT))).toBeNull()
  })

  it('renders validation without persisting invalid input', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a handover note')
    expect(screen.getByLabelText('Your handover note')).toHaveFocus()
    fireEvent.change(screen.getByLabelText('Your handover note'), { target: { value: 'x'.repeat(501) } })
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(screen.getByRole('alert')).toHaveTextContent('500 characters or fewer')
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('saves a trimmed note for the selected equipment and restores it on reload', async () => {
    const user = userEvent.setup()
    const first = render(<App />)
    await user.click(screen.getByRole('button', { name: 'View handover for HT-208' }))
    expect(screen.getByLabelText('Equipment')).toHaveValue('HT-208')
    expect(screen.getByLabelText('Your handover note')).toHaveFocus()
    await user.type(screen.getByLabelText('Your handover note'), '  Documentation update pending.  ')
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({ 'HT-208': 'Documentation update pending.' })
    expect(screen.getByRole('status', { name: 'Note feedback' })).toHaveTextContent('HT-208 saved on this browser only')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('')
    first.unmount()
    render(<App />)
    await user.selectOptions(screen.getByLabelText('Equipment'), 'HT-208')
    expect(screen.getByText('Documentation update pending.')).toBeInTheDocument()
    const truck = screen.getByRole('heading', { name: 'Haul truck 208' }).closest('article')!
    expect(within(truck).getByText('Browser-local note saved')).toBeInTheDocument()
  })

  it('replaces only the latest selected equipment note', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'EX-104': 'Old note', 'HT-208': 'Keep this note' }))
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Your handover note'), 'Updated note')
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({ 'EX-104': 'Updated note', 'HT-208': 'Keep this note' })
  })

  it('supports keyboard-only saving', async () => {
    const user = userEvent.setup()
    render(<App />)
    screen.getByLabelText('Your handover note').focus()
    await user.keyboard('Keyboard note')
    await user.tab()
    expect(screen.getByRole('button', { name: 'Save handover note' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('status', { name: 'Note feedback' })).toHaveTextContent('saved on this browser only')
  })

  it('retains a draft and explicitly reports failed saves', async () => {
    const user = userEvent.setup()
    render(<App />)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Quota') })
    await user.type(screen.getByLabelText('Your handover note'), 'Keep my draft')
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Could not save')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('Keep my draft')
    expect(screen.getByRole('status', { name: 'Note feedback' })).not.toHaveTextContent('saved')
  })

  it('protects a draft when switching equipment and keeps it for the same equipment', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Your handover note'), 'Unsaved context')
    await user.click(screen.getByRole('button', { name: 'View handover for EX-104' }))
    expect(confirm).not.toHaveBeenCalled()
    expect(screen.getByLabelText('Your handover note')).toHaveValue('Unsaved context')
    await user.selectOptions(screen.getByLabelText('Equipment'), 'HT-208')
    expect(screen.getByLabelText('Equipment')).toHaveValue('EX-104')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('Unsaved context')
    confirm.mockReturnValue(true)
    await user.selectOptions(screen.getByLabelText('Equipment'), 'HT-208')
    expect(screen.getByLabelText('Equipment')).toHaveValue('HT-208')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('')
  })

  it('guards page exit only while a draft is unsaved', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Your handover note'), 'Unsaved')
    const leaving = new Event('beforeunload', { cancelable: true })
    window.dispatchEvent(leaving)
    expect(leaving.defaultPrevented).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    const saved = new Event('beforeunload', { cancelable: true })
    window.dispatchEvent(saved)
    expect(saved.defaultPrevented).toBe(false)
  })
})

describe('storage and reset', () => {
  it.each([
    '{bad json',
    'null',
    '[]',
    '{"unknown":"Note"}',
    '{"EX-104":5}',
    '{"EX-104":"  "}',
    JSON.stringify({ 'EX-104': 'x'.repeat(501) }),
  ])('reports invalid stored data: %s', (raw) => {
    localStorage.setItem(STORAGE_KEY, raw)
    const result = loadNotes()
    expect(result.notes).toEqual({})
    expect(result.error).toContain('could not be read')
  })

  it('reports unavailable storage on initial load', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    render(<App />)
    expect(screen.getByRole('alert')).toHaveTextContent('could not be read')
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })

  it('does not reset when confirmation is cancelled', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'EX-104': 'Keep note' }))
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Search equipment or issue'), 'HT')
    await user.click(screen.getByRole('button', { name: /Open items only/ }))
    await user.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('HT')
    expect(screen.getByLabelText('Issue status')).toHaveValue('Open items')
    expect(screen.getByRole('button', { name: /Open items only/ })).toHaveAttribute('aria-pressed', 'true')
    expect(localStorage.getItem(STORAGE_KEY)).toContain('Keep note')
  })

  it('resets only demo notes and restores seed UI after confirmation', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'EX-104': 'Clear note' }))
    localStorage.setItem('unrelated-app', 'keep')
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Open items only/ }))
    await user.type(screen.getByLabelText('Search equipment or issue'), 'HT')
    await user.selectOptions(screen.getByLabelText('Equipment'), 'HT-208')
    await user.type(screen.getByLabelText('Your handover note'), 'Draft')
    await user.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(localStorage.getItem('unrelated-app')).toBe('keep')
    expect(screen.getByLabelText('Equipment')).toHaveValue('EX-104')
    expect(screen.getByLabelText('Issue status')).toHaveValue('All')
    expect(screen.getByRole('button', { name: /Open items only/ })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })

  it('keeps UI and saved notes intact when reset storage fails', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'EX-104': 'Keep note' }))
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('Blocked') })
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Open items only/ }))
    await user.type(screen.getByLabelText('Search equipment or issue'), 'HT')
    await user.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Could not reset')
    expect(screen.getByLabelText('Issue status')).toHaveValue('Open items')
    expect(screen.getByRole('button', { name: /Open items only/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('HT')
    expect(localStorage.getItem(STORAGE_KEY)).toContain('Keep note')
  })

  it('recovers from malformed notes with an explicit reset', async () => {
    localStorage.setItem(STORAGE_KEY, '{broken')
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Reset demo' }))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})
