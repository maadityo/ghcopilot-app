import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import App from './App'
import { STORAGE_KEY } from './notes'
import { isThemeId, themes } from './themes'

beforeEach(() => localStorage.clear())

it('uses explicit verified-reference palette tokens and rejects unknown themes', () => {
  expect(themes.petrosea.tokens.primary).toBe('#00674e')
  expect(themes.petrindo.tokens.primary).toBe('#0d2b4c')
  expect(themes.petrindo.tokens.accent).toBe('#f15a2b')
  expect(themes.petrindo.tokens.secondary).toBe('#53c7d7')
  expect(isThemeId('petrindo')).toBe(true)
  expect(isThemeId('__proto__')).toBe(false)
  expect(isThemeId('unknown')).toBe(false)
})

it('keeps key theme text/background pairs above WCAG AA small-text contrast', () => {
  function luminance(hex: string) {
    const channels = [1, 3, 5].map((offset) => {
      const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  function contrast(foreground: string, background: string) {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
    return (values[0] + 0.05) / (values[1] + 0.05)
  }
  for (const { tokens } of Object.values(themes)) {
    for (const [foreground, background] of [
      ['#ffffff', tokens.primary],
      ['#edf4ef', tokens.sidebar],
      [tokens['accent-ink'], tokens.accent],
      [tokens['sidebar-label'], tokens.sidebar],
      [tokens.ink, tokens.canvas],
      [tokens.muted, tokens.tint],
      [tokens.primary, '#ffffff'],
    ]) {
      expect(contrast(foreground, background), `${foreground} on ${background}`).toBeGreaterThanOrEqual(4.5)
    }
  }
})

it('changes only presentation while preserving filters, selected equipment, draft, and saved notes', async () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ 'HT-208': 'Keep saved note' }))
  const user = userEvent.setup()
  const { container } = render(<App />)
  await user.selectOptions(screen.getByLabelText('Issue status'), 'Open items')
  await user.type(screen.getByLabelText('Search equipment or issue'), 'HT')
  await user.selectOptions(screen.getByLabelText('Equipment'), 'HT-208')
  await user.type(screen.getByLabelText('Your handover note'), 'Keep draft')
  for (const themeId of ['petrosea', 'petrindo', 'demo']) {
    await user.selectOptions(screen.getByLabelText('Visual theme'), themeId)
    expect(container.querySelector('.app-shell')).toHaveAttribute('data-theme', themeId)
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByLabelText('Issue status')).toHaveValue('Open items')
    expect(screen.getByLabelText('Equipment')).toHaveValue('HT-208')
    expect(screen.getByLabelText('Your handover note')).toHaveValue('Keep draft')
    expect(screen.getByText('Keep saved note')).toBeInTheDocument()
  }
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({ 'HT-208': 'Keep saved note' })
  expect(screen.getByLabelText('Search equipment or issue')).toHaveValue('HT')
})

it('exposes draft provenance and leaves notes usable in both company themes', async () => {
  const user = userEvent.setup()
  const { container } = render(<App />)
  for (const themeId of ['petrosea', 'petrindo']) {
    await user.selectOptions(screen.getByLabelText('Visual theme'), themeId)
    expect(screen.getByRole('status', { name: 'Theme feedback' })).toHaveTextContent('Not an approved brand guide')
    const link = screen.getByRole('link', { name: 'Public website reference' })
    expect(link).toHaveAttribute('href', themeId === 'petrosea' ? 'https://petrosea.com/' : 'https://petrindo.co.id/')
    expect(container.querySelector('.app-shell')?.getAttribute('style')).toContain('--brand-primary')
    await user.type(screen.getByLabelText('Your handover note'), `Note in ${themeId}`)
    await user.click(screen.getByRole('button', { name: 'Save handover note' }))
    expect(screen.getByRole('status', { name: 'Note feedback' })).toHaveTextContent('saved on this browser only')
  }
})

it('preserves theme on cancelled or failed reset and restores original after successful reset', async () => {
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
  const user = userEvent.setup()
  render(<App />)
  await user.selectOptions(screen.getByLabelText('Visual theme'), 'petrindo')
  await user.click(screen.getByRole('button', { name: 'Reset demo' }))
  expect(screen.getByLabelText('Visual theme')).toHaveValue('petrindo')
  confirm.mockReturnValue(true)
  const remove = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('Blocked') })
  await user.click(screen.getByRole('button', { name: 'Reset demo' }))
  expect(screen.getByLabelText('Visual theme')).toHaveValue('petrindo')
  remove.mockRestore()
  await user.click(screen.getByRole('button', { name: 'Reset demo' }))
  expect(screen.getByLabelText('Visual theme')).toHaveValue('demo')
})

it('does not enable unknown theme values', () => {
  const { container } = render(<App />)
  fireEvent.change(screen.getByLabelText('Visual theme'), { target: { value: 'unknown' } })
  expect(container.querySelector('.app-shell')).toHaveAttribute('data-theme', 'demo')
})
