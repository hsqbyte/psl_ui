import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

type Severity = 'high' | 'medium' | 'low'

interface Finding { protocol: string; severity: Severity; title: string; description: string }

const FINDINGS: Finding[] = [
  { protocol: 'HTTP', severity: 'high', title: 'No encryption by default', description: 'HTTP transmits data in plaintext, vulnerable to MITM attacks' },
  { protocol: 'DNS', severity: 'high', title: 'No authentication', description: 'DNS responses can be spoofed without DNSSEC' },
  { protocol: 'TCP', severity: 'medium', title: 'Sequence prediction', description: 'Predictable ISN can enable session hijacking' },
  { protocol: 'MQTT', severity: 'medium', title: 'Optional authentication', description: 'MQTT allows anonymous connections by default' },
  { protocol: 'UDP', severity: 'low', title: 'No delivery guarantee', description: 'Packets can be dropped or reordered' },
  { protocol: 'TLS', severity: 'low', title: 'Legacy version support', description: 'TLS 1.0/1.1 deprecated but may still be negotiated' },
  { protocol: 'IPv4', severity: 'medium', title: 'No built-in encryption', description: 'IPsec optional, most traffic unencrypted at network layer' },
  { protocol: 'WebSocket', severity: 'medium', title: 'Origin validation', description: 'Server must validate Origin header to prevent CSWSH' },
  { protocol: 'Redis', severity: 'high', title: 'No auth by default', description: 'Redis binds to all interfaces without password' },
  { protocol: 'MySQL', severity: 'medium', title: 'Weak auth plugin', description: 'mysql_native_password uses SHA1 which is weak' },
]

const SEV_STYLE: Record<Severity, string> = {
  high: 'bg-red-500/15 text-red-700 dark:text-red-400',
  medium: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  low: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
}

export function Audit() {
  const { t } = useI18n()
  const counts = { high: FINDINGS.filter((f) => f.severity === 'high').length, medium: FINDINGS.filter((f) => f.severity === 'medium').length, low: FINDINGS.filter((f) => f.severity === 'low').length }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('auditTitle')}</h2>
      <div className="flex gap-4">
        <Badge className={SEV_STYLE.high}>High: {counts.high}</Badge>
        <Badge className={SEV_STYLE.medium}>Medium: {counts.medium}</Badge>
        <Badge className={SEV_STYLE.low}>Low: {counts.low}</Badge>
      </div>
      <Card>
        <CardHeader><CardTitle>{t('auditTitle')}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {FINDINGS.map((f, i) => (
            <div key={i} className={`p-3 rounded ${SEV_STYLE[f.severity]}`}>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{f.protocol}</Badge>
                <span className="font-medium text-sm">{f.title}</span>
                <Badge className={SEV_STYLE[f.severity]}>{f.severity}</Badge>
              </div>
              <p className="text-xs mt-1 opacity-80">{f.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
