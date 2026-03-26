import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const metrics = [
  { label: 'Daily Active Users', value: '1,234', change: '+12%' },
  { label: 'Avg Session', value: '8m 32s', change: '+5%' },
  { label: 'Page Views', value: '45,678', change: '-3%' },
  { label: 'Bounce Rate', value: '24%', change: '-8%' },
]
const funnel = [
  { step: 'Visit Homepage', users: 5000, pct: 100 },
  { step: 'Browse Protocols', users: 3200, pct: 64 },
  { step: 'View Detail', users: 1800, pct: 36 },
  { step: 'Use Playground', users: 600, pct: 12 },
  { step: 'Export/Share', users: 200, pct: 4 },
]

export function UsageAnalytics() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('usageAnalyticsTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{m.value}</div>
              <div className="text-xs">{m.label}</div>
              <Badge variant={m.change.startsWith('+') ? 'default' : 'secondary'}>{m.change}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>User Funnel</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {funnel.map((f) => (
            <div key={f.step} className="space-y-1">
              <div className="flex justify-between text-sm"><span>{f.step}</span><span>{f.users} ({f.pct}%)</span></div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${f.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
