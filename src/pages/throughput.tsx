import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

function toPolyline(pts: number[], w: number, h: number) {
  const max = Math.max(...pts, 1)
  return pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * h}`).join(' ')
}

export function Throughput() {
  const { t } = useI18n()
  const [data, setData] = useState(() => Array.from({ length: 20 }, () => Math.floor(Math.random() * 80 + 20)))

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => [...prev.slice(1), Math.floor(Math.random() * 80 + 20)])
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const w = 500, h = 180
  const latest = data[data.length - 1]
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('throughputTitle')}</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Real-time Throughput <Badge>{latest} Mbps</Badge> <Badge variant="secondary">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <svg width={w + 20} height={h + 20} className="font-sans">
            <g transform="translate(10,10)">
              <polyline points={toPolyline(data, w, h)} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
              {data.map((v, i) => (
                <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - (v / Math.max(...data, 1)) * h} r="2" fill="hsl(var(--primary))" />
              ))}
            </g>
          </svg>
        </CardContent>
      </Card>
    </div>
  )
}
