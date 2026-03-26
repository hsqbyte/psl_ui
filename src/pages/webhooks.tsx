import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/shared/i18n'

const events = ['protocol.created', 'protocol.updated', 'protocol.deleted', 'build.completed', 'deploy.finished']

const logs = [
  { id: 1, event: 'protocol.updated', url: 'https://hook.example.com/psl', status: 200, ts: '14:30:01' },
  { id: 2, event: 'build.completed', url: 'https://hook.example.com/ci', status: 200, ts: '14:28:15' },
  { id: 3, event: 'protocol.created', url: 'https://hook.example.com/psl', status: 500, ts: '14:25:00' },
  { id: 4, event: 'deploy.finished', url: 'https://hook.example.com/deploy', status: 200, ts: '14:20:30' },
]

export function Webhooks() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('webhooksTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Configure Webhook</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <input className="w-full border rounded px-3 py-2 text-sm" placeholder="https://your-server.com/webhook" />
          <div className="flex flex-wrap gap-2">
            {events.map((e) => <Badge key={e} variant="outline" className="cursor-pointer hover:bg-accent">{e}</Badge>)}
          </div>
          <Button size="sm">Save Webhook</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Delivery Log</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Time</th><th className="text-left py-2">Event</th><th className="text-left py-2">URL</th><th className="text-left py-2">Status</th></tr></thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="border-b last:border-0">
                  <td className="py-2 text-xs">{l.ts}</td>
                  <td className="py-2"><Badge variant="secondary">{l.event}</Badge></td>
                  <td className="py-2 font-mono text-xs">{l.url}</td>
                  <td className="py-2"><Badge variant={l.status === 200 ? 'default' : 'destructive'}>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
