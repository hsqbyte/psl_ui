import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const steps = ['Client', 'Router', 'Firewall', 'Server']

export function PacketFlow() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('packetFlowTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Packet Flow Animation</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="520" height="120" className="font-sans">
            {steps.map((s, i) => (
              <g key={s}>
                <rect x={i * 130 + 10} y="40" width="100" height="40" rx="8" fill="hsl(var(--primary))" opacity={0.8} />
                <text x={i * 130 + 60} y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{s}</text>
              </g>
            ))}
            {steps.slice(0, -1).map((_, i) => (
              <g key={i}>
                <line x1={i * 130 + 110} y1="60" x2={(i + 1) * 130 + 10} y2="60" stroke="currentColor" strokeWidth="2" opacity={0.3} />
                <circle r="5" fill="hsl(var(--primary))">
                  <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
                    <mpath xlinkHref={`#path-${i}`} />
                  </animateMotion>
                </circle>
                <path id={`path-${i}`} d={`M${i * 130 + 110},60 L${(i + 1) * 130 + 10},60`} fill="none" />
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
      <div className="flex gap-2 justify-center">
        {['SYN', 'SYN-ACK', 'ACK', 'DATA', 'FIN'].map((p) => (
          <Badge key={p} variant="outline">{p}</Badge>
        ))}
      </div>
    </div>
  )
}
