/**
 * Pterodactyl Premium Theme — Dashboard Page
 * resources/scripts/theme/pages/DashboardPage.tsx
 *
 * Drop-in replacement for the default admin dashboard.
 * Integrates all theme components. Replace mock data with real API hooks.
 *
 * To use with Pterodactyl's router:
 *   In resources/scripts/routers/AdminRouter.tsx, replace the existing
 *   dashboard route component with <DashboardPage />.
 */

import React, { useState } from 'react';
import { colors, spacing } from '../tokens';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import ResourceChart from '../components/dashboard/ResourceChart';
import NodeHealth from '../components/dashboard/NodeHealth';
import ServerList from '../components/dashboard/ServerList';
import {
  MOCK_SERVERS,
  MOCK_NODES,
  MOCK_CPU_CHART,
  MOCK_DAILY_CHART,
  getDashboardStats,
} from '../mockData';

// ─── Inline SVG Icons for StatCards ──────────────────────────────────────────

const ServerIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <circle cx="7" cy="6"  r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const PlayIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CpuIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
  </svg>
);

const RamIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 19v-3M10 19v-3M14 19v-3M18 19v-3" />
    <path d="M4 7h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2z" />
  </svg>
);

const PlusIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5"  y1="12" x2="19" y2="12" />
  </svg>
);

// ─── DashboardPage ────────────────────────────────────────────────────────────

const DashboardPage: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const stats = getDashboardStats();

  // Format RAM for display
  const totalRamGB  = (stats.totalRam / 1024).toFixed(1);
  const maxRamGB    = (stats.maxRam  / 1024).toFixed(0);
  const ramPctUsed  = Math.round((stats.totalRam / stats.maxRam) * 100);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: colors.bg.deep,
      fontFamily: "'Geist', system-ui, sans-serif",
    }}>
      {/* ── Sidebar ── */}
      <Sidebar activeId={activeNav} onNavigate={setActiveNav} />

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header
          breadcrumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}
          username="john_d"
          initials="JD"
          notificationCount={2}
        />

        <main style={{
          flex: 1, overflowY: 'auto',
          padding: spacing.pagePadding,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* ── Page title ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, color: colors.text.primary, letterSpacing: '-0.3px' }}>
                Overview
              </h1>
              <p style={{ fontSize: 13, color: colors.text.dim, marginTop: 3 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                {' · '}Last updated: just now
              </p>
            </div>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px',
                background: colors.accent.bg,
                border: `1px solid ${colors.accent.glowBorder}`,
                color: '#a78bfa',
                borderRadius: spacing.buttonRadius,
                fontSize: 13,
                fontFamily: "'Geist', sans-serif",
                cursor: 'pointer',
              }}
            >
              <PlusIcon /> New Server
            </button>
          </div>

          {/* ── Stat cards row ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 14,
          }}>
            <StatCard
              icon={<ServerIcon />}
              label="Total Servers"
              value={String(stats.total)}
              subtext="Across 3 nodes"
              trend="+2 this week"
              trendPositive
            />
            <StatCard
              icon={<PlayIcon />}
              label="Running Servers"
              value={String(stats.running)}
              subtext={`${stats.total - stats.running} offline`}
              trend="100% uptime"
              trendPositive
              accentColor="#10b981"
            />
            <StatCard
              icon={<CpuIcon />}
              label="Avg CPU Usage"
              value={`${stats.avgCpu}%`}
              subtext="Peak: 71% at 12:00"
              trend="-8% vs yesterday"
              trendPositive
              accentColor="#3b82f6"
            />
            <StatCard
              icon={<RamIcon />}
              label="RAM Allocated"
              value={`${totalRamGB} GB`}
              subtext={`${maxRamGB} GB total · ${ramPctUsed}% used`}
              trend="+512 MB"
              trendPositive={false}
              accentColor="#f59e0b"
            />
          </div>

          {/* ── Chart + Node health row ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: 14,
          }}>
            <ResourceChart usageData={MOCK_CPU_CHART} dailyData={MOCK_DAILY_CHART} />
            <NodeHealth nodes={MOCK_NODES} />
          </div>

          {/* ── Server list ── */}
          <ServerList
            servers={MOCK_SERVERS}
            onViewAll={() => setActiveNav('servers')}
            onOpenServer={id => console.log('Open server', id)}
          />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
