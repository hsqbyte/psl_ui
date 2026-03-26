import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'
import { useState } from 'react'

const langs: Record<string, string> = {
  Go: 'type TCPHeader struct {\n  SrcPort  uint16\n  DstPort  uint16\n  SeqNum   uint32\n  Flags    uint8\n}',
  Rust: 'pub struct TcpHeader {\n  pub src_port: u16,\n  pub dst_port: u16,\n  pub seq_num: u32,\n  pub flags: u8,\n}',
  Python: 'class TCPHeader:\n  src_port: int\n  dst_port: int\n  seq_num: int\n  flags: int',
  TypeScript: 'interface TCPHeader {\n  srcPort: number;\n  dstPort: number;\n  seqNum: number;\n  flags: number;\n}',
}

export function CodegenPreview() {
  const { t } = useI18n()
  const [lang, setLang] = useState('Go')
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('codegenTitle')}</h2>
      <div className="flex gap-2">
        {Object.keys(langs).map((l) => (
          <Badge key={l} variant={l === lang ? 'default' : 'outline'} className="cursor-pointer px-3 py-1" onClick={() => setLang(l)}>{l}</Badge>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Generated Code — {lang}</CardTitle></CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap">{langs[lang]}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
