import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const langs: Record<string, string> = {
  Go: `import "github.com/psl-lang/psl-go"\n\nclient := psl.NewClient("localhost:8080")\nprotos, _ := client.ListProtocols()\nfor _, p := range protos {\n  fmt.Println(p.Name)\n}`,
  Python: `from psl import Client\n\nclient = Client("localhost:8080")\nfor p in client.list_protocols():\n    print(p.name)`,
  Rust: `use psl_sdk::Client;\n\nlet client = Client::new("localhost:8080");\nlet protos = client.list_protocols().await?;\nfor p in protos {\n    println!("{}", p.name);\n}`,
  TypeScript: `import { PslClient } from '@psl/sdk'\n\nconst client = new PslClient('localhost:8080')\nconst protos = await client.listProtocols()\nprotos.forEach(p => console.log(p.name))`,
}

export function SdkDocs() {
  const { t } = useI18n()
  const [tab, setTab] = useState('Go')
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('sdkDocsTitle')}</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            SDK Examples
            <div className="flex gap-1 ml-auto">
              {Object.keys(langs).map((l) => (
                <Button key={l} size="sm" variant={tab === l ? 'default' : 'outline'} onClick={() => setTab(l)}>{l}</Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted rounded p-4 text-xs overflow-auto">{langs[tab]}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
