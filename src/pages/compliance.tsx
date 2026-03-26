import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

type Status = 'pass' | 'warn' | 'fail'

interface ComplianceRule {
  rule: string
  results: Record<string, Status>
}

const RULES: ComplianceRule[] = [
  { rule: 'All fields have descriptions', results: { Ethernet: 'pass', IPv4: 'pass', TCP: 'pass', HTTP: 'fail', DNS: 'pass', MQTT: 'warn' } },
  { rule: 'Bit widths sum to header size', results: { Ethernet: 'pass', IPv4: 'pass', TCP: 'warn', HTTP: 'fail', DNS: 'pass', MQTT: 'pass' } },
  { rule: 'RFC reference present', results: { Ethernet: 'pass', IPv4: 'pass', TCP: 'pass', HTTP: 'pass', DNS: 'pass', MQTT: 'fail' } },
  { rule: 'No overlapping field ranges', results: { Ethernet: 'pass', IPv4: 'pass', TCP: 'pass', HTTP: 'pass', DNS: 'pass', MQTT: 'pass' } },
  { rule: 'Dependency chain valid', results: { Ethernet: 'pass', IPv4: 'pass', TCP: 'pass', HTTP: 'pass', DNS: 'warn', MQTT: 'pass' } },
]

const STATUS_STYLE: Record<Status, string> = {
  pass: 'bg-green-500/15 text-green-700 dark:text-green-400',
  warn: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  fail: 'bg-red-500/15 text-red-700 dark:text-red-400',
}

export function Compliance() {
  const { t } = useI18n()
  const allStatuses = RULES.flatMap((r) => Object.values(r.results))
  const counts = { pass: allStatuses.filter((s) => s === 'pass').length, warn: allStatuses.filter((s) => s === 'warn').length, fail: allStatuses.filter((s) => s === 'fail').length }
  const protos = Object.keys(RULES[0].results)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('complianceTitle')}</h2>
      <div className="flex gap-4">
        <Badge className={STATUS_STYLE.pass}>✓ {counts.pass} Pass</Badge>
        <Badge className={STATUS_STYLE.warn}>⚠ {counts.warn} Warn</Badge>
        <Badge className={STATUS_STYLE.fail}>✗ {counts.fail} Fail</Badge>
      </div>
      <Card>
        <CardHeader><CardTitle>{t('complianceTitle')}</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Rule</th>
                {protos.map((p) => <th key={p} className="px-2 py-2">{p}</th>)}
              </tr>
            </thead>
            <tbody>
              {RULES.map((r) => (
                <tr key={r.rule} className="border-b">
                  <td className="py-2 pr-4">{r.rule}</td>
                  {protos.map((p) => (
                    <td key={p} className="px-2 py-2 text-center">
                      <Badge variant="secondary" className={STATUS_STYLE[r.results[p]]}>{r.results[p] === 'pass' ? '✓' : r.results[p] === 'warn' ? '⚠' : '✗'}</Badge>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
