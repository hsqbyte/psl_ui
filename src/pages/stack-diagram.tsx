import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useI18n } from '@/shared/i18n'

const layers = [
  { name: 'HTTP', color: '#3b82f6', y: 20 },
  { name: 'TLS', color: '#8b5cf6', y: 80 },
  { name: 'TCP', color: '#10b981', y: 140 },
  { name: 'IPv4', color: '#f59e0b', y: 200 },
  { name: 'Ethernet', color: '#ef4444', y: 260 },
]

export function StackDiagram() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('stackDiagramTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Protocol Stack</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="400" height="340" className="font-sans">
            {layers.map((l) => (
              <g key={l.name}>
                <rect x="50" y={l.y} width="300" height="50" rx="8" fill={l.color} opacity={0.85} />
                <text x="200" y={l.y + 30} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{l.name}</text>
              </g>
            ))}
            {layers.slice(0, -1).map((_, i) => (
              <line key={i} x1="200" y1={layers[i].y + 50} x2="200" y2={layers[i + 1].y} stroke="currentColor" strokeWidth="2" strokeDasharray="4" opacity={0.4} />
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
