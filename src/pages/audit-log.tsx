import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const logs = [
  { ts: '2024-01-15 14:30', user: 'alice', action: 'edit', target: 'TCP protocol', ip: '10.0.0.1' },
  { ts: '2024-01-15 14:25', user: 'bob', action: 'delete', target: 'Draft v2', ip: '10.0.0.2' },
  { ts: '2024-01-15 14:20', user: 'carol', action: 'create', target: 'QUIC protocol', ip: '10.0.0.3' },
  { ts: '2024-01-15 14:15', user: 'alice', action: 'login', target: 'System', ip: '10.0.0.1' },
  { ts: '2024-01-15 14:10', user: 'dave', action: 'export', target: 'HTTP protocol', ip: '10.0.0.4' },
]

const actionColor: Record<string, 'default' | 'destructive' | 'secondary' | 'outline'> = {
  edit: 'secondary', delete: 'destructive', create: 'default', login: 'outline', export: 'outline',
}

export function AuditLog() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('auditLogTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Audit Log</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Time</th><th className="text-left py-2">User</th><th className="text-left py-2">Action</th><th className="text-left py-2">Target</th><th className="text-left py-2">IP</th></tr></thead>
            <tbody>{logs.map((l, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2 text-xs">{l.ts}</td>
                <td className="py-2">{l.user}</td>
                <td className="py-2"><Badge variant={actionColor[l.action]}>{l.action}</Badge></td>
                <td className="py-2">{l.target}</td>
                <td className="py-2 font-mono text-xs">{l.ip}</td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
