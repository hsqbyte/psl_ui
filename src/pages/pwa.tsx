import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const status = [
  { feature: 'Service Worker', status: 'active' },
  { feature: 'Manifest', status: 'configured' },
  { feature: 'HTTPS', status: 'active' },
  { feature: 'Offline Mode', status: 'partial' },
  { feature: 'Push Notifications', status: 'disabled' },
]
const cache = [
  { resource: 'Protocol definitions', size: '2.4 MB', cached: true },
  { resource: 'UI assets', size: '850 KB', cached: true },
  { resource: 'API responses', size: '1.2 MB', cached: true },
  { resource: 'User data', size: '120 KB', cached: false },
]

export function Pwa() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('pwaTitle')}</h2>
      <Badge variant="default" className="cursor-pointer px-4 py-1">📲 Install App</Badge>
      <Card>
        <CardHeader><CardTitle>PWA Status</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {status.map((s) => (
            <div key={s.feature} className="flex justify-between text-sm">
              <span>{s.feature}</span>
              <Badge variant={s.status === 'active' || s.status === 'configured' ? 'default' : s.status === 'partial' ? 'secondary' : 'outline'}>{s.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Offline Cache</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {cache.map((c) => (
            <div key={c.resource} className="flex justify-between text-sm">
              <span>{c.resource} <span className="text-muted-foreground text-xs">({c.size})</span></span>
              <Badge variant={c.cached ? 'default' : 'outline'}>{c.cached ? 'Cached' : 'Not cached'}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
