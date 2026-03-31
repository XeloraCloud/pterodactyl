/**
 * Pterodactyl Premium Theme — ServerList Component
 * resources/scripts/theme/components/dashboard/ServerList.tsx
 *
 * Shows a table-style list of servers with status, resource usage bars,
 * and quick-access actions. Replace MOCK_SERVERS with a real API hook
 * (e.g. useServerList from resources/scripts/api/) when integrating.
 */

import React, { useState } from 'react';
import { colors } from '../../tokens';
import { Card, StatusBadge, MiniBar, Button, SectionHeader } from '../ui';
import type { MockServer } from '../../mockData';

// ─── Column header ────────────────────────────────────────────────────────────

const ColHead: React.FC<{ label: string; flex?: string | number }> = ({ label, flex = 1 }) => (
  <div
    style={{
      flex, fontSize: 11, fontWeight: 600,
      color: colors.text.dim,
      textTransform: 'uppercase', letterSpacing: '0.06em',
    }}
  >
    {label}
  </div>
);

// ─── Server row ──────────────────────────────────────────────────────────────

interface ServerRowProps {
  server: MockServer;
  onOpen?: (id: number) => void;
}

const ServerRow: React.FC<ServerRowProps> = ({ server, onOpen }) => {
  const [hovered, setHovered] = useState(false);
  const ramGB = server.ram ? `${(server.ram / 1024).toFixed(1)} GB` : '—';

  return (
    <div
      onClick={() => onOpen?.(server.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,.03)' : 'transparent',
        transition: 'background .15s',
      }}
    >
      {/* Name + node */}
      <div style={{ flex: 1.4, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: colors.text.primary, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {server.name}
        </div>
        <div style={{ fontSize: 11, color: colors.text.dim, marginTop: 2 }}>
          {server.node} · {server.ip}:{server.port}
        </div>
      </div>

      {/* Status */}
      <div style={{ flex: '0 0 100px' }}>
        <StatusBadge status={server.status} />
      </div>

      {/* CPU */}
      <div style={{ flex: '0 0 90px' }}>
        {server.status === 'offline' ? (
          <span style={{ color: colors.text.dim, fontSize: 12 }}>—</span>
        ) : (
          <>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: server.cpu > 80 ? '#f87171' : server.cpu > 60 ? '#fbbf24' : colors.text.secondary,
            }}>
              {server.cpu}%
            </span>
            <MiniBar value={server.cpu} max={100} showLabel={false} style={{ marginTop: 4 }} />
          </>
        )}
      </div>

      {/* RAM */}
      <div style={{ flex: '0 0 90px' }}>
        {server.status === 'offline' ? (
          <span style={{ color: colors.text.dim, fontSize: 12 }}>—</span>
        ) : (
          <>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: colors.text.secondary }}>
              {ramGB}
            </span>
            <MiniBar value={server.ram} max={server.maxRam} accentColor={colors.accent.blue} showLabel={false} style={{ marginTop: 4 }} />
          </>
        )}
      </div>

      {/* Uptime */}
      <div style={{ flex: '0 0 80px', textAlign: 'right' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11.5, color: colors.text.dim,
        }}>
          {server.uptime}
        </span>
        {hovered && (
          <div style={{ marginTop: 3, fontSize: 10.5, color: colors.accent.violetLight, opacity: 0.9 }}>
            Open ↗
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ServerList ───────────────────────────────────────────────────────────────

interface ServerListProps {
  servers: MockServer[];
  onViewAll?: () => void;
  onOpenServer?: (id: number) => void;
  maxRows?: number;
}

/**
 * Server list preview card for the dashboard.
 *
 * Swap `servers` prop for real data from your API hook:
 *   const { servers } = useServerList();
 *   <ServerList servers={servers} onViewAll={() => navigate('/admin/servers')} />
 */
const ServerList: React.FC<ServerListProps> = ({
  servers,
  onViewAll,
  onOpenServer,
  maxRows = 6,
}) => {
  const visible = servers.slice(0, maxRows);

  return (
    <Card style={{ padding: '18px 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 20px 14px' }}>
        <SectionHeader
          title="Recent Servers"
          subtitle={`${servers.length} servers total`}
          action={
            <Button variant="accent" size="sm" onClick={onViewAll}>
              View all →
            </Button>
          }
        />
      </div>

      {/* Column headers */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '5px 16px 10px',
        borderBottom: `1px solid ${colors.border.default}`,
        marginBottom: 4,
      }}>
        <ColHead label="Name" flex={1.4} />
        <ColHead label="Status" flex="0 0 100px" />
        <ColHead label="CPU" flex="0 0 90px" />
        <ColHead label="RAM" flex="0 0 90px" />
        <ColHead label="Uptime" flex="0 0 80px" />
      </div>

      {/* Rows */}
      <div style={{ padding: '0 10px 4px' }}>
        {visible.map(server => (
          <ServerRow key={server.id} server={server} onOpen={onOpenServer} />
        ))}
      </div>

      {servers.length > maxRows && (
        <div style={{
          textAlign: 'center',
          padding: '10px 0 4px',
          fontSize: 12,
          color: colors.text.dim,
          borderTop: `1px solid ${colors.border.default}`,
          marginTop: 8,
        }}>
          +{servers.length - maxRows} more servers
        </div>
      )}
    </Card>
  );
};

export default ServerList;
