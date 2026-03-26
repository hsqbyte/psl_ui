import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const scores = [
  { category: 'Completeness', score: 85 },
  { category: 'Naming', score: 92 },
  { category: 'Documentation', score: 68 },
  { category: 'Type Safety', score: 95 },
  { category: 'Best Practices', score: 78 },
]
const suggestions = [
  { type: 'warn', msg: 'Add descriptions to 4 undocumented fields' },
  { type: 'info', msg: 'Consider using enum for "flags" field' },
  { type: 'warn', msg: 'Field "reserved" should have explicit default value' },
  { type: 'info', msg: 'Protocol could benefit from versioning' },
]

export function AiReview() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('aiReviewTitle')}</h2>
      <div className="grid md:grid-cols-5 gap-4">
        {scores.map((s) => (
          <Card key={s.category}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{s.score}</div>
              <div className="text-xs">{s.category}</div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${s.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${s.score}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Suggestions</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <Badge variant={s.type === 'warn' ? 'secondary' : 'outline'}>{s.type}</Badge>
              <span>{s.msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
