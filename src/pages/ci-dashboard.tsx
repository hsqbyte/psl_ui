import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const builds = [
  { id: 120, branch: 'main', status: 'pass', duration: '2m 14s', date: '2025-01-15' },
  { id: 119, branch: 'feat/quic', status: 'fail', duration: '1m 48s', date: '2025-01-15' },
  { id: 118, branch: 'main', status: 'pass', duration: '2m 08s', date: '2025-01-14' },
  { id: 117, branch: 'fix/tcp-flags', status: 'pass', duration: '2m 22s', date: '2025-01-14' },
]

const tests = { total: 342, passed: 338, failed: 3, skipped: 1 }

const deploys = [
  { env: 'production', version: 'v1.0.0', date: '2025-01-10', status: 'success' },
  { env: 'staging', version: 'v1.1.0-rc1', date: '2025-01-15', status: 'success' },
]

export function CiDashboard() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('ciDashboardTitle')}</h2>
      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="pt-4 text-center"><div className="text-2xl font-bold">{tests.total}</div><div className="text-xs text-muted-foreground">Total</div></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><div className="text-2xl font-bold text-green-600">{tests.passed}</div><div className="text-xs text-muted-foreground">Passed</div></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><div className="text-2xl font-bold text-red-600">{tests.failed}</div><div className="text-xs text-muted-foreground">Failed</div></CardContent></Card>
        <Card><CardContent className="pt-4 text-center"><div className="text-2xl font-bold text-yellow-600">{tests.skipped}</div><div className="text-xs text-muted-foreground">Skipped</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Builds</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {builds.map((b) => (
            <div key={b.id} className="flex items-center gap-2 text-sm">
              <Badge variant={b.status === 'pass' ? 'default' : 'destructive'}>#{b.id}</Badge>
              <span className="font-mono text-xs">{b.branch}</span>
              <span className="flex-1" />
              <span className="text-muted-foreground text-xs">{b.duration}</span>
              <span className="text-muted-foreground text-xs">{b.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Deployments</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {deploys.map((d) => (
            <div key={d.env} className="flex items-center gap-2 text-sm">
              <Badge variant="outline">{d.env}</Badge><span className="font-mono text-xs">{d.version}</span>
              <span className="flex-1" /><span className="text-muted-foreground text-xs">{d.date}</span>
              <Badge>{d.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
