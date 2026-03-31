/**
 * Pterodactyl Premium Theme — StatCard Component
 * resources/scripts/theme/components/dashboard/StatCard.tsx
 */

import React from 'react';
import { colors } from '../../tokens';
import { Card } from '../ui';

interface StatCardProps {
  /** SVG icon element */
  icon: React.ReactNode;
  /** Card label (e.g. "Total Servers") */
  label: string;
  /** Primary metric value (e.g. "6", "33%") */
  value: string;
  /** Optional sub-label below the metric */
  subtext?: string;
  /** Trend text (e.g. "+2 this week") */
  trend?: string;
  /** Is the trend positive? Controls color. */
  trendPositive?: boolean;
  /** Icon accent color override */
  accentColor?: string;
}

/**
 * Compact stats card used in the top row of the dashboard.
 * Shows an icon, a large metric value, a label, and an optional trend badge.
 *
 * Usage:
 *   <StatCard
 *     icon={<ServerIcon />}
 *     label="Total Servers"
 *     value="6"
 *     subtext="Across 3 nodes"
 *     trend="+2 this week"
 *     trendPositive
 *   />
 */
const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  trend,
  trendPositive = true,
  accentColor = colors.accent.violet,
}) => {
  const trendBg    = trendPositive ? 'rgba(16,185,129,.10)' : 'rgba(239,68,68,.10)';
  const trendColor = trendPositive ? '#34d399' : '#f87171';
  const trendArrow = trendPositive ? '↑' : '↓';

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Icon row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: 38, height: 38,
            borderRadius: 10,
            background: `${accentColor}1f`,
            border: `1px solid ${accentColor}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accentColor,
          }}
        >
          {icon}
        </div>

        {trend && (
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '3px 8px', borderRadius: 6,
              fontSize: 11, fontWeight: 500,
              background: trendBg, color: trendColor,
            }}
          >
            {trendArrow} {trend}
          </span>
        )}
      </div>

      {/* Value row */}
      <div>
        <div
          style={{
            fontSize: 28, fontWeight: 600,
            color: colors.text.primary,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 12.5, color: colors.text.muted, marginTop: 4 }}>{label}</div>
        {subtext && (
          <div style={{ fontSize: 11.5, color: colors.text.dim, marginTop: 3 }}>{subtext}</div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
