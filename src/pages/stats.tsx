import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

interface StatItem {
  name: string
  count: number
  color: string
}

const USAGE_DATA: StatItem[] = [
  { name: 'TCP', count: 4520, color: 'bg-blue-500' },
  { name: 'HTTP', count: 3200, color: 'bg-green-500' },
  { name: 'DNS', count: 2100, color: 'bg-purple-500' },
  { name: 'UDP', count: 1800, color: 'bg-yellow-500' },
  { name: 'TLS', count: 1500, color: 'bg-red-500' },
  { name: 'ARP', count: 800, color: 'bg-cyan-500' },
  { name: 'ICMP', count: 450, color: 'bg-pink-500' },
  { name: 'MQTT', count: 320, color: 'bg-orange-500' },
]

interface CoverageItem {
  name: string
  coverage: number
}

const COVERAGE_DATA: CoverageItem[] = [
  { name: 'Ethernet', coverage: 100 },
  { name: 'IPv4', coverage: 95 },
  { name: 'TCP', coverage: 90 },
  { name: 'UDP', coverage: 88 },
  { name: 'HTTP', coverage: 75 },
  { name: 'DNS', coverage: 70 },
  { name: 'TLS', coverage: 60 },
  { name: 'MQTT', coverage: 55 },
  { name: 'ARP', coverage: 100 },
  { name: 'ICMP', coverage: 85 },
]

export function Stats() {
  const { t } = useI18n()
  const maxCount = Math.max(...USAGE_DATA.map((d) => d.count))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('statsTitle')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('protocolUsage')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {USAGE_DATA.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.count.toLocaleString()}</span>
                </div>
                <div className="h-5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('fieldCoverage')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {COVERAGE_DATA.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.coverage}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.coverage >= 80 ? 'bg-green-500' : item.coverage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${item.coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
