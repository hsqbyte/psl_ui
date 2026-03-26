import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useI18n } from '@/shared/i18n'

const COVERAGE_DATA = [
  { name: 'Ethernet', coverage: 100 },
  { name: 'ARP', coverage: 95 },
  { name: 'IPv4', coverage: 92 },
  { name: 'IPv6', coverage: 88 },
  { name: 'TCP', coverage: 90 },
  { name: 'UDP', coverage: 85 },
  { name: 'ICMP', coverage: 82 },
  { name: 'DNS', coverage: 70 },
  { name: 'HTTP', coverage: 45 },
  { name: 'HTTP2', coverage: 65 },
  { name: 'TLS', coverage: 60 },
  { name: 'MQTT', coverage: 55 },
  { name: 'WebSocket', coverage: 72 },
  { name: 'DHCP', coverage: 40 },
  { name: 'CoAP', coverage: 78 },
  { name: 'Kafka', coverage: 30 },
  { name: 'Redis', coverage: 35 },
  { name: 'MySQL', coverage: 50 },
]

function barColor(pct: number) {
  if (pct >= 80) return 'bg-green-500'
  if (pct >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function Coverage() {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('coverageTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>{t('fieldCoverage')}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {COVERAGE_DATA.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.coverage}%</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor(item.coverage)} transition-all`} style={{ width: `${item.coverage}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
