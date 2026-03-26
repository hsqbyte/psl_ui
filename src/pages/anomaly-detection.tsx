import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const anomalies = [
  { ts: '14:30:01', type: 'Traffic Spike', protocol: 'HTTP', severity: 'high', desc: '300% above baseline' },
  { ts: '14:25:00', type: 'Unusual Pattern', protocol: 'DNS', severity: 'medium', desc: 'Repeated NXDOMAIN' },
  { ts: '14:20:15', type: 'Port Scan', protocol: 'TCP', severity: 'high', desc: 'Sequential port access' },
  { ts: '14:15:30', type: 'Payload Size', protocol: 'MQTT', severity: 'low', desc: 'Oversized messages' },
  { ts: '14:10:00', type: 'Latency', protocol: 'TLS', severity: 'medium', desc: 'Handshake 5x slower' },
]

export function AnomalyDetection() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('anomalyDetectionTitle')}</h2>
      <div className="flex gap-2">
        <Badge variant="destructive">2 High</Badge>
        <Badge variant="secondary">2 Medium</Badge>
        <Badge variant="outline">1 Low</Badge>
      </div>
      <Card>
        <CardHeader><CardTitle>Detected Anomalies</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Time</th><th className="text-left py-2">Type</th><th className="text-left py-2">Protocol</th><th className="text-left py-2">Severity</th><th className="text-left py-2">Details</th></tr></thead>
            <tbody>{anomalies.map((a, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2 text-xs">{a.ts}</td>
                <td className="py-2">{a.type}</td>
                <td className="py-2"><Badge variant="outline">{a.protocol}</Badge></td>
                <td className="py-2"><Badge variant={a.severity === 'high' ? 'destructive' : a.severity === 'medium' ? 'secondary' : 'outline'}>{a.severity}</Badge></td>
                <td className="py-2 text-muted-foreground">{a.desc}</td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
