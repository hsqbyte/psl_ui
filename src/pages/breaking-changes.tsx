import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const changes = [
  { version: 'v2.0', change: 'Removed deprecated "flags" field', impact: 'high', affected: 12 },
  { version: 'v2.0', change: 'Renamed "src_addr" to "source"', impact: 'medium', affected: 8 },
  { version: 'v1.5', change: 'Changed checksum algorithm', impact: 'high', affected: 15 },
  { version: 'v1.5', change: 'Added required "version" field', impact: 'low', affected: 3 },
  { version: 'v1.3', change: 'Encoding changed to big-endian', impact: 'medium', affected: 6 },
]

const impactColor: Record<string, 'destructive' | 'secondary' | 'outline'> = {
  high: 'destructive', medium: 'secondary', low: 'outline',
}

export function BreakingChanges() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('breakingChangesTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Breaking Changes</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Version</th><th className="text-left py-2">Change</th><th className="text-left py-2">Impact</th><th className="text-left py-2">Affected</th></tr></thead>
            <tbody>{changes.map((c, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2"><Badge variant="outline">{c.version}</Badge></td>
                <td className="py-2">{c.change}</td>
                <td className="py-2"><Badge variant={impactColor[c.impact]}>{c.impact}</Badge></td>
                <td className="py-2">{c.affected} protocols</td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
