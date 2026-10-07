export const themes = {
  demo: {
    label: 'Original demo',
    source: null,
    tokens: {
      primary: '#214e46', sidebar: '#173d3a', accent: '#e8c65c',
      'accent-ink': '#173d3a', secondary: '#e8c65c', tint: '#eef2e8',
      canvas: '#f5f6f2', border: '#bac9c0', ink: '#243d3a', muted: '#586960',
      focus: '#956700', 'sidebar-active': '#305350', 'sidebar-label': '#e8c65c',
    },
  },
  petrosea: {
    label: 'Petrosea-inspired draft',
    source: 'https://petrosea.com/',
    tokens: {
      primary: '#00674e', sidebar: '#09503e', accent: '#f38036',
      'accent-ink': '#202524', secondary: '#f38036', tint: '#f4f2e8',
      canvas: '#f7f7f3', border: '#b6c9c1', ink: '#243d3a', muted: '#586960',
      focus: '#00674e', 'sidebar-active': '#00674e', 'sidebar-label': '#ffb47f',
    },
  },
  petrindo: {
    label: 'Petrindo-inspired draft',
    source: 'https://petrindo.co.id/',
    tokens: {
      primary: '#0d2b4c', sidebar: '#0d2b4c', accent: '#f15a2b',
      'accent-ink': '#202524', secondary: '#53c7d7', tint: '#edf7f9',
      canvas: '#f5f5f5', border: '#b6c9d2', ink: '#24384b', muted: '#566673',
      focus: '#007482', 'sidebar-active': '#234664', 'sidebar-label': '#53c7d7',
    },
  },
} as const

export type ThemeId = keyof typeof themes

export function isThemeId(value: string): value is ThemeId {
  return Object.hasOwn(themes, value)
}
