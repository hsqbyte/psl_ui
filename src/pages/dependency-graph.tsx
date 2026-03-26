import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { protocols } from '@/entities/protocol/model'
import { useI18n } from '@/shared/i18n'

const LAYER_Y: Record<string, number> = { link: 60, network: 160, transport: 260, application: 360 }

export function DependencyGraph() {
  const { t } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)

  const nodes = protocols.map((p) => {
    const layerProtos = protocols.filter((pp) => pp.layer === p.layer)
    const idx = layerProtos.indexOf(p)
    const x = 80 + idx * 120
    const y = LAYER_Y[p.layer] ?? 360
    return { ...p, x, y }
  })

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.name, n]))

  const edges = nodes.flatMap((n) =>
    n.dependsOn.filter((d) => nodeMap[d]).map((d) => ({ from: nodeMap[d], to: n }))
  )

  const maxX = Math.max(...nodes.map((n) => n.x)) + 100
  const maxY = Math.max(...nodes.map((n) => n.y)) + 60

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('graphTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>{t('dependsOn')}</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <svg width={Math.max(maxX, 800)} height={maxY + 20} className="min-w-[800px]">
            <defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" className="text-muted-foreground" /></marker></defs>
            {edges.map((e, i) => (
              <line key={i} x1={e.from.x} y1={e.from.y + 12} x2={e.to.x} y2={e.to.y - 12} stroke="currentColor" className="text-muted-foreground" strokeWidth={1} markerEnd="url(#arrow)" opacity={hovered ? (hovered === e.from.name || hovered === e.to.name ? 1 : 0.15) : 0.4} />
            ))}
            {nodes.map((n) => (
              <g key={n.name} onMouseEnter={() => setHovered(n.name)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
                <rect x={n.x - 40} y={n.y - 14} width={80} height={28} rx={6} className={`${hovered === n.name ? 'fill-primary' : 'fill-muted'} stroke-border`} strokeWidth={1} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" className={`text-[10px] ${hovered === n.name ? 'fill-primary-foreground' : 'fill-foreground'}`}>{n.name}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
