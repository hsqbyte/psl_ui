import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const example = `protocol CustomMsg {
  version:    uint8   // Protocol version
  msg_type:   uint8   // Message type identifier
  payload_len: uint16 // Payload length
  payload:    bytes[payload_len]
}`

export function AiGenerate() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('aiGenerateTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Natural Language Input</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="h-20 rounded border bg-muted px-3 py-2 text-sm text-muted-foreground">
            Describe your protocol: "A message with version byte, type byte, 2-byte length, and variable payload"
          </div>
          <Badge variant="default" className="cursor-pointer px-4 py-1">Generate PSL</Badge>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Generated PSL</span>
            <Badge variant="secondary">AI Generated</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap">{example}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
