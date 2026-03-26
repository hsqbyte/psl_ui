import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const metrics = [
  { name: 'Parse Time', value: '0.8ms', target: '<2ms', status: 'good' },
  { name: 'Encode Time', value: '1.2ms', target: '<2ms', status: 'good' },
  { name: 'Memory Usage', value: '12 MB', target: '<50 MB', status: 'good' },
  { name: 'Bundle Size', value: '245 KB', target: '<500 KB', status: 'good' },
  { name: 'First Paint', value: '1.8s', target: '<1.5s', status: 'warn' },
  { name: 'TTI', value: '2.4s', target: '<3s', status: 'good' },
]
const tips = [
  { tip: 'Enable lazy loading for protocol pages', impact: 'high' },
  { tip: 'Cache parsed protocol definitions', impact: 'medium' },
  { tip: 'Use Web Workers for heavy computations', impact: 'high' },
  { tip: 'Compress API responses with gzip', impact: 'low' },
]

export function Performance() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('performanceTitle')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-xl font-bold">{m.value}</div>
              <div className="text-xs">{m.name}</div>
              <div className="text-xs text-muted-foreground">Target: {m.target}</div>
              <Badge variant={m.status === 'good' ? 'default' : 'secondary'}>{m.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Optimization Tips</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {tips.map((t) => (
            <div key={t.tip} className="flex justify-between text-sm">
              <span>{t.tip}</span>
              <Badge variant={t.impact === 'high' ? 'default' : t.impact === 'medium' ? 'secondary' : 'outline'}>{t.impact}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
