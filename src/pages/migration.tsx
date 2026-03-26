import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const steps = [
  { name: 'Select Source Version', status: 'done' },
  { name: 'Select Target Version', status: 'done' },
  { name: 'Compatibility Check', status: 'current' },
  { name: 'Apply Migration', status: 'pending' },
  { name: 'Verify', status: 'pending' },
]
const checks = [
  { item: 'Field type compatibility', ok: true },
  { item: 'Removed fields', ok: false },
  { item: 'New required fields', ok: true },
  { item: 'Encoding changes', ok: true },
]

export function Migration() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('migrationTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Migration Wizard</CardTitle></CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          {steps.map((s) => (
            <Badge key={s.name} variant={s.status === 'done' ? 'default' : s.status === 'current' ? 'secondary' : 'outline'}>{s.name}</Badge>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Compatibility Check</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {checks.map((c) => (
            <div key={c.item} className="flex justify-between text-sm">
              <span>{c.item}</span>
              <Badge variant={c.ok ? 'default' : 'destructive'}>{c.ok ? 'OK' : 'Issue'}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
