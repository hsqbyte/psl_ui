import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const plugins = [
  { id: 1, name: 'PSL Linter', desc: 'Advanced linting rules for PSL files', author: 'psl-team', installed: true },
  { id: 2, name: 'PCAP Exporter', desc: 'Export protocols to PCAP format', author: 'alice', installed: false },
  { id: 3, name: 'Diagram Themes', desc: 'Custom color themes for diagrams', author: 'bob', installed: true },
  { id: 4, name: 'Auto Docs', desc: 'Generate documentation from PSL', author: 'carol', installed: false },
  { id: 5, name: 'Protocol Metrics', desc: 'Collect protocol usage metrics', author: 'dave', installed: false },
  { id: 6, name: 'Git Sync', desc: 'Sync protocols with Git repos', author: 'eve', installed: true },
]

export function PluginMarket() {
  const { t } = useI18n()
  const [items, setItems] = useState(plugins)
  const toggle = (id: number) => setItems(items.map((p) => p.id === id ? { ...p, installed: !p.installed } : p))
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('pluginMarketTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <Card key={p.id}>
            <CardHeader><CardTitle className="text-base">{p.name}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">by {p.author}</Badge>
                <Button size="sm" variant={p.installed ? 'destructive' : 'default'} onClick={() => toggle(p.id)}>
                  {p.installed ? 'Uninstall' : 'Install'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
