import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const errors = [
  { type: 'Parse Error', count: 42, trend: 'down', severity: 'high' },
  { type: 'Validation Error', count: 28, trend: 'up', severity: 'medium' },
  { type: 'Timeout', count: 15, trend: 'stable', severity: 'low' },
  { type: 'Connection Reset', count: 8, trend: 'down', severity: 'high' },
  { type: 'Checksum Mismatch', count: 5, trend: 'up', severity: 'medium' },
]

const recent = [
  { ts: '14:30:01', type: 'Parse Error', protocol: 'HTTP', msg: 'Unexpected header format' },
  { ts: '14:28:15', type: 'Timeout', protocol: 'TCP', msg: 'Connection timeout after 30s' },
  { ts: '14:25:00', type: 'Validation Error', protocol: 'DNS', msg: 'Invalid record type' },
  { ts: '14:22:30', type: 'Checksum Mismatch', protocol: 'UDP', msg: 'Checksum verification failed' },
]

const sevColor: Record<string, string> = { high: 'destructive', medium: 'secondary', low: 'outline' }

export function ErrorDashboard() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('errorDashboardTitle')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {errors.map((e) => (
          <Card key={e.type}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{e.count}</div>
              <div className="text-xs">{e.type}</div>
              <Badge variant={sevColor[e.severity] as 'destructive' | 'secondary' | 'outline'}>{e.severity}</Badge>
              <div className="text-xs text-muted-foreground">{e.trend === 'up' ? '↑' : e.trend === 'down' ? '↓' : '→'}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Errors</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Time</th><th className="text-left py-2">Type</th><th className="text-left py-2">Protocol</th><th className="text-left py-2">Message</th></tr></thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 text-xs">{r.ts}</td>
                  <td className="py-2"><Badge variant="secondary">{r.type}</Badge></td>
                  <td className="py-2"><Badge variant="outline">{r.protocol}</Badge></td>
                  <td className="py-2 text-muted-foreground">{r.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
