import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/shared/i18n'

const mockMessages = [
  { id: 1, dir: 'in', ts: '14:30:01', data: '{"type":"subscribe","channel":"tcp"}' },
  { id: 2, dir: 'out', ts: '14:30:01', data: '{"type":"ack","status":"ok"}' },
  { id: 3, dir: 'in', ts: '14:30:05', data: '{"type":"update","protocol":"TCP","field":"flags"}' },
  { id: 4, dir: 'out', ts: '14:30:05', data: '{"type":"ack","status":"ok"}' },
  { id: 5, dir: 'in', ts: '14:30:12', data: '{"type":"ping"}' },
  { id: 6, dir: 'out', ts: '14:30:12', data: '{"type":"pong"}' },
]

export function WebSocket() {
  const { t } = useI18n()
  const [connected, setConnected] = useState(true)
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('websocketTitle')}</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Connection Status
            <Badge variant={connected ? 'default' : 'destructive'}>{connected ? 'Connected' : 'Disconnected'}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground">ws://localhost:8080/ws</div>
          <Button size="sm" variant="outline" onClick={() => setConnected(!connected)}>
            {connected ? 'Disconnect' : 'Connect'}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Message Log</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1 font-mono text-xs max-h-64 overflow-auto">
            {mockMessages.map((m) => (
              <div key={m.id} className="flex gap-2">
                <span className="text-muted-foreground">{m.ts}</span>
                <Badge variant={m.dir === 'in' ? 'default' : 'secondary'}>{m.dir === 'in' ? '←' : '→'}</Badge>
                <span>{m.data}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
