import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const presets = [
  { name: 'TCP Header', desc: 'Basic TCP header definition' },
  { name: 'HTTP Request', desc: 'Simple HTTP request message' },
  { name: 'DNS Query', desc: 'DNS query packet structure' },
  { name: 'Custom Protocol', desc: 'Start from scratch' },
]
const code = `protocol Example {
  magic:   uint32 = 0xDEADBEEF
  version: uint8
  length:  uint16
  payload: bytes[length]
}`

export function Sandbox() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('sandboxTitle')}</h2>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p) => (
          <Badge key={p.name} variant="secondary" className="cursor-pointer px-3 py-1" title={p.desc}>{p.name}</Badge>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Editor</CardTitle></CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap min-h-[120px]">{code}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Output</CardTitle></CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap min-h-[120px]">
{`✓ Syntax valid
✓ 4 fields parsed
✓ Total size: variable (min 7 bytes)
✓ Magic: 0xDEADBEEF`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
