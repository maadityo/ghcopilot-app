import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { equipment, filterEquipment, statusFilters, type StatusFilter } from './data'
import { loadNotes, NOTE_LIMIT, resetNotes, saveNotes, validateNote } from './notes'
import { isThemeId, themes, type ThemeId } from './themes'

export default function App() {
  const [initial] = useState(loadNotes)
  const [notes, setNotes] = useState(initial.notes)
  const [storageError, setStorageError] = useState(initial.error)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [selectedId, setSelectedId] = useState(equipment[0].id)
  const [draft, setDraft] = useState('')
  const [validation, setValidation] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [themeId, setThemeId] = useState<ThemeId>('demo')
  const theme = themes[themeId]
  const themeStyle: CSSProperties & Record<`--brand-${string}`, string> = {}
  for (const [token, value] of Object.entries(theme.tokens)) {
    themeStyle[`--brand-${token}`] = value
  }
  const noteInput = useRef<HTMLTextAreaElement>(null)
  const selected = equipment.find((item) => item.id === selectedId)!
  const visible = filterEquipment(query, status)
  const openCount = equipment.filter((item) => item.status !== 'Closed').length

  useEffect(() => {
    if (!draft.trim()) return
    const warnOnLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnOnLeave)
    return () => window.removeEventListener('beforeunload', warnOnLeave)
  }, [draft])

  function selectEquipment(id: string) {
    if (id === selectedId) {
      noteInput.current?.focus()
      return
    }
    if (draft.trim() && !window.confirm('Discard your unsaved note and switch equipment?')) return
    setSelectedId(id)
    setDraft('')
    setValidation(null)
    setMessage('')
    noteInput.current?.focus()
  }

  function saveNote(event: FormEvent) {
    event.preventDefault()
    const error = validateNote(draft)
    setValidation(error)
    setMessage('')
    if (error) {
      noteInput.current?.focus()
      return
    }
    const updated = { ...notes, [selectedId]: draft.trim() }
    try {
      saveNotes(updated)
      setNotes(updated)
      setDraft('')
      setStorageError(null)
      setMessage(`Note for ${selectedId} saved on this browser only.`)
    } catch {
      setStorageError('Could not save the note. Browser storage is unavailable or full. Your draft has been kept; enable storage or free space and try again.')
    }
  }

  function resetDemo() {
    if (!window.confirm('Clear this demo\'s saved notes and reset the screen? Other browser data will not be changed.')) return
    try {
      resetNotes()
      setNotes({})
      setQuery('')
      setStatus('All')
      setSelectedId(equipment[0].id)
      setDraft('')
      setValidation(null)
      setStorageError(null)
      setMessage('Demo reset. Fictional equipment records are unchanged.')
      setThemeId('demo')
    } catch {
      setStorageError('Could not reset demo notes. Browser storage is unavailable. No screen state was cleared; enable storage and try again.')
    }
  }

  return (
    <div className="app-shell" data-theme={themeId} style={themeStyle}>
      <a className="skip-link" href="#main">Skip to handover</a>
      <aside className="sidebar" aria-label="Demo context">
        <div className="brand" translate="no"><span className="brand-mark" aria-hidden="true">S</span>shiftboard<span className="brand-dot">.</span></div>
        <p className="sidebar-caption">OPERATIONS WORKSPACE</p>
        <div className="current-page"><span aria-hidden="true">/</span> Shift handover</div>
        <div className="sidebar-context">
          <span className="eyebrow">ONE SMALL WORKFLOW</span>
          <p className="sidebar-title">A clearer start<br />to the next shift.</p>
          <p>Find the open items.<br />Keep the context.<br />Leave a useful note.</p>
        </div>
        <div className="sidebar-footer"><span className="demo-dot" aria-hidden="true" /> Customer conversation prototype<br /><small>Built for a UI/UX demo</small></div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <span>Operations <span className="breadcrumb-divider">/</span> <strong>Shift handover</strong></span>
          <span className="prototype-tag">LOCAL PROTOTYPE</span>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="demo-banner"><strong>Fictional demo - not for operational use</strong><span>No live data, equipment controls, or shared updates.</span></div>
          <section className="theme-toolbar" aria-label="Shared template brand preview">
            <div className="theme-picker">
              <label htmlFor="theme">Visual theme</label>
              <select id="theme" name="visual-theme" value={themeId} onChange={(event) => {
                if (isThemeId(event.target.value)) setThemeId(event.target.value)
              }} aria-describedby="theme-help">
                {Object.entries(themes).map(([id, value]) => <option key={id} value={id}>{value.label}</option>)}
              </select>
            </div>
            <div className="theme-description">
              <p id="theme-help">One template, different brand colors. Visual draft only; the same fictional records and notes stay in view.</p>
              <p className="theme-feedback" role="status" aria-label="Theme feedback">
                {theme.label}{theme.source && <> · <a href={theme.source} target="_blank" rel="noreferrer">Public website reference</a> · Not an approved brand guide</>}
              </p>
            </div>
          </section>
          <div className="page-heading">
            <div><p className="eyebrow">NUSANTARA DEMO SITE / DAY TO NIGHT</p><h1>Pass on the context.</h1><p className="subtitle">A simple handover. A better starting point for the next shift.</p></div>
            <button className="button secondary reset-button" onClick={resetDemo}>Reset demo</button>
          </div>
          <section className="summary-grid" aria-label="Demo site summary">
            <div className="summary-card"><span className="summary-label">Equipment records</span><strong>{equipment.length.toString().padStart(2, '0')}</strong><span>Across the fictional site</span></div>
            <div className="summary-card attention"><span className="summary-label">Open handover items</span><strong>{openCount.toString().padStart(2, '0')}</strong><span>Open + in progress; not equipment availability</span></div>
            <div className="summary-card"><span className="summary-label">Your saved notes</span><strong>{Object.keys(notes).length.toString().padStart(2, '0')}</strong><span>Latest note per equipment, on this browser</span></div>
          </section>
          {storageError && <div className="error-banner" role="alert">{storageError}</div>}
          <div className="handover-grid">
            <section className="equipment-panel" aria-labelledby="equipment-heading">
              <div className="section-heading"><div><p className="eyebrow">SHIFT LOG</p><h2 id="equipment-heading">Equipment handover</h2></div><span className="record-count" role="status">{visible.length} of {equipment.length} records</span></div>
              <div className="filters">
                <div className="search-field"><label htmlFor="search">Search equipment or issue</label><input id="search" name="equipment-search" type="search" autoComplete="off" spellCheck={false} placeholder="Try HT-208 or workshop" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
                <div><label htmlFor="status">Issue status</label><select id="status" name="issue-status" autoComplete="off" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>{statusFilters.map((value) => <option key={value}>{value}</option>)}</select></div>
              </div>
              <button type="button" className="button secondary open-items-shortcut" aria-pressed={status === 'Open items'} onClick={() => setStatus(status === 'Open items' ? 'All' : 'Open items')}>
                <span>Open items only</span><span className="open-items-count" aria-label={`${openCount} open items across the fictional site`}>{openCount}</span>
              </button>
              <div className="equipment-list">
                {visible.length === 0 && <div className="empty-state"><h3>No matching equipment</h3><p>Try another search or change the issue status.</p><button className="button secondary" onClick={() => { setQuery(''); setStatus('All') }}>Clear filters</button></div>}
                {visible.map((item) => (
                  <article className={`equipment-card ${selectedId === item.id ? 'selected' : ''}`} key={item.id} aria-labelledby={`title-${item.id}`}>
                    <div className="equipment-top"><span className="equipment-id" translate="no">{item.id}</span><span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></div>
                    <h3 id={`title-${item.id}`}>{item.name}</h3>
                    <p className="equipment-location">{item.category} <span aria-hidden="true">/</span> {item.location}</p>
                    <p className="issue-description">{item.issue}</p>
                    <div className="equipment-bottom"><span>Owner: <strong>{item.owner}</strong></span><button className="text-button" onClick={() => selectEquipment(item.id)} aria-label={`View handover for ${item.id}`}>View handover <span aria-hidden="true">-&gt;</span></button></div>
                    {notes[item.id] && <p className="note-indicator">Browser-local note saved</p>}
                  </article>
                ))}
              </div>
            </section>

            <section className="note-panel" aria-labelledby="note-heading">
              <div className="note-panel-heading"><p className="eyebrow">NEXT SHIFT CONTEXT</p><h2 id="note-heading">Leave a clear handover.</h2><p>Keep the detail with the equipment.</p></div>
              <form onSubmit={saveNote} noValidate>
                <label htmlFor="equipment">Equipment</label>
                <select id="equipment" name="equipment" autoComplete="off" value={selectedId} onChange={(event) => selectEquipment(event.target.value)}>{equipment.map((item) => <option key={item.id} value={item.id}>{item.id} - {item.name}</option>)}</select>
                <div className="outgoing-note"><span className="eyebrow">FICTIONAL OUTGOING NOTE</span><p>{selected.handover}</p></div>
                {notes[selectedId] && <div className="saved-note"><span className="eyebrow">YOUR LATEST SAVED NOTE</span><p>{notes[selectedId]}</p></div>}
                <label htmlFor="note">Your handover note</label>
                <textarea ref={noteInput} id="note" name="handover-note" autoComplete="off" rows={5} placeholder="For example: Documentation update still pending" value={draft} onChange={(event) => { setDraft(event.target.value); setValidation(null); setMessage('') }} aria-invalid={!!validation} aria-describedby={`note-help note-count${validation ? ' note-error' : ''}`} />
                <div className="note-meta"><span id="note-help">Maximum {NOTE_LIMIT} characters</span><span id="note-count" className={draft.length > NOTE_LIMIT ? 'over-limit' : ''}>{draft.length}/{NOTE_LIMIT}</span></div>
                {validation && <p id="note-error" className="field-error" role="alert">{validation}</p>}
                <button className="button primary save-button" type="submit">Save handover note <span aria-hidden="true">-&gt;</span></button>
                <p className="local-notice">Saved on this browser only. Replaces your latest note for this equipment. Not sent to anyone.</p>
              </form>
              <p className="save-message" role="status" aria-label="Note feedback">{message}</p>
            </section>
          </div>
          <footer className="page-footer"><span>Small workflow. Visible improvement.</span><span>GitHub Copilot app UI/UX demo <span aria-hidden="true">/</span> All records are fictional</span></footer>
        </main>
      </div>
    </div>
  )
}
