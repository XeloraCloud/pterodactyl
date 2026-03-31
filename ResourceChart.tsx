/**
 * Pterodactyl Premium Theme — ResourceChart Component
 * resources/scripts/theme/components/dashboard/ResourceChart.tsx
 *
 * Area chart for CPU + RAM usage over time, plus a bar chart for event history.
 * Uses recharts (already a dep in most Pterodactyl setups).
 *
 * Install if missing:  yarn add recharts
 */

import React, { useState } from 'react';
import {
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../../tokens';
import { Card, SectionHeader } from '../ui';
import type { ChartPoint, DailyPoint } from '../../mockData';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const ChartTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#13131c',
      border: `1px solid ${colors.border.strong}`,
      borderRadius: 10, padding: '10px 14px', fontSize: 12,
    }}>
      <div style={{ color: colors.text.muted, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: colors.text.primary }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.name}: {p.value}%</span>
        </div>
      ))}
    </div>
  );
};

// ─── Legend item ──────────────────────────────────────────────────────────────

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <span style={{ width: 20, height: 2, background: color, borderRadius: 2, display: 'inline-block' }} />
    <span style={{ fontSize: 11.5, color: colors.text.muted }}>{label}</span>
  </div>
);

// ─── Tab button ───────────────────────────────────────────────────────────────

interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '4px 12px', borderRadius: 7, fontSize: 12,
      cursor: 'pointer', fontFamily: "'Geist', sans-serif",
      background: active ? colors.accent.bg : 'transparent',
      border: `1px solid ${active ? colors.accent.glowBorder : colors.border.default}`,
      color: active ? '#a78bfa' : colors.text.muted,
      transition: 'all .15s',
    }}
  >
    {label}
  </button>
);

// ─── ResourceChart ────────────────────────────────────────────────────────────

interface ResourceChartProps {
  usageData: ChartPoint[];
  dailyData: DailyPoint[];
}

/**
 * Two-tab chart card:
 *   - "Usage"   → CPU + RAM area chart over time
 *   - "Servers" → daily events bar chart
 */
const ResourceChart: React.FC<ResourceChartProps> = ({ usageData, dailyData }) => {
  const [tab, setTab] = useState<'usage' | 'servers'>('usage');

  const axisStyle = {
    fill: colors.text.dim,
    fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
  };

  return (
    <Card>
      <SectionHeader
        title="Resource Usage"
        subtitle="24-hour overview"
        action={
          <div style={{ display: 'flex', gap: 4 }}>
            <Tab label="Usage" active={tab === 'usage'} onClick={() => setTab('usage')} />
            <Tab label="Servers" active={tab === 'servers'} onClick={() => setTab('servers')} />
          </div>
        }
      />

      <ResponsiveContainer width="100%" height={200}>
        {tab === 'usage' ? (
          <AreaChart data={usageData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="gCpu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={colors.accent.violet} stopOpacity={0.28} />
                <stop offset="95%" stopColor={colors.accent.violet} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gRam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={colors.accent.blue} stopOpacity={0.22} />
                <stop offset="95%" stopColor={colors.accent.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
            <XAxis dataKey="time" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone" dataKey="cpu" name="CPU"
              stroke={colors.accent.violet} strokeWidth={2}
              fill="url(#gCpu)" dot={false}
              activeDot={{ r: 4, fill: colors.accent.violet }}
            />
            <Area
              type="monotone" dataKey="ram" name="RAM"
              stroke={colors.accent.blue} strokeWidth={2}
              fill="url(#gRam)" dot={false}
              activeDot={{ r: 4, fill: colors.accent.blue }}
            />
          </AreaChart>
        ) : (
          <BarChart data={dailyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
            <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="events" name="Events" fill="rgba(124,58,237,.60)" radius={[4,4,0,0]} />
            <Bar dataKey="servers" name="Servers" fill="rgba(59,130,246,.50)" radius={[4,4,0,0]} />
          </BarChart>
        )}
      </ResponsiveContainer>

      {tab === 'usage' && (
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <LegendItem color={colors.accent.violet} label="CPU" />
          <LegendItem color={colors.accent.blue}   label="RAM" />
        </div>
      )}
    </Card>
  );
};

export default ResourceChart;
