import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExportButton } from '@/components/export-button'
import { useI18n } from '@/i18n'

interface Message {
  from: string
  to: string
  label: string
  color?: string
}

interface Scenario {
  name: string
  actors: string[]
  messages: Message[]
}

const SCENARIOS: Scenario[] = [
  {
    name: 'TCP Handshake',
    actors: ['Client', 'Server'],
    messages: [
      { from: 'Client', to: 'Server', label: 'SYN (seq=x)', color: '#3b82f6' },
      { from: 'Server', to: 'Client', label: 'SYN-ACK (seq=y, ack=x+1)', color: '#22c55e' },
      { from: 'Client', to: 'Server', label: 'ACK (ack=y+1)', color: '#3b82f6' },
    ],
  },
  {
    name: 'HTTP Request',
    actors: ['Client', 'Server'],
    messages: [
      { from: 'Client', to: 'Server', label: 'SYN', color: '#94a3b8' },
      { from: 'Server', to: 'Client', label: 'SYN-ACK', color: '#94a3b8' },
      { from: 'Client', to: 'Server', label: 'ACK', color: '#94a3b8' },
      { from: 'Client', to: 'Server', label: 'GET / HTTP/1.1', color: '#3b82f6' },
      { from: 'Server', to: 'Client', label: 'HTTP/1.1 200 OK', color: '#22c55e' },
      { from: 'Client', to: 'Server', label: 'FIN', color: '#ef4444' },
      { from: 'Server', to: 'Client', label: 'FIN-ACK', color: '#ef4444' },
    ],
  },
]

export function Sequence() {
  const { t } = useI18n()
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const scenario = SCENARIOS[scenarioIdx]

  const ACTOR_WIDTH = 120
  const ACTOR_GAP = 200
  const MSG_HEIGHT = 50
  const TOP_MARGIN = 60
  const PADDING = 40

  const svgWidth = PADDING * 2 + (scenario.actors.length - 1) * ACTOR_GAP + ACTOR_WIDTH
  const svgHeight = TOP_MARGIN + scenario.messages.length * MSG_HEIGHT + 60

  const actorX = (name: string) => {
    const idx = scenario.actors.indexOf(name)
    return PADDING + ACTOR_WIDTH / 2 + idx * ACTOR_GAP
  }

  return (
    <div className="space-y-6" id="sequence-diagram">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('sequenceTitle')}</h2>
        <div className="flex items-center gap-2">
          <ExportButton targetId="sequence-diagram" />
        </div>
        <div className="flex gap-2">
          {SCENARIOS.map((s, i) => (
            <Button key={s.name} size="sm" variant={scenarioIdx === i ? 'default' : 'outline'} onClick={() => setScenarioIdx(i)}>
              {s.name}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>{scenario.name}</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <svg width={svgWidth} height={svgHeight} className="mx-auto">
            {/* Actor boxes */}
            {scenario.actors.map((actor) => {
              const x = actorX(actor)
              return (
                <g key={actor}>
                  <rect
                    x={x - ACTOR_WIDTH / 2} y={10}
                    width={ACTOR_WIDTH} height={36}
                    rx={6}
                    className="fill-primary/10 stroke-primary"
                    strokeWidth={1.5}
                  />
                  <text x={x} y={33} textAnchor="middle" className="fill-foreground text-sm font-semibold">
                    {actor}
                  </text>
                  {/* Lifeline */}
                  <line
                    x1={x} y1={46} x2={x} y2={svgHeight - 10}
                    className="stroke-muted-foreground/40"
                    strokeWidth={1}
                    strokeDasharray="4 3"
                  />
                </g>
              )
            })}

            {/* Messages */}
            {scenario.messages.map((msg, i) => {
              const fromX = actorX(msg.from)
              const toX = actorX(msg.to)
              const y = TOP_MARGIN + i * MSG_HEIGHT
              const isLeftToRight = fromX < toX
              const arrowX = toX + (isLeftToRight ? -8 : 8)

              return (
                <g key={i}>
                  <line
                    x1={fromX} y1={y} x2={toX} y2={y}
                    stroke={msg.color || '#64748b'}
                    strokeWidth={1.5}
                    markerEnd="url(#arrowhead)"
                  />
                  {/* Arrowhead */}
                  <polygon
                    points={isLeftToRight
                      ? `${toX},${y} ${arrowX},${y - 4} ${arrowX},${y + 4}`
                      : `${toX},${y} ${arrowX},${y - 4} ${arrowX},${y + 4}`
                    }
                    fill={msg.color || '#64748b'}
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="fill-foreground text-xs"
                  >
                    {msg.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
