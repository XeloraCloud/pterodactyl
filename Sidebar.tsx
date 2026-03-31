/**
 * Pterodactyl Premium Theme — Sidebar Navigation
 * resources/scripts/theme/components/layout/Sidebar.tsx
 */

import React from 'react';
import { colors, spacing } from '../../tokens';
import { Avatar } from '../ui';

// ─── SVG Icons (self-contained, no icon library needed) ───────────────────────

const Icon: React.FC<{ d: string; size?: number }> = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);

const icons = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  server:    'M2 2h20v8H2zM2 14h20v8H2zM7 6h.01M7 18h.01',
  node:      'M12 5a2 2 0 100-4 2 2 0 000 4zM5 21a2 2 0 100-4 2 2 0 000 4zM19 21a2 2 0 100-4 2 2 0 000 4zM12 7v5l-4.5 5M12 12l4.5 5',
  globe:     'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20',
  activity:  'M22 12h-4l-3 9L9 3l-3 9H2',
  users:     'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  settings:  'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  help:      'M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01',
};

// ─── Nav item data ────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: keyof typeof icons;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: 'dashboard' },
  { id: 'servers',   label: 'Servers',    icon: 'server',   badge: '6' },
  { id: 'nodes',     label: 'Nodes',      icon: 'node',     badge: '3' },
  { id: 'network',   label: 'Network',    icon: 'globe' },
  { id: 'activity',  label: 'Activity',   icon: 'activity' },
  { id: 'users',     label: 'Users',      icon: 'users' },
];

const BOTTOM_ITEMS: NavItem[] = [
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'help',     label: 'Help',     icon: 'help' },
];

// ─── NavLink ──────────────────────────────────────────────────────────────────

interface NavLinkProps {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, active, onClick }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
        marginBottom: 2,
        background: active
          ? 'rgba(124,58,237,.18)'
          : hovered
          ? 'rgba(255,255,255,.05)'
          : 'transparent',
        border: active ? `1px solid rgba(124,58,237,.25)` : '1px solid transparent',
        color: active ? '#a78bfa' : hovered ? '#d1d5db' : colors.text.muted,
        fontSize: 13.5, fontWeight: 500,
        transition: 'all .18s ease',
      }}
    >
      <Icon d={icons[item.icon]} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge && (
        <span style={{
          background: active ? 'rgba(124,58,237,.35)' : 'rgba(255,255,255,.07)',
          color: active ? '#a78bfa' : colors.text.dim,
          fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 5,
        }}>
          {item.badge}
        </span>
      )}
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

/**
 * Sidebar navigation component.
 * Wires up to your router — replace `onNavigate` with `useNavigate()` from react-router-dom.
 *
 * Example with react-router:
 *   const navigate = useNavigate();
 *   <Sidebar activeId={currentPage} onNavigate={(id) => navigate(`/admin/${id}`)} />
 */
const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate }) => (
  <aside style={{
    width: spacing.sidebarWidth,
    minWidth: spacing.sidebarWidth,
    background: colors.bg.sidebar,
    borderRight: `1px solid ${colors.border.default}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0 10px',
    userSelect: 'none',
  }}>
    {/* Logo */}
    <div style={{
      padding: '18px 6px 16px',
      borderBottom: `1px solid ${colors.border.default}`,
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar initials="P" size={32} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>Pterodactyl</div>
          <div style={{ fontSize: 10.5, color: colors.text.dim, fontFamily: "'JetBrains Mono', monospace" }}>
            v1.0 · Admin
          </div>
        </div>
      </div>
    </div>

    {/* Primary nav */}
    <nav style={{ flex: 1, paddingTop: 4 }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: colors.text.dim,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        padding: '4px 14px 8px',
      }}>
        Navigation
      </div>
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.id}
          item={item}
          active={activeId === item.id}
          onClick={() => onNavigate(item.id)}
        />
      ))}
    </nav>

    {/* Bottom nav */}
    <div style={{
      borderTop: `1px solid ${colors.border.default}`,
      paddingTop: 10, paddingBottom: 12,
    }}>
      {BOTTOM_ITEMS.map(item => (
        <NavLink
          key={item.id}
          item={item}
          active={activeId === item.id}
          onClick={() => onNavigate(item.id)}
        />
      ))}
    </div>
  </aside>
);

export default Sidebar;
