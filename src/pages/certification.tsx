import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const certs = [
  { name: 'PSL Fundamentals', status: 'completed', badge: '🥉', date: '2024-01-10' },
  { name: 'Protocol Design', status: 'in progress', badge: '🥈', date: '—' },
  { name: 'Advanced Analysis', status: 'locked', badge: '🥇', date: '—' },
  { name: 'Security Expert', status: 'locked', badge: '🏆', date: '—' },
]
const steps = [
  { step: 'Complete 5 tutorials', done: true },
  { step: 'Pass fundamentals quiz', done: true },
  { step: 'Submit a protocol', done: false },
  { step: 'Peer review 3 protocols', done: false },
]

export function Certification() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('certificationTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {certs.map((c) => (
          <Card key={c.name}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-3xl">{c.badge}</div>
              <div className="font-medium text-sm">{c.name}</div>
              <Badge variant={c.status === 'completed' ? 'default' : c.status === 'in progress' ? 'secondary' : 'outline'}>{c.status}</Badge>
              <div className="text-xs text-muted-foreground">{c.date}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Current Progress</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {steps.map((s) => (
            <div key={s.step} className="flex justify-between text-sm">
              <span>{s.step}</span>
              <Badge variant={s.done ? 'default' : 'outline'}>{s.done ? '✓' : '○'}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
