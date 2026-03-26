import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useI18n } from '@/shared/i18n'

const BENCH_DATA = [
  { name: 'Ethernet', encode: 1250000, decode: 1480000 },
  { name: 'IPv4', encode: 980000, decode: 1120000 },
  { name: 'TCP', encode: 850000, decode: 920000 },
  { name: 'UDP', encode: 1100000, decode: 1350000 },
  { name: 'DNS', encode: 620000, decode: 710000 },
  { name: 'HTTP', encode: 340000, decode: 420000 },
  { name: 'TLS', encode: 280000, decode: 310000 },
  { name: 'MQTT', encode: 750000, decode: 890000 },
]

function fmtOps(n: number) {
  return n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`
}

export function Benchmark() {
  const { t } = useI18n()
  const maxOps = Math.max(...BENCH_DATA.flatMap((d) => [d.encode, d.decode]))

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('benchmarkTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>ops/sec</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {BENCH_DATA.map((item) => (
            <div key={item.name} className="space-y-1">
              <span className="text-sm font-medium">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs w-14 text-right text-muted-foreground">Encode</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(item.encode / maxOps) * 100}%` }} />
                </div>
                <span className="text-xs w-14">{fmtOps(item.encode)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs w-14 text-right text-muted-foreground">Decode</span>
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(item.decode / maxOps) * 100}%` }} />
                </div>
                <span className="text-xs w-14">{fmtOps(item.decode)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
