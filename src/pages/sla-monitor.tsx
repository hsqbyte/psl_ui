import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const slas = [
  { name: 'API Uptime', target: '99.9%', actual: '99.95%', status: 'met' },
  { name: 'Response Time', target: '<200ms', actual: '145ms', status: 'met' },
  { name: 'Error Rate', target: '<0.1%', actual: '0.08%', status: 'met' },
  { name: 'Throughput', target: '>1000 rps', actual: '850 rps', status: 'breach' },
]
const incidents = [
  { ts: '2024-01-14 03:00', duration: '15m', sla: 'API Uptime', desc: 'Partial outage' },
  { ts: '2024-01-10 12:30', duration: '5m', sla: 'Response Time', desc: 'Latency spike' },
]

export function SlaMonitor() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('slaMonitorTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {slas.map((s) => (
          <Card key={s.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-lg font-bold">{s.actual}</div>
              <div className="text-xs text-muted-foreground">Target: {s.target}</div>
              <div className="text-xs">{s.name}</div>
              <Badge variant={s.status === 'met' ? 'default' : 'destructive'}>{s.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Incidents</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {incidents.map((inc, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="text-xs text-muted-foreground">{inc.ts}</span>
              <Badge variant="outline">{inc.duration}</Badge>
              <Badge variant="secondary">{inc.sla}</Badge>
              <span>{inc.desc}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
