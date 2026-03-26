import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const percentiles = [
  { label: 'p50', value: 12, color: '#10b981' },
  { label: 'p75', value: 28, color: '#3b82f6' },
  { label: 'p90', value: 45, color: '#f59e0b' },
  { label: 'p95', value: 78, color: '#f97316' },
  { label: 'p99', value: 120, color: '#ef4444' },
]

const maxVal = Math.max(...percentiles.map((p) => p.value))

export function Latency() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('latencyTitle')}</h2>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2">Latency Percentiles <Badge variant="secondary">ms</Badge></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {percentiles.map((p) => (
            <div key={p.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-mono font-bold">{p.label}</span>
                <span className="text-muted-foreground">{p.value}ms</span>
              </div>
              <div className="h-6 bg-muted rounded overflow-hidden">
                <div className="h-full rounded transition-all" style={{ width: `${(p.value / maxVal) * 100}%`, backgroundColor: p.color }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
