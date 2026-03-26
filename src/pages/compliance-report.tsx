import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const reports = [
  { name: 'RFC Compliance', score: 95, status: 'pass' },
  { name: 'Security Standards', score: 88, status: 'pass' },
  { name: 'Data Privacy', score: 72, status: 'warn' },
  { name: 'Naming Conventions', score: 100, status: 'pass' },
]
const items = [
  { rule: 'All fields documented', status: 'pass' },
  { rule: 'No deprecated types', status: 'pass' },
  { rule: 'Encryption required', status: 'warn' },
  { rule: 'Audit trail enabled', status: 'pass' },
  { rule: 'Data retention policy', status: 'fail' },
]

export function ComplianceReport() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('complianceReportTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {reports.map((r) => (
          <Card key={r.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{r.score}%</div>
              <div className="text-xs">{r.name}</div>
              <Badge variant={r.status === 'pass' ? 'default' : 'secondary'}>{r.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Checklist</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {items.map((it) => (
            <div key={it.rule} className="flex justify-between text-sm">
              <span>{it.rule}</span>
              <Badge variant={it.status === 'pass' ? 'default' : it.status === 'warn' ? 'secondary' : 'destructive'}>{it.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
