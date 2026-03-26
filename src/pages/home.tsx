import { useState } from 'react'
import { Link } from 'react-router-dom'
import { protocols, layers, layerLabels } from '@/data/protocols'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/i18n'

const layerColors: Record<string, string> = {
  link: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  network: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  transport: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  application: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

export function Home() {
  const [query, setQuery] = useState('')
  const { t } = useI18n()

  const filtered = protocols.filter((p) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.rfc && p.rfc.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t('protocols')}</h2>
        <p className="text-muted-foreground">{protocols.length} {t('available')}</p>
      </div>
      <Input
        placeholder={t('searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">{t('all')}</TabsTrigger>
          {layers.map((l) => (
            <TabsTrigger key={l} value={l}>{layerLabels[l]}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <ProtocolGrid protocols={filtered} noResults={t('noResults')} />
        </TabsContent>
        {layers.map((l) => (
          <TabsContent key={l} value={l}>
            <ProtocolGrid protocols={filtered.filter((p) => p.layer === l)} noResults={t('noResults')} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ProtocolGrid({ protocols: items, noResults }: { protocols: typeof protocols; noResults: string }) {
  if (items.length === 0) return <p className="text-muted-foreground py-8">{noResults}</p>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {items.map((p) => (
        <Link key={p.name} to={`/protocol/${p.name}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <Badge variant="secondary" className={layerColors[p.layer]}>{layerLabels[p.layer]}</Badge>
              </div>
              <CardDescription>{p.description}</CardDescription>
              {p.rfc && <span className="text-xs text-muted-foreground">{p.rfc}</span>}
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
