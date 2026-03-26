import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const resources = [
  { name: 'Compute', cost: '$1,240', usage: '78%', trend: 'up' },
  { name: 'Storage', cost: '$380', usage: '45%', trend: 'stable' },
  { name: 'Network', cost: '$560', usage: '62%', trend: 'up' },
  { name: 'API Calls', cost: '$190', usage: '30%', trend: 'down' },
]
const allocation = [
  { team: 'Platform', budget: '$3,000', spent: '$2,100', pct: 70 },
  { team: 'Frontend', budget: '$1,500', spent: '$900', pct: 60 },
  { team: 'Data', budget: '$2,000', spent: '$1,800', pct: 90 },
  { team: 'Security', budget: '$1,000', spent: '$450', pct: 45 },
]

export function CostTracking() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('costTrackingTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {resources.map((r) => (
          <Card key={r.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{r.cost}</div>
              <div className="text-xs">{r.name} — {r.usage}</div>
              <Badge variant={r.trend === 'up' ? 'destructive' : r.trend === 'down' ? 'default' : 'secondary'}>{r.trend}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Cost Allocation</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {allocation.map((a) => (
            <div key={a.team} className="space-y-1">
              <div className="flex justify-between text-sm"><span>{a.team}</span><span>{a.spent} / {a.budget}</span></div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${a.pct > 80 ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${a.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
