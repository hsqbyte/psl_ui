import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const rules = [
  { type: 'Audit Logs', retention: '90 days', auto: true, size: '2.4 GB' },
  { type: 'Protocol Versions', retention: 'Forever', auto: false, size: '850 MB' },
  { type: 'User Sessions', retention: '30 days', auto: true, size: '120 MB' },
  { type: 'Temp Files', retention: '7 days', auto: true, size: '45 MB' },
  { type: 'Analytics Data', retention: '365 days', auto: true, size: '5.1 GB' },
]
const schedule = [
  { task: 'Purge expired sessions', next: '2024-01-16 02:00', last: 'Success' },
  { task: 'Archive old logs', next: '2024-01-20 03:00', last: 'Success' },
  { task: 'Clean temp files', next: '2024-01-15 23:00', last: 'Pending' },
]

export function DataRetention() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('dataRetentionTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Retention Rules</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Type</th><th className="text-left py-2">Retention</th><th className="text-left py-2">Auto</th><th className="text-left py-2">Size</th></tr></thead>
            <tbody>{rules.map((r) => (
              <tr key={r.type} className="border-b last:border-0">
                <td className="py-2">{r.type}</td><td className="py-2">{r.retention}</td>
                <td className="py-2"><Badge variant={r.auto ? 'default' : 'outline'}>{r.auto ? 'Yes' : 'No'}</Badge></td>
                <td className="py-2">{r.size}</td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Cleanup Schedule</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {schedule.map((s) => (
            <div key={s.task} className="flex justify-between text-sm">
              <span>{s.task}</span>
              <span className="flex gap-2"><span className="text-xs text-muted-foreground">{s.next}</span><Badge variant="secondary">{s.last}</Badge></span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
