import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const predictions = [
  { metric: 'Traffic Volume', current: '2.4 Gbps', predicted: '3.1 Gbps', timeframe: '7 days', trend: 'up' },
  { metric: 'CPU Capacity', current: '65%', predicted: '82%', timeframe: '30 days', trend: 'up' },
  { metric: 'Storage', current: '48 GB', predicted: '55 GB', timeframe: '30 days', trend: 'up' },
  { metric: 'Error Rate', current: '0.08%', predicted: '0.05%', timeframe: '7 days', trend: 'down' },
]
const alerts = [
  { msg: 'CPU capacity may exceed 80% in 3 weeks', severity: 'warn' },
  { msg: 'Storage upgrade recommended within 60 days', severity: 'info' },
  { msg: 'Traffic peak expected on weekends', severity: 'info' },
]

export function Predictive() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('predictiveTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {predictions.map((p) => (
          <Card key={p.metric}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-xs text-muted-foreground">{p.metric}</div>
              <div className="text-lg font-bold">{p.current} → {p.predicted}</div>
              <Badge variant={p.trend === 'up' ? 'secondary' : 'default'}>{p.trend} in {p.timeframe}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Predictive Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <Badge variant={a.severity === 'warn' ? 'secondary' : 'outline'}>{a.severity}</Badge>
              <span>{a.msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
