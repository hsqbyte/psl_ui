import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const prs = [
  { title: 'Add QUIC v2 support', author: 'alice', status: 'open', comments: 8 },
  { title: 'Fix DNS parsing edge case', author: 'bob', status: 'merged', comments: 3 },
  { title: 'Add WebTransport protocol', author: 'carol', status: 'open', comments: 12 },
  { title: 'Update TLS 1.3 fields', author: 'dave', status: 'closed', comments: 5 },
]
const leaderboard = [
  { user: 'alice', contributions: 42, rank: 1 },
  { user: 'bob', contributions: 38, rank: 2 },
  { user: 'carol', contributions: 25, rank: 3 },
  { user: 'dave', contributions: 18, rank: 4 },
]
const statusColor: Record<string, 'default' | 'secondary' | 'destructive'> = {
  open: 'default', merged: 'secondary', closed: 'destructive',
}

export function Community() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('communityTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Pull Requests</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {prs.map((pr) => (
            <div key={pr.title} className="flex justify-between text-sm">
              <span>{pr.title} <span className="text-muted-foreground">by {pr.author}</span></span>
              <span className="flex gap-2"><Badge variant={statusColor[pr.status]}>{pr.status}</Badge><span className="text-xs">{pr.comments} 💬</span></span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Leaderboard</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {leaderboard.map((l) => (
            <div key={l.user} className="flex justify-between text-sm">
              <span>#{l.rank} {l.user}</span>
              <Badge variant="secondary">{l.contributions} contributions</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
