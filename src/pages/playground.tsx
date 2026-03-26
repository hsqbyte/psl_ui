import { useState } from 'react'
import { protocols } from '@/data/protocols'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { HexViewer } from '@/components/hex-viewer'
import { useI18n } from '@/i18n'

function jsonToHex(json: string): string {
  try {
    const obj = JSON.parse(json)
    const str = JSON.stringify(obj)
    return Array.from(new TextEncoder().encode(str))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ')
  } catch {
    return 'Invalid JSON'
  }
}

function hexToJson(hex: string): string {
  try {
    const bytes = hex.trim().split(/\s+/).map((h) => parseInt(h, 16))
    if (bytes.some(isNaN)) return 'Invalid hex'
    const str = new TextDecoder().decode(new Uint8Array(bytes))
    return JSON.stringify(JSON.parse(str), null, 2)
  } catch {
    return 'Invalid hex data'
  }
}

export function Playground() {
  const { t } = useI18n()
  const [protocol, setProtocol] = useState('')
  const [jsonInput, setJsonInput] = useState('{\n  "type": 1,\n  "length": 64\n}')
  const [hexInput, setHexInput] = useState('')
  const [encodedHex, setEncodedHex] = useState('')
  const [decodedJson, setDecodedJson] = useState('')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('playgroundTitle')}</h2>

      <div className="max-w-xs">
        <Label>{t('selectProtocol')}</Label>
        <Select value={protocol} onValueChange={(v) => v && setProtocol(v)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={t('selectProtocol')} />
          </SelectTrigger>
          <SelectContent>
            {protocols.map((p) => (
              <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>{t('encode')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Label>JSON {t('input')}</Label>
            <Textarea
              className="font-mono text-sm min-h-[120px]"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <Button onClick={() => setEncodedHex(jsonToHex(jsonInput))}>{t('encode')}</Button>
            {encodedHex && (
              <div className="mt-2">
                <Label>Hex {t('output')}</Label>
                <pre className="bg-muted p-3 rounded text-xs font-mono mt-1 break-all">{encodedHex}</pre>
                {encodedHex !== 'Invalid JSON' && (
                  <div className="mt-3">
                    <HexViewer data={encodedHex.split(' ').map((h) => parseInt(h, 16))} />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('decode')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Label>Hex {t('input')}</Label>
            <Textarea
              className="font-mono text-sm min-h-[120px]"
              placeholder="7b 22 74 79 70 65 22 ..."
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
            />
            <Button onClick={() => setDecodedJson(hexToJson(hexInput))}>{t('decode')}</Button>
            {decodedJson && (
              <div className="mt-2">
                <Label>JSON {t('output')}</Label>
                <pre className="bg-muted p-3 rounded text-xs font-mono mt-1 whitespace-pre-wrap">{decodedJson}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
