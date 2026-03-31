# Pterodactyl Premium Dark Theme
### Clean · Professional · Modern SaaS Dashboard

---

## Folder Structure

```
resources/scripts/theme/
│
├── tokens.ts                          # Design system tokens (colors, spacing, fonts)
├── mockData.ts                        # Placeholder data (swap with real API hooks)
│
├── components/
│   ├── ui/
│   │   └── index.tsx                  # Shared primitives: Card, Badge, MiniBar, Button, Avatar…
│   │
│   ├── layout/
│   │   ├── Sidebar.tsx                # Navigation sidebar
│   │   └── Header.tsx                 # Top header: breadcrumb, search, notifications, user
│   │
│   └── dashboard/
│       ├── StatCard.tsx               # Metric card (Total Servers, CPU, RAM…)
│       ├── ResourceChart.tsx          # Area + bar chart (recharts)
│       ├── NodeHealth.tsx             # Per-node CPU/RAM/Disk bars
│       └── ServerList.tsx             # Recent servers table with status + usage bars
│
└── pages/
    └── DashboardPage.tsx              # Full dashboard page (composes all components)

tailwind.theme.js                      # Tailwind config extension (merge into tailwind.config.js)
```

---

## Design System

| Token         | Value                      |
|---------------|----------------------------|
| Background    | `#07070b` (page), `#0f0f17` (card) |
| Sidebar/Header| `#09090e`                  |
| Accent        | `#7c3aed` violet, `#3b82f6` blue |
| Text primary  | `#f1f1f3`                  |
| Text muted    | `#6b7280`                  |
| Border        | `rgba(255,255,255,0.06)`   |
| Font UI       | Geist (or system-ui)       |
| Font metrics  | JetBrains Mono             |
| Card radius   | `14px`                     |

---

## Integration Steps

### 1. Install fonts
Add to your HTML `<head>` (or import in your global CSS):

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### 2. Merge Tailwind config

In `tailwind.config.js`:
```js
const { themeExtension } = require('./tailwind.theme.js');

module.exports = {
  content: ['./resources/scripts/**/*.{ts,tsx}'],
  theme: {
    extend: { ...themeExtension },
  },
  plugins: [],
};
```

### 3. Install recharts (if not already installed)
```bash
yarn add recharts
# or
npm install recharts
```

### 4. Register the dashboard route

In `resources/scripts/routers/AdminRouter.tsx`, find the existing dashboard route and swap it:

```tsx
// Before:
import OverviewContainer from '@/components/admin/overview/OverviewContainer';

// After:
import DashboardPage from '@/theme/pages/DashboardPage';

// In your <Route> definition:
<Route path="/admin" element={<DashboardPage />} />
```

### 5. Swap mock data for real API hooks

Each component accepts typed props. Once you've validated the UI with mock data,
replace the mock imports with Pterodactyl's existing API wrappers:

```tsx
// Replace in DashboardPage.tsx:
import { MOCK_SERVERS } from '../mockData';
// With:
import { useServerList } from '@/api/admin/servers';

// Then:
const { data: servers = [] } = useServerList();
<ServerList servers={servers} />
```

### 6. Add global animation CSS

Add to your global stylesheet (`resources/scripts/styles/main.css` or equivalent):

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Status dot animation for running servers */
.status-pulse {
  animation: pulse 2s ease infinite;
}
```

---

## Component API Reference

### `<StatCard />`
| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | SVG icon element |
| `label` | `string` | Card label |
| `value` | `string` | Primary metric (e.g. "6", "33%") |
| `subtext` | `string?` | Secondary text below metric |
| `trend` | `string?` | Trend text (e.g. "+2 this week") |
| `trendPositive` | `boolean?` | Controls green/red trend color |
| `accentColor` | `string?` | Icon accent color override |

### `<ServerList />`
| Prop | Type | Description |
|------|------|-------------|
| `servers` | `MockServer[]` | Array of server objects |
| `onViewAll` | `() => void` | "View all" button handler |
| `onOpenServer` | `(id: number) => void` | Row click handler |
| `maxRows` | `number?` | Max rows to display (default 6) |

### `<ResourceChart />`
| Prop | Type | Description |
|------|------|-------------|
| `usageData` | `ChartPoint[]` | Time-series CPU+RAM data |
| `dailyData` | `DailyPoint[]` | Daily server/event data |

### `<NodeHealth />`
| Prop | Type | Description |
|------|------|-------------|
| `nodes` | `MockNode[]` | Array of node objects |

### `<Sidebar />`
| Prop | Type | Description |
|------|------|-------------|
| `activeId` | `string` | Current active nav item ID |
| `onNavigate` | `(id: string) => void` | Navigation handler (wire to router) |

### `<Header />`
| Prop | Type | Description |
|------|------|-------------|
| `breadcrumbs` | `{ label, href? }[]` | Breadcrumb items |
| `username` | `string?` | Display username |
| `initials` | `string?` | Avatar initials |
| `notificationCount` | `number?` | Notification badge count |
| `onSearch` | `(q: string) => void` | Search input handler |

---

## Browser Support
Chrome 100+, Firefox 100+, Safari 15+, Edge 100+.
No IE support (uses CSS variables, flexbox, grid).

## License
MIT — use freely in your Pterodactyl setup.
```
