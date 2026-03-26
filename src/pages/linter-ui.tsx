import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const rules = [
  { name: 'no-unused-fields', enabled: true, severity: 'warn' },
  { name: 'require-description', enabled: true, severity: 'error' },
  { name: 'max-field-count', enabled: false, severity: 'warn' },
  { name: 'naming-convention', enabled: true, severity: 'error' },
  { name: 'no-duplicate-ids', enabled: true, severity: 'error' },
]
const results = [
  { file: 'tcp.psl', line: 5, rule: 'require-description', msg: 'Missing field description' },
  { file: 'http.psl', line: 12, rule: 'naming-convention', msg: 'Use snake_case for fields' },
  { file: 'dns.psl', line: 8, rule: 'no-unused-fields', msg: 'Field "reserved" is unused' },
]

export function LinterUI() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('linterTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Lint Rules</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {rules.map((r) => (
            <div key={r.name} className="flex justify-between text-sm">
              <span className="font-mono">{r.name}</span>
              <span className="flex gap-2">
                <Badge variant={r.severity === 'error' ? 'destructive' : 'secondary'}>{r.severity}</Badge>
                <Badge variant={r.enabled ? 'default' : 'outline'}>{r.enabled ? 'on' : 'off'}</Badge>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Lint Results</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-xs">{r.file}:{r.line}</span>
              <Badge variant="outline">{r.rule}</Badge>
              <span className="text-muted-foreground">{r.msg}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
