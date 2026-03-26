import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const prs = [
  { id: 42, title: 'Add QUIC protocol definition', author: 'alice', status: 'open' },
  { id: 41, title: 'Fix TCP flags field width', author: 'bob', status: 'merged' },
  { id: 40, title: 'Update HTTP/2 frame types', author: 'carol', status: 'open' },
]

const issues = [
  { id: 15, title: 'Missing EDNS0 extension support', labels: ['enhancement'], status: 'open' },
  { id: 14, title: 'IPv6 extension header parsing error', labels: ['bug'], status: 'open' },
  { id: 13, title: 'Add CoAP protocol', labels: ['enhancement'], status: 'closed' },
]

export function GithubIntegration() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('githubIntegrationTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>📦 Repository</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm font-mono">github.com/psl-lang/psl-spec</p>
          <div className="flex gap-2 mt-2"><Badge>⭐ 1.2k</Badge><Badge variant="secondary">🍴 89</Badge></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Pull Requests</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {prs.map((pr) => (
            <div key={pr.id} className="flex items-center gap-2 text-sm">
              <Badge variant={pr.status === 'merged' ? 'default' : 'secondary'}>#{pr.id}</Badge>
              <span className="flex-1">{pr.title}</span>
              <span className="text-muted-foreground text-xs">{pr.author}</span>
              <Badge variant={pr.status === 'merged' ? 'default' : 'outline'}>{pr.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Issues</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {issues.map((issue) => (
            <div key={issue.id} className="flex items-center gap-2 text-sm">
              <Badge variant="outline">#{issue.id}</Badge>
              <span className="flex-1">{issue.title}</span>
              {issue.labels.map((l) => <Badge key={l} variant="secondary">{l}</Badge>)}
              <Badge variant={issue.status === 'closed' ? 'default' : 'outline'}>{issue.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
