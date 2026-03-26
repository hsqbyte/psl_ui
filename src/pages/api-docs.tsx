import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const docs = [
  {
    method: 'GET', path: '/api/protocols',
    desc: 'Returns a list of all available protocols.',
    req: 'GET /api/protocols HTTP/1.1\nHost: localhost:8080',
    res: '[\n  {"name":"TCP","layer":"transport","fields":20},\n  {"name":"UDP","layer":"transport","fields":4}\n]',
  },
  {
    method: 'POST', path: '/api/validate',
    desc: 'Validates a PSL definition string.',
    req: 'POST /api/validate HTTP/1.1\nContent-Type: application/json\n\n{"psl":"protocol TCP { ... }"}',
    res: '{"valid":true,"errors":[],"warnings":[]}',
  },
]

export function ApiDocs() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('apiDocsTitle')}</h2>
      {docs.map((d, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Badge>{d.method}</Badge><span className="font-mono text-sm">{d.path}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{d.desc}</p>
            <div>
              <div className="text-xs font-semibold mb-1">Request</div>
              <pre className="bg-muted rounded p-2 text-xs overflow-auto">{d.req}</pre>
            </div>
            <div>
              <div className="text-xs font-semibold mb-1">Response</div>
              <pre className="bg-muted rounded p-2 text-xs overflow-auto">{d.res}</pre>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
