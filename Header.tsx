/**
 * Pterodactyl Premium Theme — Header Component
 * resources/scripts/theme/components/layout/Header.tsx
 */

import React, { useState } from 'react';
import { colors, spacing } from '../../tokens';
import { IconButton, Avatar } from '../ui';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  username?: string;
  initials?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onNotifications?: () => void;
  onUserMenu?: () => void;
}

/**
 * Top header bar with breadcrumb, search, notifications, and user menu.
 *
 * Integration note:
 *   - Replace username/initials with data from `useStoreState(state => state.user.data)`
 *   - Wire `onSearch` into Pterodactyl's existing server search logic
 */
const Header: React.FC<HeaderProps> = ({
  breadcrumbs = [{ label: 'Admin' }, { label: 'Dashboard' }],
  username = 'john_d',
  initials = 'JD',
  notificationCount = 1,
  onSearch,
  onNotifications,
  onUserMenu,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header style={{
      height: spacing.headerHeight,
      background: colors.bg.sidebar,
      borderBottom: `1px solid ${colors.border.default}`,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      gap: 16,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: colors.text.dim }}>/</span>}
            <span style={{ color: i === breadcrumbs.length - 1 ? colors.text.secondary : colors.text.dim }}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg
            width={14} height={14}
            viewBox="0 0 24 24" fill="none"
            stroke={colors.text.dim} strokeWidth="2"
            style={{ position: 'absolute', left: 10, pointerEvents: 'none', flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search servers…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={e => onSearch?.(e.target.value)}
            style={{
              background: colors.bg.input,
              border: `1px solid ${searchFocused ? colors.border.focus : colors.border.default}`,
              borderRadius: spacing.inputRadius,
              padding: '7px 12px 7px 32px',
              color: colors.text.primary,
              fontSize: 13,
              fontFamily: "'Geist', sans-serif",
              outline: 'none',
              width: 220,
              transition: 'border-color .2s',
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <IconButton onClick={onNotifications} title="Notifications">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </IconButton>
          {notificationCount > 0 && (
            <span style={{
              position: 'absolute', top: 5, right: 5,
              width: 7, height: 7, borderRadius: '50%',
              background: colors.accent.violet,
              boxShadow: `0 0 6px ${colors.accent.violet}`,
            }} />
          )}
        </div>

        {/* User menu */}
        <div
          onClick={onUserMenu}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 10px',
            borderRadius: 9,
            border: `1px solid ${colors.border.default}`,
            background: 'rgba(255,255,255,.03)',
            cursor: 'pointer',
            transition: 'background .15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.03)')}
        >
          <Avatar initials={initials} size={26} />
          <span style={{ fontSize: 13, color: '#d1d5db' }}>{username}</span>
          <span style={{ fontSize: 11, color: colors.text.dim }}>▾</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
