import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const errors = [
  { error: 'Field overflow at byte 14', analysis: 'uint8 field exceeds max value 255', fix: 'Change to uint16', confidence: 95 },
  { error: 'Checksum mismatch', analysis: 'Wrong byte order in calculation', fix: 'Use network byte order (big-endian)', confidence: 88 },
  { error: 'Parse failure at offset 20', analysis: 'Variable-length field missing length prefix', fix: 'Add length_prefix: uint16 before payload', confidence: 82 },
]

export function AiDebug() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('aiDebugTitle')}</h2>
      {errors.map((e, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-base flex justify-between">
              <span className="text-destructive">{e.error}</span>
              <Badge variant="secondary">{e.confidence}% confidence</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm"><span className="font-medium">Analysis:</span> {e.analysis}</div>
            <div className="text-sm flex gap-2">
              <span className="font-medium">Suggested Fix:</span>
              <Badge variant="default">{e.fix}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
