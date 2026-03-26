import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const recs = [
  { title: 'Use QUIC over TCP', reason: 'Lower latency for your use case', confidence: 92, category: 'transport' },
  { title: 'Enable TLS 1.3', reason: 'Improved security and performance', confidence: 98, category: 'security' },
  { title: 'Switch to Protocol Buffers', reason: 'Better encoding efficiency', confidence: 85, category: 'encoding' },
  { title: 'Add HTTP/2 support', reason: 'Multiplexing reduces connections', confidence: 78, category: 'application' },
  { title: 'Implement MQTT QoS 2', reason: 'Guaranteed delivery needed', confidence: 88, category: 'reliability' },
]

export function Recommendations() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('recommendationsTitle')}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {recs.map((r) => (
          <Card key={r.title}>
            <CardHeader>
              <CardTitle className="text-base flex justify-between">
                <span>{r.title}</span>
                <Badge variant="secondary">{r.confidence}%</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{r.reason}</p>
              <Badge variant="outline">{r.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
