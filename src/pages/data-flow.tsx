import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

const nodes = [
  { label: 'Input', x: 40, y: 80 },
  { label: 'Parser', x: 180, y: 40 },
  { label: 'Validator', x: 180, y: 120 },
  { label: 'Encoder', x: 320, y: 80 },
  { label: 'Output', x: 460, y: 80 },
]

const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]]

export function DataFlow() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('dataFlowTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Data Flow Diagram</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="540" height="180" className="font-sans">
            <defs><marker id="df-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="currentColor" opacity={0.4} /></marker></defs>
            {edges.map(([a, b], i) => (
              <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="currentColor" strokeWidth="2" opacity={0.3} markerEnd="url(#df-arrow)" />
            ))}
            {nodes.map((n, i) => (
              <g key={i}>
                <rect x={n.x - 40} y={n.y - 18} width="80" height="36" rx="6" fill="hsl(var(--primary))" opacity={0.8} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{n.label}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
