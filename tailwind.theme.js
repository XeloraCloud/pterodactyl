/**
 * Pterodactyl Premium Theme — Tailwind Config Extension
 * tailwind.config.js  (merge into your existing config)
 *
 * Usage: spread `themeExtension` into your tailwind.config.js theme.extend block.
 * These mirror the design tokens in resources/scripts/theme/tokens.ts so you can
 * use Tailwind utility classes (e.g. `bg-surface`, `text-muted`, `border-subtle`)
 * instead of inline styles if preferred.
 */

const themeExtension = {
  colors: {
    // ── Backgrounds ──────────────────────────────────────────
    deep:      '#07070b',
    surface:   '#0f0f17',
    'surface-hover': '#141420',
    sidebar:   '#09090e',

    // ── Accents ──────────────────────────────────────────────
    violet: {
      DEFAULT: '#7c3aed',
      light:   '#8b5cf6',
      dim:     '#a78bfa',
      glow:    'rgba(124,58,237,0.20)',
    },
    blue: {
      DEFAULT: '#3b82f6',
      dim:     '#60a5fa',
    },

    // ── Text ─────────────────────────────────────────────────
    primary:   '#f1f1f3',
    secondary: '#9ca3af',
    muted:     '#6b7280',
    dim:       '#4b5563',

    // ── Status ───────────────────────────────────────────────
    running:  '#10b981',
    stopping: '#ef4444',
    starting: '#f59e0b',
    offline:  '#4b5563',
  },

  borderColor: {
    subtle:  'rgba(255,255,255,0.06)',
    soft:    'rgba(255,255,255,0.10)',
    strong:  'rgba(255,255,255,0.14)',
    focus:   'rgba(124,58,237,0.50)',
    accent:  'rgba(124,58,237,0.35)',
  },

  fontFamily: {
    sans: ["'Geist'", 'system-ui', '-apple-system', 'sans-serif'],
    mono: ["'JetBrains Mono'", "'Fira Code'", "'Cascadia Code'", 'monospace'],
  },

  borderRadius: {
    card:   '14px',
    input:  '9px',
    badge:  '6px',
    button: '8px',
  },

  boxShadow: {
    card:    '0 0 0 1px rgba(255,255,255,0.06)',
    glow:    '0 0 20px rgba(124,58,237,0.15)',
    'glow-sm': '0 0 8px rgba(124,58,237,0.25)',
  },
};

// ── Merge into your existing tailwind.config.js ───────────────────────────────
//
// module.exports = {
//   content: ['./resources/scripts/**/*.{ts,tsx}'],
//   theme: {
//     extend: {
//       ...themeExtension,   // ← add this
//     },
//   },
//   plugins: [],
// };

module.exports = { themeExtension };
