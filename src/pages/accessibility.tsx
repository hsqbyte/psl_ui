import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const checklist = [
  { item: 'Keyboard navigation', status: 'pass' },
  { item: 'Screen reader labels', status: 'pass' },
  { item: 'Color contrast (AA)', status: 'pass' },
  { item: 'Color contrast (AAA)', status: 'warn' },
  { item: 'Focus indicators', status: 'pass' },
  { item: 'Alt text for images', status: 'pass' },
  { item: 'ARIA landmarks', status: 'warn' },
  { item: 'Skip navigation link', status: 'fail' },
]
const aria = [
  { component: 'Sidebar', role: 'navigation', status: 'ok' },
  { component: 'Protocol List', role: 'list', status: 'ok' },
  { component: 'Diagram', role: 'img', status: 'missing' },
  { component: 'Editor', role: 'textbox', status: 'ok' },
]

export function Accessibility() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('accessibilityTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Accessibility Checklist</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {checklist.map((c) => (
            <div key={c.item} className="flex justify-between text-sm">
              <span>{c.item}</span>
              <Badge variant={c.status === 'pass' ? 'default' : c.status === 'warn' ? 'secondary' : 'destructive'}>{c.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>ARIA Status</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {aria.map((a) => (
            <div key={a.component} className="flex justify-between text-sm">
              <span>{a.component} <Badge variant="outline" className="ml-1">{a.role}</Badge></span>
              <Badge variant={a.status === 'ok' ? 'default' : 'destructive'}>{a.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
