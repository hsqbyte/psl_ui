import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const preview = `protocol TCP {
  src_port: uint16
  dst_port: uint16
  seq_num:  uint32
  ack_num:  uint32
  flags:    uint8
}`
const validations = [
  { check: 'Syntax valid', status: 'pass' },
  { check: 'Field types resolved', status: 'pass' },
  { check: 'No circular deps', status: 'pass' },
  { check: 'Naming conventions', status: 'warn' },
  { check: 'Description coverage', status: 'fail' },
]

export function FormatValidate() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('formatValidateTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>PSL Format Preview</CardTitle></CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-xs font-mono">{preview}</pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Validation Results</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {validations.map((v) => (
            <div key={v.check} className="flex justify-between text-sm">
              <span>{v.check}</span>
              <Badge variant={v.status === 'pass' ? 'default' : v.status === 'warn' ? 'secondary' : 'destructive'}>{v.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
