import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const paths = [
  { name: 'Protocol Basics', skills: ['PSL Syntax', 'Field Types', 'Encoding'], progress: 100 },
  { name: 'Network Analysis', skills: ['PCAP', 'Packet Flow', 'Debugging'], progress: 60 },
  { name: 'Security', skills: ['TLS', 'Audit', 'Compliance'], progress: 30 },
  { name: 'Advanced Design', skills: ['State Machines', 'Codegen', 'SDK'], progress: 0 },
]
const skills = [
  { name: 'PSL Syntax', level: 'mastered', xp: 500 },
  { name: 'Field Types', level: 'mastered', xp: 450 },
  { name: 'PCAP Analysis', level: 'learning', xp: 200 },
  { name: 'TLS Internals', level: 'beginner', xp: 50 },
]

export function LearningPaths() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('learningPathsTitle')}</h2>
      {paths.map((p) => (
        <Card key={p.name}>
          <CardContent className="pt-4 space-y-2">
            <div className="flex justify-between"><span className="font-medium">{p.name}</span><Badge variant="secondary">{p.progress}%</Badge></div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
            </div>
            <div className="flex gap-1 flex-wrap">{p.skills.map((s) => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}</div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader><CardTitle>Skill Tree</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {skills.map((s) => (
            <div key={s.name} className="flex justify-between text-sm">
              <span>{s.name}</span>
              <span className="flex gap-2"><Badge variant={s.level === 'mastered' ? 'default' : s.level === 'learning' ? 'secondary' : 'outline'}>{s.level}</Badge><span className="text-xs text-muted-foreground">{s.xp} XP</span></span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
