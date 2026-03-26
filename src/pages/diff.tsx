import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const SAMPLE_A = `protocol Ethernet {
  field destination_mac: bytes[6]
  field source_mac: bytes[6]
  field ether_type: uint16
  field payload: bytes[]
}`

const SAMPLE_B = `protocol Ethernet {
  field destination_mac: bytes[6]
  field source_mac: bytes[6]
  field vlan_tag: uint32
  field ether_type: uint16
  field payload: bytes[]
  field fcs: uint32
}`

function computeDiff(a: string, b: string) {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const result: { text: string; type: 'added' | 'removed' | 'unchanged' }[] = []
  let ia = 0, ib = 0
  while (ia < linesA.length || ib < linesB.length) {
    if (ia < linesA.length && ib < linesB.length && linesA[ia] === linesB[ib]) {
      result.push({ text: linesA[ia], type: 'unchanged' }); ia++; ib++
    } else if (ib < linesB.length && (ia >= linesA.length || !linesA.includes(linesB[ib]))) {
      result.push({ text: linesB[ib], type: 'added' }); ib++
    } else {
      result.push({ text: linesA[ia], type: 'removed' }); ia++
    }
  }
  return result
}

export function Diff() {
  const { t } = useI18n()
  const [left, setLeft] = useState(SAMPLE_A)
  const [right, setRight] = useState(SAMPLE_B)
  const [diff, setDiff] = useState<ReturnType<typeof computeDiff>>([])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('diffTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Original</label>
          <textarea className="w-full h-48 p-2 border rounded font-mono text-sm bg-background" value={left} onChange={(e) => setLeft(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Modified</label>
          <textarea className="w-full h-48 p-2 border rounded font-mono text-sm bg-background" value={right} onChange={(e) => setRight(e.target.value)} />
        </div>
      </div>
      <Button onClick={() => setDiff(computeDiff(left, right))}>Compare</Button>
      {diff.length > 0 && (
        <Card>
          <CardHeader><CardTitle>Diff</CardTitle></CardHeader>
          <CardContent>
            <pre className="text-sm font-mono space-y-0">
              {diff.map((line, i) => (
                <div key={i} className={`px-2 ${line.type === 'added' ? 'bg-green-500/15 text-green-700 dark:text-green-400' : line.type === 'removed' ? 'bg-red-500/15 text-red-700 dark:text-red-400' : 'text-muted-foreground'}`}>
                  {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.text}
                </div>
              ))}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
