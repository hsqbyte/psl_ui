import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const rules = [
  { path: '/api/users', method: 'GET', status: 200, delay: '50ms' },
  { path: '/api/auth', method: 'POST', status: 401, delay: '100ms' },
  { path: '/api/data', method: 'GET', status: 500, delay: '200ms' },
]
const logs = [
  { ts: '14:30:01', method: 'GET', path: '/api/users', status: 200 },
  { ts: '14:30:05', method: 'POST', path: '/api/auth', status: 401 },
  { ts: '14:30:08', method: 'GET', path: '/api/data', status: 500 },
]

export function MockServer() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('mockServerTitle')}</h2>
      <div className="flex gap-2">
        <Badge variant="default" className="cursor-pointer px-3 py-1">▶ Start</Badge>
        <Badge variant="secondary" className="cursor-pointer px-3 py-1">⏹ Stop</Badge>
      </div>
      <Card>
        <CardHeader><CardTitle>Mock Rules</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Path</th><th className="text-left py-2">Method</th><th className="text-left py-2">Status</th><th className="text-left py-2">Delay</th></tr></thead>
            <tbody>{rules.map((r, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2 font-mono text-xs">{r.path}</td>
                <td className="py-2"><Badge variant="outline">{r.method}</Badge></td>
                <td className="py-2">{r.status}</td><td className="py-2">{r.delay}</td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Request Log</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {logs.map((l, i) => (
            <div key={i} className="flex gap-3 text-xs font-mono">
              <span className="text-muted-foreground">{l.ts}</span>
              <Badge variant="outline">{l.method}</Badge><span>{l.path}</span>
              <Badge variant={l.status < 400 ? 'default' : 'destructive'}>{l.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
