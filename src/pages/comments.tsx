import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'
import { useI18n } from '@/shared/i18n'

interface Comment {
  id: number
  author: string
  text: string
  timestamp: string
}

const initialComments: Record<string, Comment[]> = {
  TCP: [
    { id: 1, author: 'alice', text: 'The flags field could use more documentation.', timestamp: '2025-01-15T10:30:00Z' },
    { id: 2, author: 'bob', text: 'Agreed, especially the ECE and CWR bits.', timestamp: '2025-01-15T11:00:00Z' },
  ],
  HTTP: [
    { id: 1, author: 'carol', text: 'Should we add HTTP/3 as a separate protocol?', timestamp: '2025-01-14T09:00:00Z' },
  ],
}

export function Comments() {
  const { t } = useI18n()
  const { name = '' } = useParams<{ name: string }>()
  const [comments, setComments] = useState<Record<string, Comment[]>>(initialComments)
  const [newComment, setNewComment] = useState('')

  const list = comments[name] || []

  const addComment = () => {
    if (!newComment.trim()) return
    const c: Comment = { id: Date.now(), author: 'you', text: newComment, timestamp: new Date().toISOString() }
    setComments((prev) => ({ ...prev, [name]: [...(prev[name] || []), c] }))
    setNewComment('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/protocol/${name}`}><Button variant="ghost">{t('backToList')}</Button></Link>
        <h2 className="text-2xl font-bold">{t('commentsTitle')}: {name}</h2>
      </div>
      <div className="space-y-3">
        {list.length === 0 && <p className="text-muted-foreground">{t('noComments')}</p>}
        {list.map((c) => (
          <Card key={c.id}>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>{c.author}</span>
                <span className="text-xs text-muted-foreground">{new Date(c.timestamp).toLocaleString()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm">{c.text}</p></CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        <Textarea placeholder={t('addComment')} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <Button onClick={addComment}>{t('submitComment')}</Button>
      </div>
    </div>
  )
}
