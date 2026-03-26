import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/shared/i18n'

interface Field {
  id: number
  name: string
  type: string
  bits: number
}

const fieldTypes = ['uint8', 'uint16', 'uint32', 'uint64', 'int8', 'int16', 'int32', 'float32', 'bytes', 'string', 'bool']

export function CustomEditor() {
  const { t } = useI18n()
  const [protoName, setProtoName] = useState('MyProtocol')
  const [fields, setFields] = useState<Field[]>([
    { id: 1, name: 'version', type: 'uint8', bits: 8 },
    { id: 2, name: 'length', type: 'uint16', bits: 16 },
  ])
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const addField = () => {
    setFields((prev) => [...prev, { id: Date.now(), name: 'new_field', type: 'uint8', bits: 8 }])
  }

  const removeField = (id: number) => setFields((prev) => prev.filter((f) => f.id !== id))

  const updateField = (id: number, key: keyof Field, value: string | number) => {
    setFields((prev) => prev.map((f) => f.id === id ? { ...f, [key]: value } : f))
  }

  const handleDragStart = (idx: number) => setDragIdx(idx)
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === idx) return
    setFields((prev) => {
      const next = [...prev]
      const [moved] = next.splice(dragIdx, 1)
      next.splice(idx, 0, moved)
      return next
    })
    setDragIdx(idx)
  }
  const handleDragEnd = () => setDragIdx(null)

  const pslPreview = useCallback(() => {
    const lines = fields.map((f) => `  field ${f.name}: ${f.type}`)
    return `protocol ${protoName} {\n${lines.join('\n')}\n}`
  }, [protoName, fields])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('customEditorTitle')}</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>{t('fieldDesigner')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium">{t('protocolLabel')}:</span>
              <Input value={protoName} onChange={(e) => setProtoName(e.target.value)} className="max-w-xs" />
            </div>
            <div className="space-y-2">
              {fields.map((f, idx) => (
                <div key={f.id} draggable onDragStart={() => handleDragStart(idx)} onDragOver={(e) => handleDragOver(e, idx)} onDragEnd={handleDragEnd}
                  className="flex gap-2 items-center p-2 border rounded cursor-move bg-background hover:bg-muted">
                  <span className="text-muted-foreground">⠿</span>
                  <Input value={f.name} onChange={(e) => updateField(f.id, 'name', e.target.value)} className="flex-1" />
                  <select value={f.type} onChange={(e) => updateField(f.id, 'type', e.target.value)}
                    className="border rounded px-2 py-1 text-sm bg-background">
                    {fieldTypes.map((ft) => <option key={ft} value={ft}>{ft}</option>)}
                  </select>
                  <Button variant="ghost" size="sm" onClick={() => removeField(f.id)}>✕</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addField}>{t('addField')}</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t('pslPreview')}</CardTitle></CardHeader>
          <CardContent>
            <pre className="text-sm bg-muted p-4 rounded overflow-x-auto whitespace-pre-wrap">{pslPreview()}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
