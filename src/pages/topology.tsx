import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

const nodes = [
  { id: 'client', x: 80, y: 100, label: 'Client' },
  { id: 'lb', x: 250, y: 50, label: 'Load Balancer' },
  { id: 'srv1', x: 420, y: 30, label: 'Server 1' },
  { id: 'srv2', x: 420, y: 100, label: 'Server 2' },
  { id: 'db', x: 420, y: 180, label: 'Database' },
]

const links = [
  ['client', 'lb'], ['lb', 'srv1'], ['lb', 'srv2'], ['srv1', 'db'], ['srv2', 'db'],
]

export function Topology() {
  const { t } = useI18n()
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('topologyTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Network Topology</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="540" height="240" className="font-sans">
            {links.map(([a, b], i) => (
              <line key={i} x1={nodeMap[a].x} y1={nodeMap[a].y} x2={nodeMap[b].x} y2={nodeMap[b].y} stroke="currentColor" strokeWidth="2" opacity={0.3} />
            ))}
            {nodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="22" fill="hsl(var(--primary))" opacity={0.85} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{n.label}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
