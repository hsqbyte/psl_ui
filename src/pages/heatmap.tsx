import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

const protocols = ['TCP', 'UDP', 'HTTP', 'DNS', 'TLS', 'MQTT', 'QUIC']
const hours = ['00', '04', '08', '12', '16', '20']
const data = protocols.map(() => hours.map(() => Math.floor(Math.random() * 100)))

function cellColor(v: number) {
  if (v > 75) return '#ef4444'
  if (v > 50) return '#f59e0b'
  if (v > 25) return '#10b981'
  return '#6b7280'
}

export function Heatmap() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('heatmapTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Protocol Usage Heatmap</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width="420" height={protocols.length * 36 + 40} className="font-sans">
            <g>
              {hours.map((h, j) => (
                <text key={h} x={90 + j * 52 + 20} y="16" textAnchor="middle" fontSize="10" fill="currentColor" opacity={0.6}>{h}:00</text>
              ))}
            </g>
            {protocols.map((p, i) => (
              <g key={p}>
                <text x="80" y={i * 36 + 48} textAnchor="end" fontSize="11" fill="currentColor">{p}</text>
                {hours.map((_, j) => (
                  <rect key={j} x={90 + j * 52} y={i * 36 + 28} width="44" height="28" rx="4" fill={cellColor(data[i][j])} opacity={0.8} />
                ))}
                {hours.map((_, j) => (
                  <text key={`t${j}`} x={90 + j * 52 + 22} y={i * 36 + 47} textAnchor="middle" fontSize="9" fill="white">{data[i][j]}</text>
                ))}
              </g>
            ))}
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
