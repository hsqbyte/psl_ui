import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const roles = ['Admin', 'Editor', 'Viewer', 'Auditor']
const perms = [
  { name: 'Read protocols', access: [true, true, true, true] },
  { name: 'Edit protocols', access: [true, true, false, false] },
  { name: 'Delete protocols', access: [true, false, false, false] },
  { name: 'Manage users', access: [true, false, false, false] },
  { name: 'View audit logs', access: [true, false, false, true] },
]

export function Rbac() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('rbacTitle')}</h2>
      <div className="flex gap-2">{roles.map((r) => <Badge key={r} variant="secondary">{r}</Badge>)}</div>
      <Card>
        <CardHeader><CardTitle>Permission Matrix</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Permission</th>
                {roles.map((r) => <th key={r} className="text-center py-2">{r}</th>)}
              </tr>
            </thead>
            <tbody>{perms.map((p) => (
              <tr key={p.name} className="border-b last:border-0">
                <td className="py-2">{p.name}</td>
                {p.access.map((a, i) => (
                  <td key={i} className="py-2 text-center">
                    <Badge variant={a ? 'default' : 'outline'}>{a ? '✓' : '—'}</Badge>
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
