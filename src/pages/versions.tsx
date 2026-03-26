import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

interface Version {
  id: number
  version: string
  protocol: string
  author: string
  date: string
  changes: string
}

const mockVersions: Version[] = [
  { id: 1, version: 'v1.0.0', protocol: 'TCP', author: 'alice', date: '2025-01-01', changes: 'Initial definition' },
  { id: 2, version: 'v1.1.0', protocol: 'TCP', author: 'bob', date: '2025-01-10', changes: 'Added ECE/CWR flags documentation' },
  { id: 3, version: 'v1.2.0', protocol: 'TCP', author: 'alice', date: '2025-01-15', changes: 'Updated checksum description' },
  { id: 4, version: 'v1.0.0', protocol: 'HTTP', author: 'carol', date: '2025-01-05', changes: 'Initial HTTP definition' },
  { id: 5, version: 'v1.1.0', protocol: 'HTTP', author: 'dave', date: '2025-01-12', changes: 'Added header fields' },
]

export function Versions() {
  const { t } = useI18n()
  const [versions, setVersions] = useState<Version[]>(mockVersions)
  const [filter, setFilter] = useState('')
  const [diffPair, setDiffPair] = useState<[number, number] | null>(null)

  const filtered = filter ? versions.filter((v) => v.protocol === filter) : versions
  const protocols = [...new Set(versions.map((v) => v.protocol))]

  const createVersion = () => {
    const proto = filter || 'TCP'
    const existing = versions.filter((v) => v.protocol === proto)
    const nextVer = `v1.${existing.length}.0`
    setVersions((prev) => [...prev, {
      id: Date.now(), version: nextVer, protocol: proto, author: 'you', date: new Date().toISOString().split('T')[0], changes: 'New version',
    }])
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('versionsTitle')}</h2>
      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === '' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('')}>{t('all')}</Button>
        {protocols.map((p) => (
          <Button key={p} variant={filter === p ? 'default' : 'outline'} size="sm" onClick={() => setFilter(p)}>{p}</Button>
        ))}
        <Button size="sm" onClick={createVersion}>{t('createVersion')}</Button>
      </div>
      <div className="space-y-3">
        {filtered.map((v) => (
          <Card key={v.id} className={diffPair?.includes(v.id) ? 'ring-2 ring-primary' : ''}>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm flex items-center gap-2">
                <Badge>{v.version}</Badge>
                <Badge variant="secondary">{v.protocol}</Badge>
                <span className="text-muted-foreground ml-auto text-xs">{v.date} — {v.author}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm">{v.changes}</p>
              <Button variant="ghost" size="sm" onClick={() => {
                if (!diffPair) setDiffPair([v.id, 0])
                else if (diffPair[1] === 0) setDiffPair([diffPair[0], v.id])
                else setDiffPair(null)
              }}>{t('diffTitle')}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {diffPair && diffPair[1] !== 0 && (
        <Card>
          <CardHeader><CardTitle className="text-sm">{t('versionDiff')}</CardTitle></CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded">
              {`- ${versions.find((v) => v.id === diffPair[0])?.changes || ''}\n+ ${versions.find((v) => v.id === diffPair[1])?.changes || ''}`}
            </pre>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => setDiffPair(null)}>Close</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
