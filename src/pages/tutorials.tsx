import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const tutorials = [
  { title: 'Getting Started with PSL', level: 'beginner', duration: '15 min', steps: 5, completed: 5 },
  { title: 'Define Your First Protocol', level: 'beginner', duration: '20 min', steps: 8, completed: 8 },
  { title: 'Working with Fields', level: 'intermediate', duration: '25 min', steps: 10, completed: 6 },
  { title: 'Protocol Inheritance', level: 'intermediate', duration: '30 min', steps: 12, completed: 0 },
  { title: 'Advanced Encoding', level: 'advanced', duration: '45 min', steps: 15, completed: 0 },
]

const levelColor: Record<string, 'default' | 'secondary' | 'destructive'> = {
  beginner: 'default', intermediate: 'secondary', advanced: 'destructive',
}

export function Tutorials() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('tutorialsTitle')}</h2>
      {tutorials.map((tut) => (
        <Card key={tut.title}>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{tut.title}</span>
              <div className="flex gap-2">
                <Badge variant={levelColor[tut.level]}>{tut.level}</Badge>
                <Badge variant="outline">{tut.duration}</Badge>
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(tut.completed / tut.steps) * 100}%` }} />
            </div>
            <div className="text-xs text-muted-foreground">{tut.completed}/{tut.steps} steps completed</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
