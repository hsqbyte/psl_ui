import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const lines = [
  { type: 'cmd', text: '$ psl validate ethernet.psl' },
  { type: 'out', text: '✓ Validation passed (0 errors, 0 warnings)' },
  { type: 'cmd', text: '$ psl list --layer transport' },
  { type: 'out', text: 'TCP    - Transmission Control Protocol (20+ bytes)' },
  { type: 'out', text: 'UDP    - User Datagram Protocol (8 bytes)' },
  { type: 'out', text: 'SCTP   - Stream Control Transmission Protocol' },
  { type: 'cmd', text: '$ psl export tcp --format json' },
  { type: 'out', text: '{"name":"TCP","fields":[{"name":"src_port","bits":16},{"name":"dst_port","bits":16},...]}' },
  { type: 'cmd', text: '$ psl stats' },
  { type: 'out', text: 'Protocols: 27 | Fields: 342 | Layers: 4' },
]

export function CliIntegration() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('cliIntegrationTitle')}</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Terminal <Badge>PSL CLI v1.0.0</Badge></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-950 text-green-400 rounded p-4 font-mono text-xs space-y-1 max-h-80 overflow-auto">
            {lines.map((l, i) => (
              <div key={i} className={l.type === 'cmd' ? 'text-white font-bold' : 'text-green-400'}>
                {l.text}
              </div>
            ))}
            <div className="text-white animate-pulse">$ █</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
