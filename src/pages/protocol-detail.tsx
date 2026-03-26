import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { protocols, layerLabels } from '@/data/protocols'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExportButton } from '@/components/export-button'
import { ShareDialog } from '@/components/share-dialog'
import { toggleBookmark, isBookmarked } from '@/pages/bookmarks'
import { useI18n } from '@/i18n'

const layerColors: Record<string, string> = {
  link: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  network: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  transport: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  application: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

export function ProtocolDetail() {
  const { name } = useParams<{ name: string }>()
  const { t } = useI18n()
  const protocol = protocols.find((p) => p.name === name)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    if (name) setBookmarked(isBookmarked(name))
    const handler = () => { if (name) setBookmarked(isBookmarked(name)) }
    window.addEventListener('bookmarks-changed', handler)
    return () => window.removeEventListener('bookmarks-changed', handler)
  }, [name])

  if (!protocol) {
    return (
      <div className="space-y-4">
        <Link to="/"><Button variant="ghost">{t('backToList')}</Button></Link>
        <p className="text-muted-foreground">Protocol not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6" id="protocol-detail">
      <div className="flex items-center justify-between">
        <Link to="/"><Button variant="ghost">{t('backToList')}</Button></Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { toggleBookmark(protocol.name); setBookmarked(!bookmarked) }}>
            {bookmarked ? '⭐' : '☆'} {t('bookmarksTitle')}
          </Button>
          <ShareDialog protocolName={protocol.name} />
          <ExportButton targetId="protocol-detail" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">{protocol.name}</h2>
        <Badge variant="secondary" className={layerColors[protocol.layer]}>{layerLabels[protocol.layer]}</Badge>
      </div>
      <p className="text-muted-foreground">{protocol.description}</p>
      {protocol.rfc && (
        <p className="text-sm text-muted-foreground">{protocol.rfc}</p>
      )}
      {protocol.dependsOn.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{t('dependsOn')}:</span>
          {protocol.dependsOn.map((d) => (
            <Link key={d} to={`/protocol/${d}`}>
              <Badge variant="outline">{d}</Badge>
            </Link>
          ))}
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{t('fields')}</CardTitle>
        </CardHeader>
        <CardContent>
          {!protocol.fields || protocol.fields.length === 0 ? (
            <p className="text-muted-foreground">{t('noFields')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">{t('fieldName')}</th>
                    <th className="text-left py-2 pr-4 font-medium">{t('fieldType')}</th>
                    <th className="text-left py-2 pr-4 font-medium">{t('fieldBits')}</th>
                    <th className="text-left py-2 font-medium">{t('fieldDescription')}</th>
                  </tr>
                </thead>
                <tbody>
                  {protocol.fields.map((f) => (
                    <tr key={f.name} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-mono">{f.name}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{f.type}</td>
                      <td className="py-2 pr-4">{f.bits || '—'}</td>
                      <td className="py-2 text-muted-foreground">{f.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
