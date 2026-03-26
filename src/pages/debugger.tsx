import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const breakpoints = [
  { file: 'tcp.psl', line: 12, enabled: true },
  { file: 'http.psl', line: 45, enabled: false },
  { file: 'dns.psl', line: 8, enabled: true },
]
const variables = [
  { name: 'src_port', value: '443', type: 'uint16' },
  { name: 'flags', value: '0x18', type: 'uint8' },
  { name: 'payload_len', value: '1460', type: 'uint32' },
]

export function Debugger() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('debuggerTitle')}</h2>
      <div className="flex gap-2">
        {['⏸ Pause', '▶ Continue', '⏭ Step Over', '⏬ Step Into'].map((b) => (
          <Badge key={b} variant="secondary" className="cursor-pointer px-3 py-1">{b}</Badge>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Breakpoints</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {breakpoints.map((bp, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{bp.file}:{bp.line}</span>
                <Badge variant={bp.enabled ? 'default' : 'outline'}>{bp.enabled ? 'on' : 'off'}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Variables</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {variables.map((v) => (
              <div key={v.name} className="flex justify-between text-sm">
                <span className="font-mono">{v.name}</span>
                <span><Badge variant="outline">{v.type}</Badge> {v.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
