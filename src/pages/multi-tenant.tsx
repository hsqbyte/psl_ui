import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const tenants = [
  { name: 'Acme Corp', plan: 'Enterprise', users: 45, protocols: 120, status: 'active' },
  { name: 'TechStart', plan: 'Pro', users: 12, protocols: 35, status: 'active' },
  { name: 'NetOps Inc', plan: 'Enterprise', users: 30, protocols: 80, status: 'active' },
  { name: 'DevLab', plan: 'Free', users: 3, protocols: 10, status: 'trial' },
]

export function MultiTenant() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('multiTenantTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Tenants</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Tenant</th><th className="text-left py-2">Plan</th><th className="text-left py-2">Users</th><th className="text-left py-2">Protocols</th><th className="text-left py-2">Status</th></tr></thead>
            <tbody>{tenants.map((t) => (
              <tr key={t.name} className="border-b last:border-0">
                <td className="py-2 font-medium">{t.name}</td>
                <td className="py-2"><Badge variant="secondary">{t.plan}</Badge></td>
                <td className="py-2">{t.users}</td>
                <td className="py-2">{t.protocols}</td>
                <td className="py-2"><Badge variant={t.status === 'active' ? 'default' : 'outline'}>{t.status}</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
