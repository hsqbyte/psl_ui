import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const cards = [
  { title: 'Total Protocols', value: '247', icon: '📋', change: '+12' },
  { title: 'Active Users', value: '1,892', icon: '👥', change: '+156' },
  { title: 'API Calls (24h)', value: '2.4M', icon: '🔌', change: '+18%' },
  { title: 'Uptime', value: '99.97%', icon: '✅', change: 'SLA met' },
  { title: 'Tenants', value: '24', icon: '🏢', change: '+3' },
  { title: 'Storage Used', value: '48 GB', icon: '💾', change: '+2.1 GB' },
]
const alerts = [
  { msg: 'Throughput SLA breach on tenant Acme', severity: 'high' },
  { msg: 'Storage quota 90% for tenant DevLab', severity: 'medium' },
  { msg: 'Certificate expiring in 14 days', severity: 'low' },
]

export function EnterpriseDashboard() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('enterpriseDashboardTitle')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardContent className="pt-4 flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="text-2xl font-bold">{c.value}</div>
                <div className="text-xs text-muted-foreground">{c.title}</div>
              </div>
              <Badge variant="secondary" className="ml-auto">{c.change}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <Badge variant={a.severity === 'high' ? 'destructive' : a.severity === 'medium' ? 'secondary' : 'outline'}>{a.severity}</Badge>
              <span>{a.msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
