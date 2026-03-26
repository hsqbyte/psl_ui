import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const checklist = [
  { item: 'All pages implemented', done: true },
  { item: 'TypeScript compiles', done: true },
  { item: 'Routes configured', done: true },
  { item: 'i18n keys added', done: true },
  { item: 'Sidebar navigation', done: true },
  { item: 'Accessibility audit', done: false },
  { item: 'Performance testing', done: false },
  { item: 'Documentation updated', done: false },
]
const features = [
  { group: 'DevTools', count: 10, complete: 10 },
  { group: 'Enterprise', count: 10, complete: 10 },
  { group: 'AI', count: 10, complete: 10 },
  { group: 'Platform', count: 10, complete: 10 },
]

export function ReleasePrep() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('releasePrepTitle')}</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {features.map((f) => (
          <Card key={f.group}>
            <CardContent className="pt-4 text-center space-y-1">
              <div className="text-2xl font-bold">{f.complete}/{f.count}</div>
              <div className="text-xs">{f.group}</div>
              <Badge variant={f.complete === f.count ? 'default' : 'secondary'}>{f.complete === f.count ? 'Complete' : 'In Progress'}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Release Checklist</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {checklist.map((c) => (
            <div key={c.item} className="flex justify-between text-sm">
              <span>{c.item}</span>
              <Badge variant={c.done ? 'default' : 'outline'}>{c.done ? '✓' : '○'}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
