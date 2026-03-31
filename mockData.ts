/**
 * Pterodactyl Premium Theme — Mock / Placeholder Data
 * resources/scripts/theme/mockData.ts
 *
 * Replace these with real API hooks from Pterodactyl's existing
 * store (resources/scripts/api/) once the UI is validated.
 */

export type ServerStatus = 'running' | 'offline' | 'starting' | 'stopping' | 'error';

export interface MockServer {
  id: number;
  uuid: string;
  name: string;
  node: string;
  status: ServerStatus;
  cpu: number;          // current %, 0-100
  ram: number;          // current MB
  maxRam: number;       // limit MB
  disk: number;         // current MB
  maxDisk: number;      // limit MB
  game: string;
  uptime: string;
  players?: string;
  ip: string;
  port: number;
}

export interface MockNode {
  id: number;
  name: string;
  fqdn: string;
  cpu: number;
  ram: number;
  disk: number;
  servers: number;
  status: 'healthy' | 'degraded' | 'offline';
}

export interface ChartPoint {
  time: string;
  cpu: number;
  ram: number;
}

export interface DailyPoint {
  day: string;
  servers: number;
  events: number;
}

// ─── Servers ────────────────────────────────────────────────────────────────

export const MOCK_SERVERS: MockServer[] = [
  {
    id: 1, uuid: 'a1b2c3d4',
    name: 'Minecraft Survival',
    node: 'Node US-East-01',
    status: 'running',
    cpu: 34, ram: 2048, maxRam: 4096,
    disk: 8192, maxDisk: 20480,
    game: 'Minecraft', uptime: '12d 4h',
    players: '18/50', ip: '10.0.0.1', port: 25565,
  },
  {
    id: 2, uuid: 'e5f6g7h8',
    name: 'CS2 Competitive',
    node: 'Node EU-West-02',
    status: 'running',
    cpu: 67, ram: 3200, maxRam: 8192,
    disk: 30720, maxDisk: 51200,
    game: 'CS2', uptime: '3d 7h',
    players: '10/10', ip: '10.0.0.2', port: 27015,
  },
  {
    id: 3, uuid: 'i9j0k1l2',
    name: 'ARK Survival Evolved',
    node: 'Node US-West-01',
    status: 'offline',
    cpu: 0, ram: 0, maxRam: 16384,
    disk: 61440, maxDisk: 102400,
    game: 'ARK', uptime: '—',
    ip: '10.0.0.3', port: 7777,
  },
  {
    id: 4, uuid: 'm3n4o5p6',
    name: 'Rust Modded',
    node: 'Node EU-Central-01',
    status: 'starting',
    cpu: 12, ram: 512, maxRam: 8192,
    disk: 20480, maxDisk: 40960,
    game: 'Rust', uptime: '0h 2m',
    players: '0/100', ip: '10.0.0.4', port: 28015,
  },
  {
    id: 5, uuid: 'q7r8s9t0',
    name: 'Valheim Co-op',
    node: 'Node US-East-01',
    status: 'running',
    cpu: 22, ram: 1800, maxRam: 4096,
    disk: 4096, maxDisk: 10240,
    game: 'Valheim', uptime: '6d 11h',
    players: '4/10', ip: '10.0.0.5', port: 2456,
  },
  {
    id: 6, uuid: 'u1v2w3x4',
    name: 'Terraria Server',
    node: 'Node EU-West-02',
    status: 'running',
    cpu: 8, ram: 512, maxRam: 1024,
    disk: 1024, maxDisk: 5120,
    game: 'Terraria', uptime: '21d 0h',
    players: '2/8', ip: '10.0.0.6', port: 7777,
  },
];

// ─── Nodes ──────────────────────────────────────────────────────────────────

export const MOCK_NODES: MockNode[] = [
  { id: 1, name: 'US-East-01', fqdn: 'node1.us-east.example.com', cpu: 42, ram: 58, disk: 34, servers: 2, status: 'healthy' },
  { id: 2, name: 'EU-West-02', fqdn: 'node2.eu-west.example.com', cpu: 67, ram: 74, disk: 61, servers: 3, status: 'degraded' },
  { id: 3, name: 'US-West-01', fqdn: 'node3.us-west.example.com', cpu: 8,  ram: 12, disk: 60, servers: 1, status: 'healthy' },
];

// ─── Chart data ──────────────────────────────────────────────────────────────

export const MOCK_CPU_CHART: ChartPoint[] = [
  { time: '00:00', cpu: 28, ram: 41 },
  { time: '04:00', cpu: 35, ram: 43 },
  { time: '08:00', cpu: 52, ram: 48 },
  { time: '12:00', cpu: 71, ram: 62 },
  { time: '16:00', cpu: 64, ram: 58 },
  { time: '20:00', cpu: 48, ram: 51 },
  { time: 'Now',   cpu: 42, ram: 54 },
];

export const MOCK_DAILY_CHART: DailyPoint[] = [
  { day: 'Mon', servers: 4, events: 12 },
  { day: 'Tue', servers: 5, events: 8  },
  { day: 'Wed', servers: 5, events: 21 },
  { day: 'Thu', servers: 6, events: 16 },
  { day: 'Fri', servers: 6, events: 30 },
  { day: 'Sat', servers: 6, events: 11 },
  { day: 'Sun', servers: 6, events: 7  },
];

// ─── Derived stats ───────────────────────────────────────────────────────────

export const getDashboardStats = () => {
  const total    = MOCK_SERVERS.length;
  const running  = MOCK_SERVERS.filter(s => s.status === 'running').length;
  const avgCpu   = Math.round(MOCK_SERVERS.filter(s => s.status === 'running').reduce((a, s) => a + s.cpu, 0) / running);
  const totalRam = MOCK_SERVERS.reduce((a, s) => a + s.ram, 0);
  const maxRam   = MOCK_SERVERS.reduce((a, s) => a + s.maxRam, 0);

  return { total, running, avgCpu, totalRam, maxRam };
};
