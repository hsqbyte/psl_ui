import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

interface Activity {
  id: number
  type: 'created' | 'edited' | 'commented' | 'shared' | 'bookmarked'
  protocol: string
  user: string
  timestamp: string
  detail: string
}

const mockActivities: Activity[] = [
  { id: 1, type: 'created', protocol: 'WebRTC_DC', user: 'alice', timestamp: '2025-01-15T14:30:00Z', detail: 'Created WebRTC Data Channel protocol definition' },
  { id: 2, type: 'edited', protocol: 'TCP', user: 'bob', timestamp: '2025-01-15T13:15:00Z', detail: 'Updated flags field documentation' },
  { id: 3, type: 'commented', protocol: 'HTTP', user: 'carol', timestamp: '2025-01-15T12:00:00Z', detail: 'Added comment about HTTP/3 support' },
  { id: 4, type: 'shared', protocol: 'MQTT', user: 'dave', timestamp: '2025-01-15T11:30:00Z', detail: 'Shared MQTT protocol with IoT team' },
  { id: 5, type: 'edited', protocol: 'DNS', user: 'eve', timestamp: '2025-01-15T10:00:00Z', detail: 'Added EDNS0 extension fields' },
  { id: 6, type: 'bookmarked', protocol: 'TLS', user: 'frank', timestamp: '2025-01-14T16:00:00Z', detail: 'Bookmarked TLS protocol' },
  { id: 7, type: 'created', protocol: 'QUIC', user: 'grace', timestamp: '2025-01-14T14:00:00Z', detail: 'Created QUIC protocol definition' },
  { id: 8, type: 'commented', protocol: 'IPv6', user: 'alice', timestamp: '2025-01-14T11:00:00Z', detail: 'Discussed extension header handling' },
  { id: 9, type: 'edited', protocol: 'UDP', user: 'bob', timestamp: '2025-01-14T09:30:00Z', detail: 'Clarified checksum calculation' },
  { id: 10, type: 'shared', protocol: 'CoAP', user: 'carol', timestamp: '2025-01-13T15:00:00Z', detail: 'Shared CoAP with embedded team' },
]

const typeIcons: Record<Activity['type'], string> = {
  created: '🆕',
  edited: '✏️',
  commented: '💬',
  shared: '🔗',
  bookmarked: '⭐',
}

const typeColors: Record<Activity['type'], string> = {
  created: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  edited: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  commented: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  shared: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  bookmarked: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
}

export function Activity() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('activityTitle')}</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {mockActivities.map((a) => (
            <div key={a.id} className="relative pl-10">
              <div className="absolute left-2.5 top-3 w-3 h-3 rounded-full bg-primary" />
              <Card>
                <CardContent className="py-3 px-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{typeIcons[a.type]}</span>
                    <Badge variant="secondary" className={typeColors[a.type]}>{a.type}</Badge>
                    <Badge variant="outline">{a.protocol}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{new Date(a.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-sm">{a.detail}</p>
                  <p className="text-xs text-muted-foreground mt-1">by {a.user}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
