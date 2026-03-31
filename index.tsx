/**
 * Pterodactyl Premium Theme — Shared UI Primitives
 * resources/scripts/theme/components/ui/index.tsx
 */

import React, { CSSProperties } from 'react';
import { colors, spacing } from '../../tokens';
import type { ServerStatus } from '../../mockData';

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, className, onClick }) => (
  <div
    className={className}
    onClick={onClick}
    style={{
      background: colors.bg.card,
      border: `1px solid ${colors.border.default}`,
      borderRadius: spacing.cardRadius,
      padding: spacing.cardPadding,
      transition: `border-color ${0.2}s ease`,
      cursor: onClick ? 'pointer' : undefined,
      ...style,
    }}
    onMouseEnter={e => {
      if (onClick) (e.currentTarget as HTMLDivElement).style.borderColor = colors.border.hover;
    }}
    onMouseLeave={e => {
      if (onClick) (e.currentTarget as HTMLDivElement).style.borderColor = colors.border.default;
    }}
  >
    {children}
  </div>
);

// ─── Badge ───────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  style?: CSSProperties;
}

const BADGE_VARIANTS = {
  default: { bg: 'rgba(255,255,255,.07)', color: colors.text.secondary },
  success: { bg: 'rgba(16,185,129,.12)',  color: '#34d399' },
  warning: { bg: 'rgba(245,158,11,.12)', color: '#fbbf24' },
  danger:  { bg: 'rgba(239,68,68,.12)',  color: '#f87171' },
  info:    { bg: 'rgba(59,130,246,.12)', color: '#60a5fa' },
  accent:  { bg: colors.accent.bg,       color: '#a78bfa' },
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', style }) => {
  const v = BADGE_VARIANTS[variant];
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 8px',
        borderRadius: spacing.badgeRadius,
        fontSize: 11.5, fontWeight: 500,
        background: v.bg, color: v.color,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// ─── StatusBadge ─────────────────────────────────────────────────────────────

interface StatusBadgeProps { status: ServerStatus }

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = colors.status[status] ?? colors.status.offline;
  const isPulsing = status === 'running';

  return (
    <Badge style={{ background: s.bg, color: s.text }}>
      <span
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: s.dot, display: 'inline-block',
          animation: isPulsing ? 'pulse 2s infinite' : undefined,
        }}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// ─── MiniBar (Usage Bar) ─────────────────────────────────────────────────────

interface MiniBarProps {
  value: number;
  max: number;
  accentColor?: string;
  showLabel?: boolean;
}

export const MiniBar: React.FC<MiniBarProps> = ({
  value, max, accentColor = colors.accent.violet, showLabel = true,
}) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const barColor = pct > 80 ? colors.danger : pct > 60 ? colors.warning : accentColor;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{
        flex: 1, height: 4, background: 'rgba(255,255,255,.06)', borderRadius: 9,
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: barColor, borderRadius: 9,
          transition: 'width .35s ease',
        }} />
      </div>
      {showLabel && (
        <span style={{
          fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
          color: colors.text.muted, minWidth: 28, textAlign: 'right',
        }}>
          {pct}%
        </span>
      )}
    </div>
  );
};

// ─── IconButton ──────────────────────────────────────────────────────────────

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  title?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, onClick, style, title }) => (
  <button
    title={title}
    onClick={onClick}
    style={{
      background: 'rgba(255,255,255,.04)',
      border: `1px solid ${colors.border.default}`,
      borderRadius: spacing.buttonRadius,
      padding: 8, color: colors.text.muted,
      cursor: 'pointer', display: 'flex', alignItems: 'center',
      transition: 'all .18s ease',
      ...style,
    }}
  >
    {children}
  </button>
);

// ─── Button ──────────────────────────────────────────────────────────────────

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'accent' | 'ghost';
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children, onClick, variant = 'accent', size = 'md', style,
}) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '4px 12px' : '7px 16px',
      background: variant === 'accent' ? colors.accent.bg : 'rgba(255,255,255,.04)',
      border: `1px solid ${variant === 'accent' ? colors.accent.glowBorder : colors.border.default}`,
      color: variant === 'accent' ? '#a78bfa' : colors.text.secondary,
      borderRadius: spacing.buttonRadius,
      fontSize: size === 'sm' ? 12 : 13,
      fontFamily: "'Geist', sans-serif",
      cursor: 'pointer',
      transition: 'all .18s ease',
      ...style,
    }}
  >
    {children}
  </button>
);

// ─── SectionHeader ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: colors.text.primary }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: colors.text.dim, marginTop: 2 }}>{subtitle}</div>}
    </div>
    {action}
  </div>
);

// ─── Avatar ──────────────────────────────────────────────────────────────────

interface AvatarProps {
  initials: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, size = 32 }) => (
  <div style={{
    width: size, height: size,
    borderRadius: Math.round(size * 0.28),
    background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: Math.round(size * 0.38), fontWeight: 600,
    color: '#fff', fontFamily: "'JetBrains Mono', monospace",
    flexShrink: 0,
  }}>
    {initials}
  </div>
);
