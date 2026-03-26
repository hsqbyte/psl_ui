import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { protocols } from '@/entities/protocol/model'
import { useI18n } from '@/shared/i18n'

function getBookmarks(): string[] {
  try { return JSON.parse(localStorage.getItem('psl-bookmarks') || '[]') } catch { return [] }
}

export function toggleBookmark(name: string) {
  const bm = getBookmarks()
  const next = bm.includes(name) ? bm.filter((b) => b !== name) : [...bm, name]
  localStorage.setItem('psl-bookmarks', JSON.stringify(next))
  window.dispatchEvent(new Event('bookmarks-changed'))
  return next
}

export function isBookmarked(name: string): boolean {
  return getBookmarks().includes(name)
}

export function Bookmarks() {
  const { t } = useI18n()
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks)

  useEffect(() => {
    const handler = () => setBookmarks(getBookmarks())
    window.addEventListener('bookmarks-changed', handler)
    return () => window.removeEventListener('bookmarks-changed', handler)
  }, [])

  const bookmarkedProtocols = protocols.filter((p) => bookmarks.includes(p.name))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('bookmarksTitle')}</h2>
      {bookmarkedProtocols.length === 0 ? (
        <p className="text-muted-foreground">{t('noBookmarks')}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarkedProtocols.map((p) => (
            <Card key={p.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <Link to={`/protocol/${p.name}`} className="hover:underline">{p.name}</Link>
                  <Button variant="ghost" size="sm" onClick={() => toggleBookmark(p.name)}>🗑️</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <Badge variant="secondary" className="mt-2">{p.layer}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
