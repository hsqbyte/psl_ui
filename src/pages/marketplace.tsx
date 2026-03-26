import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const packages = [
  { name: 'psl-http3', author: 'alice', downloads: 1240, version: '1.2.0', tag: 'transport' },
  { name: 'psl-grpc', author: 'bob', downloads: 890, version: '0.9.1', tag: 'rpc' },
  { name: 'psl-websocket', author: 'carol', downloads: 2100, version: '2.0.0', tag: 'realtime' },
  { name: 'psl-mqtt5', author: 'dave', downloads: 560, version: '1.0.0', tag: 'iot' },
]
const fields = ['Package Name', 'Version', 'Description', 'License']

export function Marketplace() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('marketplaceTitle')}</h2>
      <div className="h-9 rounded border bg-muted px-3 flex items-center text-sm text-muted-foreground">Search packages...</div>
      <div className="grid md:grid-cols-2 gap-4">
        {packages.map((p) => (
          <Card key={p.name}>
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold font-mono">{p.name}</span>
                <Badge variant="outline">{p.version}</Badge>
              </div>
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span>by {p.author}</span><span>•</span><span>{p.downloads} downloads</span>
              </div>
              <Badge variant="secondary">{p.tag}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Publish Package</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {fields.map((f) => (
            <div key={f} className="space-y-1">
              <label className="text-sm font-medium">{f}</label>
              <div className="h-9 rounded border bg-muted px-3 flex items-center text-xs text-muted-foreground">Enter {f.toLowerCase()}...</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
