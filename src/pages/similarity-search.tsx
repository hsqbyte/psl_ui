import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const results = [
  { source: 'TCP', target: 'SCTP', similarity: 87, shared: ['src_port', 'dst_port', 'checksum'] },
  { source: 'TCP', target: 'UDP', similarity: 72, shared: ['src_port', 'dst_port', 'length'] },
  { source: 'HTTP', target: 'RTSP', similarity: 68, shared: ['method', 'headers', 'body'] },
  { source: 'MQTT', target: 'CoAP', similarity: 55, shared: ['msg_type', 'payload'] },
]

export function SimilaritySearch() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('similaritySearchTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Protocol Similarity Results</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {results.map((r, i) => (
            <div key={i} className="space-y-2 pb-3 border-b last:border-0">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{r.source} ↔ {r.target}</span>
                <Badge variant={r.similarity > 75 ? 'default' : 'secondary'}>{r.similarity}% similar</Badge>
              </div>
              <div className="flex gap-1 flex-wrap">
                {r.shared.map((f) => <Badge key={f} variant="outline" className="text-xs">{f}</Badge>)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
