import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const templates = [
  { name: 'Unit Test', desc: 'Single field validation', count: 12 },
  { name: 'Integration', desc: 'Multi-protocol flow', count: 5 },
  { name: 'Fuzz', desc: 'Random input generation', count: 8 },
  { name: 'Boundary', desc: 'Edge case values', count: 15 },
]
const results = [
  { name: 'TCP header parse', status: 'pass', time: '12ms' },
  { name: 'UDP checksum', status: 'pass', time: '8ms' },
  { name: 'HTTP overflow', status: 'fail', time: '45ms' },
  { name: 'DNS label length', status: 'pass', time: '5ms' },
]

export function TestgenUI() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('testgenTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {templates.map((tp) => (
          <Card key={tp.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="font-bold">{tp.name}</div>
              <div className="text-xs text-muted-foreground">{tp.desc}</div>
              <Badge variant="secondary">{tp.count} cases</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Badge variant="default" className="cursor-pointer px-4 py-1">Generate Tests</Badge>
      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{r.name}</span>
              <span className="flex gap-2">
                <Badge variant={r.status === 'pass' ? 'default' : 'destructive'}>{r.status}</Badge>
                <span className="text-muted-foreground">{r.time}</span>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
