import { useMemo } from 'react';

const mockApps = [
  { id: '1', name: 'Investor Portal', status: 'Live', lastScan: '2026-03-08', nextScan: '2026-03-15', uptime: [99, 98, 100, 97, 99] },
  { id: '2', name: 'Lead Gen App', status: 'Error', lastScan: '2026-03-07', nextScan: '2026-03-14', uptime: [94, 92, 95, 88, 93] },
  { id: '3', name: 'Client Dashboard', status: 'Fixing', lastScan: '2026-03-09', nextScan: '2026-03-16', uptime: [97, 96, 95, 97, 98] }
];

const statusClasses = {
  Live: 'bg-green-500/20 text-green-300',
  Error: 'bg-red-500/20 text-red-300',
  Fixing: 'bg-yellow-500/20 text-yellow-300'
};

export default function DashboardPage() {
  const apps = useMemo(() => mockApps, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-accent">Your Hosted Apps</h1>
        <button className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-black">WhatsApp Notifications: ON</button>
      </div>
      <div className="grid gap-4">
        {apps.map((app) => (
          <div key={app.id} className="rounded-xl border border-accent/20 bg-panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl">{app.name}</h2>
              <span className={`rounded-full px-3 py-1 text-xs ${statusClasses[app.status]}`}>{app.status}</span>
            </div>
            <p className="mt-2 text-sm text-muted">Last scan: {app.lastScan} | Next scan: {app.nextScan}</p>
            <div className="mt-3 flex items-end gap-1">
              {app.uptime.map((u, i) => (
                <div key={i} className="w-8 bg-accent/40" style={{ height: `${u}px` }} title={`${u}% uptime`} />
              ))}
            </div>
            <button className="mt-4 rounded-lg border border-accent px-4 py-2 text-sm text-accent">Request Fix</button>
          </div>
        ))}
      </div>
    </div>
  );
}
