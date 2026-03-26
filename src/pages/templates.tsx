import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const templates = [
  { name: 'Basic Request/Response', layer: 'application', code: `protocol BasicRPC {
  field request_id: uint32
  field method: string
  field payload: bytes
}` },
  { name: 'Sensor Data', layer: 'application', code: `protocol SensorData {
  field device_id: uint16
  field timestamp: uint64
  field temperature: float32
  field humidity: float32
}` },
  { name: 'Packet Header', layer: 'transport', code: `protocol PacketHeader {
  field version: uint4
  field flags: uint8
  field length: uint16
  field checksum: uint16
  field payload: bytes
}` },
  { name: 'Auth Token', layer: 'application', code: `protocol AuthToken {
  field token_type: uint8
  field expiry: uint32
  field signature: bytes[64]
  field payload: bytes
}` },
]

export function Templates() {
  const { t } = useI18n()
  const navigate = useNavigate()

  const useTemplate = (code: string) => {
    localStorage.setItem('psl-editor-content', code)
    navigate('/editor')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('templatesTitle')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((tpl) => (
          <Card key={tpl.name}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                {tpl.name}
                <Badge variant="secondary">{tpl.layer}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">{tpl.code}</pre>
              <Button size="sm" onClick={() => useTemplate(tpl.code)}>{t('useTemplate')}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
