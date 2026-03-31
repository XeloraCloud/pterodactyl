/**
 * Pterodactyl Premium Dark Theme — Design Tokens
 * resources/scripts/theme/tokens.ts
 *
 * Import these in your Tailwind config (tailwind.config.js) under `theme.extend`
 * or use directly in component styles.
 */

export const colors = {
  // Base backgrounds
  bg: {
    deep:    '#07070b',   // Page background
    card:    '#0f0f17',   // Card surfaces
    hover:   '#141420',   // Card hover
    sidebar: '#09090e',   // Sidebar / header
    input:   '#0f0f17',   // Input fields
  },

  // Borders
  border: {
    default: 'rgba(255, 255, 255, 0.06)',
    hover:   'rgba(255, 255, 255, 0.10)',
    focus:   'rgba(124, 58, 237, 0.50)',
    strong:  'rgba(255, 255, 255, 0.12)',
  },

  // Accent — Violet / Indigo
  accent: {
    violet:     '#7c3aed',
    violetLight: '#8b5cf6',
    blue:       '#3b82f6',
    glow:       'rgba(124, 58, 237, 0.20)',
    glowBorder: 'rgba(124, 58, 237, 0.35)',
    bg:         'rgba(124, 58, 237, 0.12)',
  },

  // Text
  text: {
    primary:   '#f1f1f3',
    secondary: '#9ca3af',
    muted:     '#6b7280',
    dim:       '#4b5563',
  },

  // Status
  status: {
    running:  { bg: 'rgba(16,185,129,.12)', text: '#34d399', dot: '#10b981' },
    offline:  { bg: 'rgba(107,114,128,.10)', text: '#9ca3af', dot: '#4b5563' },
    starting: { bg: 'rgba(245,158,11,.12)',  text: '#fbbf24', dot: '#f59e0b' },
    stopping: { bg: 'rgba(239,68,68,.10)',   text: '#f87171', dot: '#ef4444' },
    error:    { bg: 'rgba(239,68,68,.14)',   text: '#f87171', dot: '#ef4444' },
  },

  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  danger:  '#ef4444',
  info:    '#3b82f6',
} as const;

export const typography = {
  // Use Geist for UI, JetBrains Mono for metrics/code
  fontSans:  "'Geist', system-ui, -apple-system, sans-serif",
  fontMono:  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontSize: {
    xs:   '11px',
    sm:   '12.5px',
    base: '13.5px',
    md:   '15px',
    lg:   '17px',
    xl:   '20px',
    '2xl': '24px',
    '3xl': '28px',
  },
} as const;

export const spacing = {
  cardPadding:   '18px 20px',
  pagePadding:   '22px 24px',
  sidebarWidth:  '210px',
  headerHeight:  '56px',
  cardRadius:    '14px',
  inputRadius:   '9px',
  badgeRadius:   '6px',
  buttonRadius:  '8px',
} as const;

export const animation = {
  fast:   '0.15s ease',
  normal: '0.20s ease',
  slow:   '0.35s ease',
} as const;
