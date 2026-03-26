import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'
import { useState } from 'react'

const sdks: Record<string, string> = {
  Go: 'import "github.com/psl/sdk-go"\n\npkt := sdk.NewTCPPacket()\npkt.SetSrcPort(443)\ndata := pkt.Encode()',
  Python: 'from psl_sdk import TCP\n\npkt = TCP(src_port=443)\ndata = pkt.encode()',
  Rust: 'use psl_sdk::tcp::TcpPacket;\n\nlet pkt = TcpPacket::new()\n  .src_port(443)\n  .build();',
  JS: 'import { TCP } from "@psl/sdk";\n\nconst pkt = new TCP({ srcPort: 443 });\nconst buf = pkt.encode();',
}

export function SdkPreview() {
  const { t } = useI18n()
  const [lang, setLang] = useState('Go')
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('sdkPreviewTitle')}</h2>
      <div className="flex gap-2">
        {Object.keys(sdks).map((l) => (
          <Badge key={l} variant={l === lang ? 'default' : 'outline'} className="cursor-pointer px-3 py-1" onClick={() => setLang(l)}>{l}</Badge>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>SDK Example — {lang}</CardTitle></CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-xs font-mono whitespace-pre-wrap">{sdks[lang]}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
