import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { protocols } from '@/data/protocols'
import { useI18n } from '@/i18n'

export function ImportExport() {
  const { t } = useI18n()
  const fileRef = useRef<HTMLInputElement>(null)
  const [importedContent, setImportedContent] = useState('')
  const [selectedProtocol, setSelectedProtocol] = useState(protocols[0]?.name || '')
  const [exportFormat, setExportFormat] = useState<'psl' | 'json' | 'protobuf'>('psl')

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImportedContent(ev.target?.result as string || '')
    reader.readAsText(file)
  }

  const handleExport = () => {
    const proto = protocols.find((p) => p.name === selectedProtocol)
    if (!proto) return
    let content: string
    let ext: string
    if (exportFormat === 'json') {
      content = JSON.stringify(proto, null, 2)
      ext = 'json'
    } else if (exportFormat === 'protobuf') {
      const fields = proto.fields?.map((f, i) => `  ${f.type} ${f.name.toLowerCase().replace(/\s+/g, '_')} = ${i + 1};`).join('\n') || ''
      content = `syntax = "proto3";\n\nmessage ${proto.name} {\n${fields}\n}`
      ext = 'proto'
    } else {
      const fields = proto.fields?.map((f) => `  field ${f.name.toLowerCase().replace(/\s+/g, '_')}: ${f.type}`).join('\n') || ''
      content = `protocol ${proto.name} {\n${fields}\n}`
      ext = 'psl'
    }
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${proto.name.toLowerCase()}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('importExportTitle')}</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>{t('importPsl')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <input ref={fileRef} type="file" accept=".psl,.txt" onChange={handleImport} className="hidden" />
            <Button variant="outline" onClick={() => fileRef.current?.click()}>{t('chooseFile')}</Button>
            {importedContent && (
              <pre className="text-xs bg-muted p-3 rounded overflow-x-auto max-h-64">{importedContent}</pre>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t('exportProtocol')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('selectProtocol')}</label>
              <select value={selectedProtocol} onChange={(e) => setSelectedProtocol(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm bg-background">
                {protocols.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('format')}</label>
              <div className="flex gap-2">
                {(['psl', 'json', 'protobuf'] as const).map((fmt) => (
                  <Button key={fmt} variant={exportFormat === fmt ? 'default' : 'outline'} size="sm"
                    onClick={() => setExportFormat(fmt)}>{fmt.toUpperCase()}</Button>
                ))}
              </div>
            </div>
            <Button onClick={handleExport}>{t('download')}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
