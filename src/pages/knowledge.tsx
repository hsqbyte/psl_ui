import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useI18n } from '@/shared/i18n'

type EdgeType = 'depends_on' | 'extends' | 'related_to'

interface KNode { name: string; x: number; y: number }
interface KEdge { from: string; to: string; type: EdgeType }

const NODES: KNode[] = [
  { name: 'Ethernet', x: 100, y: 80 },
  { name: 'IPv4', x: 250, y: 80 },
  { name: 'IPv6', x: 400, y: 80 },
  { name: 'TCP', x: 180, y: 180 },
  { name: 'UDP', x: 350, y: 180 },
  { name: 'TLS', x: 100, y: 280 },
  { name: 'HTTP', x: 250, y: 280 },
  { name: 'HTTP2', x: 400, y: 280 },
  { name: 'DNS', x: 500, y: 180 },
  { name: 'MQTT', x: 550, y: 280 },
  { name: 'WebSocket', x: 100, y: 380 },
  { name: 'CoAP', x: 500, y: 380 },
]

const EDGES: KEdge[] = [
  { from: 'IPv4', to: 'Ethernet', type: 'depends_on' },
  { from: 'IPv6', to: 'Ethernet', type: 'depends_on' },
  { from: 'TCP', to: 'IPv4', type: 'depends_on' },
  { from: 'UDP', to: 'IPv4', type: 'depends_on' },
  { from: 'TLS', to: 'TCP', type: 'depends_on' },
  { from: 'HTTP', to: 'TCP', type: 'depends_on' },
  { from: 'HTTP2', to: 'HTTP', type: 'extends' },
  { from: 'DNS', to: 'UDP', type: 'depends_on' },
  { from: 'MQTT', to: 'TCP', type: 'depends_on' },
  { from: 'WebSocket', to: 'HTTP', type: 'extends' },
  { from: 'CoAP', to: 'UDP', type: 'depends_on' },
  { from: 'IPv6', to: 'IPv4', type: 'related_to' },
  { from: 'HTTP2', to: 'TLS', type: 'related_to' },
]

const EDGE_COLORS: Record<EdgeType, string> = { depends_on: '#3b82f6', extends: '#22c55e', related_to: '#a855f7' }
const EDGE_DASH: Record<EdgeType, string> = { depends_on: '', extends: '6,3', related_to: '3,3' }

export function Knowledge() {
  const { t } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.name, n]))

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('knowledgeTitle')}</h2>
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-blue-500 inline-block" /> depends_on</span>
        <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-green-500 inline-block" style={{ borderTop: '2px dashed' }} /> extends</span>
        <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-purple-500 inline-block" style={{ borderTop: '2px dotted' }} /> related_to</span>
      </div>
      <Card>
        <CardHeader><CardTitle>{t('knowledgeTitle')}</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <svg width={650} height={440} className="min-w-[650px]">
            <defs>
              <marker id="karrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-muted-foreground" /></marker>
            </defs>
            {EDGES.map((e, i) => {
              const from = nodeMap[e.from]
              const to = nodeMap[e.to]
              if (!from || !to) return null
              const active = hovered ? (hovered === e.from || hovered === e.to) : true
              return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={EDGE_COLORS[e.type]} strokeWidth={active ? 2 : 1} strokeDasharray={EDGE_DASH[e.type]} opacity={active ? 0.8 : 0.15} markerEnd="url(#karrow)" />
            })}
            {NODES.map((n) => (
              <g key={n.name} onMouseEnter={() => setHovered(n.name)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                <circle cx={n.x} cy={n.y} r={24} className={`${hovered === n.name ? 'fill-primary' : 'fill-muted'} stroke-border`} strokeWidth={1.5} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className={`text-[9px] font-medium ${hovered === n.name ? 'fill-primary-foreground' : 'fill-foreground'}`}>{n.name}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
