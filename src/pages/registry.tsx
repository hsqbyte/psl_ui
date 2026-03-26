import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const packages = [
  { name: 'psl-ethernet', version: '1.2.0', desc: 'Ethernet frame definitions', downloads: 12400 },
  { name: 'psl-tcp', version: '2.0.1', desc: 'TCP protocol with all options', downloads: 9800 },
  { name: 'psl-http2', version: '1.0.0', desc: 'HTTP/2 frame definitions', downloads: 5600 },
  { name: 'psl-mqtt', version: '1.1.0', desc: 'MQTT v5 protocol', downloads: 3200 },
  { name: 'psl-dns', version: '1.3.0', desc: 'DNS query/response', downloads: 7100 },
  { name: 'psl-tls', version: '1.0.2', desc: 'TLS 1.3 handshake', downloads: 4500 },
]

export function Registry() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('registryTitle')}</h2>
      <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Search packages..." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((p) => (
          <Card key={p.name}>
            <CardHeader><CardTitle className="text-base flex items-center gap-2">{p.name}<Badge>{p.version}</Badge></CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">⬇ {p.downloads.toLocaleString()}</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">psl install {p.name}</code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
