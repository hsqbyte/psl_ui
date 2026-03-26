import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useI18n } from '@/i18n'

interface FieldChange { field: string; change: 'added' | 'removed' | 'modified'; breaking: boolean; detail: string }

const VERSION_DATA: Record<string, { versions: string[]; changes: Record<string, FieldChange[]> }> = {
  TCP: {
    versions: ['1.0', '2.0', '3.0'],
    changes: {
      '1.0→2.0': [
        { field: 'ECN Flags', change: 'added', breaking: false, detail: 'Added ECN support bits' },
        { field: 'Reserved', change: 'modified', breaking: true, detail: 'Reduced from 6 to 3 bits' },
      ],
      '2.0→3.0': [
        { field: 'Auth Option', change: 'added', breaking: false, detail: 'TCP-AO authentication' },
      ],
    },
  },
  HTTP: {
    versions: ['1.0', '1.1', '2.0'],
    changes: {
      '1.0→1.1': [
        { field: 'Host Header', change: 'added', breaking: false, detail: 'Required Host header' },
        { field: 'Connection', change: 'modified', breaking: true, detail: 'Default keep-alive' },
      ],
      '1.1→2.0': [
        { field: 'Frame Header', change: 'added', breaking: true, detail: 'Binary framing layer' },
        { field: 'Text Headers', change: 'removed', breaking: true, detail: 'Replaced by HPACK' },
        { field: 'Stream ID', change: 'added', breaking: false, detail: 'Multiplexing support' },
      ],
    },
  },
  TLS: {
    versions: ['1.0', '1.2', '1.3'],
    changes: {
      '1.0→1.2': [
        { field: 'PRF', change: 'modified', breaking: true, detail: 'SHA-256 based PRF' },
      ],
      '1.2→1.3': [
        { field: 'Key Exchange', change: 'modified', breaking: true, detail: 'Only ephemeral DH/ECDH' },
        { field: 'Session Resumption', change: 'removed', breaking: true, detail: 'Replaced by PSK' },
        { field: '0-RTT Data', change: 'added', breaking: false, detail: 'Early data support' },
      ],
    },
  },
}

const CHANGE_STYLE = { added: 'bg-green-500/15 text-green-700', removed: 'bg-red-500/15 text-red-700', modified: 'bg-yellow-500/15 text-yellow-700' }

export function VersionCompare() {
  const { t } = useI18n()
  const protoNames = Object.keys(VERSION_DATA)
  const [proto, setProto] = useState(protoNames[0])
  const data = VERSION_DATA[proto]
  const versions = data.versions
  const [v1, setV1] = useState(versions[0])
  const [v2, setV2] = useState(versions[1])
  const key = `${v1}→${v2}`
  const changes = data.changes[key] ?? []

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('versionCompareTitle')}</h2>
      <div className="flex gap-4 flex-wrap">
        <Select value={proto} onValueChange={(v) => { if (!v) return; setProto(v); const d = VERSION_DATA[v]; setV1(d.versions[0]); setV2(d.versions[1]) }}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{protoNames.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={v1} onValueChange={(v) => v && setV1(v)}>
          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>{versions.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
        <span className="self-center text-muted-foreground">→</span>
        <Select value={v2} onValueChange={(v) => v && setV2(v)}>
          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>{versions.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader><CardTitle>Changes: {key}</CardTitle></CardHeader>
        <CardContent>
          {changes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No changes for this version pair.</p>
          ) : (
            <div className="space-y-2">
              {changes.map((c, i) => (
                <div key={i} className={`p-2 rounded text-sm ${CHANGE_STYLE[c.change]}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.field}</span>
                    <Badge variant="outline">{c.change}</Badge>
                    {c.breaking && <Badge variant="destructive">Breaking</Badge>}
                  </div>
                  <p className="text-xs mt-1 opacity-80">{c.detail}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
