import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

const states = [
  { id: 'CLOSED', x: 80, y: 40 },
  { id: 'LISTEN', x: 250, y: 40 },
  { id: 'SYN_SENT', x: 80, y: 140 },
  { id: 'SYN_RCVD', x: 250, y: 140 },
  { id: 'ESTABLISHED', x: 165, y: 230 },
]

const transitions = [
  { from: 'CLOSED', to: 'LISTEN', label: 'open' },
  { from: 'CLOSED', to: 'SYN_SENT', label: 'send SYN' },
  { from: 'LISTEN', to: 'SYN_RCVD', label: 'recv SYN' },
  { from: 'SYN_SENT', to: 'ESTABLISHED', label: 'recv ACK' },
  { from: 'SYN_RCVD', to: 'ESTABLISHED', label: 'recv ACK' },
]

export function StateMachine() {
  const { t } = useI18n()
  const sMap = Object.fromEntries(states.map((s) => [s.id, s]))
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('stateMachineTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>TCP State Machine</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="380" height="290" className="font-sans">
            {transitions.map((tr, i) => {
              const f = sMap[tr.from], to = sMap[tr.to]
              const mx = (f.x + to.x) / 2, my = (f.y + to.y) / 2
              return (
                <g key={i}>
                  <line x1={f.x} y1={f.y} x2={to.x} y2={to.y} stroke="currentColor" strokeWidth="1.5" opacity={0.3} markerEnd="url(#arrow)" />
                  <text x={mx} y={my - 5} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.6}>{tr.label}</text>
                </g>
              )
            })}
            <defs><marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="currentColor" opacity={0.4} /></marker></defs>
            {states.map((s) => (
              <g key={s.id}>
                <ellipse cx={s.x} cy={s.y} rx="55" ry="22" fill="hsl(var(--primary))" opacity={0.8} />
                <text x={s.x} y={s.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{s.id}</text>
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
