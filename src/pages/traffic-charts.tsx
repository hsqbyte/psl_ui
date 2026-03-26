import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const points = [20, 35, 28, 55, 42, 68, 52, 75, 60, 85, 72, 90]
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toSvg(pts: number[], w: number, h: number) {
  const maxV = Math.max(...pts)
  return pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / maxV) * h}`).join(' ')
}

export function TrafficCharts() {
  const { t } = useI18n()
  const w = 500, h = 200
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('trafficChartsTitle')}</h2>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2">Traffic Trend <Badge>2025</Badge></CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <svg width={w + 60} height={h + 40} className="font-sans">
            <g transform="translate(40,10)">
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line x1="0" y1={h - (v / 100) * h} x2={w} y2={h - (v / 100) * h} stroke="currentColor" opacity={0.1} />
                  <text x="-5" y={h - (v / 100) * h + 4} textAnchor="end" fontSize="9" fill="currentColor" opacity={0.5}>{v}</text>
                </g>
              ))}
              <polyline points={toSvg(points, w, h)} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
              {points.map((v, i) => (
                <circle key={i} cx={(i / (points.length - 1)) * w} cy={h - (v / Math.max(...points)) * h} r="3" fill="hsl(var(--primary))" />
              ))}
              {labels.map((l, i) => (
                <text key={l} x={(i / (labels.length - 1)) * w} y={h + 16} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.5}>{l}</text>
              ))}
            </g>
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
