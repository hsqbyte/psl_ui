import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const results = [
  { protocol: 'TCP', field: 'src_port', match: 'Source port field, uint16', score: 95 },
  { protocol: 'UDP', field: 'src_port', match: 'Source port field, uint16', score: 90 },
  { protocol: 'HTTP', field: 'host', match: 'Host header field', score: 72 },
  { protocol: 'DNS', field: 'qname', match: 'Query domain name', score: 65 },
]

export function NlQuery() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('nlQueryTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Natural Language Query</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="h-9 rounded border bg-muted px-3 flex items-center text-sm text-muted-foreground">
            "Show me all protocols with a source port field"
          </div>
          <Badge variant="default" className="cursor-pointer px-4 py-1">Search</Badge>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Protocol</th><th className="text-left py-2">Field</th><th className="text-left py-2">Match</th><th className="text-left py-2">Score</th></tr></thead>
            <tbody>{results.map((r, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2"><Badge variant="outline">{r.protocol}</Badge></td>
                <td className="py-2 font-mono">{r.field}</td>
                <td className="py-2 text-muted-foreground">{r.match}</td>
                <td className="py-2"><Badge variant="secondary">{r.score}%</Badge></td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
