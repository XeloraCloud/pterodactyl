/**
 * Pterodactyl Premium Theme — NodeHealth Component
 * resources/scripts/theme/components/dashboard/NodeHealth.tsx
 */

import React from 'react';
import { colors } from '../../tokens';
import { Card, MiniBar, SectionHeader } from '../ui';
import type { MockNode } from '../../mockData';

interface NodeHealthProps {
  nodes: MockNode[];
}

const statusColors: Record<MockNode['status'], string> = {
  healthy:  colors.success,
  degraded: colors.warning,
  offline:  colors.danger,
};

/**
 * Compact node health card showing CPU + RAM bars per node.
 * Replace `nodes` prop with a real hook from Pterodactyl's node API.
 */
const NodeHealth: React.FC<NodeHealthProps> = ({ nodes }) => (
  <Card>
    <SectionHeader title="Node Health" />
    {nodes.map((node, i) => (
      <div key={node.id} style={{ marginBottom: i < nodes.length - 1 ? 18 : 0 }}>
        {/* Node header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 12.5, color: colors.text.primary, fontWeight: 500 }}>
              {node.name}
            </div>
            <div style={{ fontSize: 11, color: colors.text.dim, marginTop: 1 }}>
              {node.servers} server{node.servers !== 1 ? 's' : ''} · {node.fqdn}
            </div>
          </div>
          <span
            title={node.status}
            style={{
              width: 8, height: 8, borderRadius: '50%', marginTop: 4, flexShrink: 0,
              background: statusColors[node.status],
              boxShadow: `0 0 6px ${statusColors[node.status]}66`,
              display: 'inline-block',
            }}
          />
        </div>

        {/* Resource bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { label: 'CPU',  value: node.cpu,  color: colors.accent.violet },
            { label: 'RAM',  value: node.ram,  color: colors.accent.blue },
            { label: 'Disk', value: node.disk, color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div style={{ fontSize: 10.5, color: colors.text.dim, marginBottom: 3 }}>{label}</div>
              <MiniBar value={value} max={100} accentColor={color} />
            </div>
          ))}
        </div>
      </div>
    ))}
  </Card>
);

export default NodeHealth;
