import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const doc = `# TCP Protocol

## Overview
Transmission Control Protocol provides reliable, ordered delivery of data.

## Fields
| Field | Type | Bits | Description |
|-------|------|------|-------------|
| src_port | uint16 | 16 | Source port |
| dst_port | uint16 | 16 | Destination port |
| seq_num | uint32 | 32 | Sequence number |
| flags | uint8 | 8 | Control flags |`

const protocols = [
  { name: 'TCP', status: 'generated', fields: 12 },
  { name: 'UDP', status: 'generated', fields: 4 },
  { name: 'HTTP', status: 'pending', fields: 8 },
  { name: 'DNS', status: 'generated', fields: 10 },
]

export function AutoDocs() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('autoDocsTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Protocol Documentation Status</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {protocols.map((p) => (
            <div key={p.name} className="flex justify-between text-sm">
              <span>{p.name} ({p.fields} fields)</span>
              <Badge variant={p.status === 'generated' ? 'default' : 'outline'}>{p.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Preview — TCP</CardTitle></CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap">{doc}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
