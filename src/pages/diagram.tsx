import { useParams, Link } from 'react-router-dom'
import { protocols } from '@/entities/protocol/model'
import { Badge } from '@/shared/ui/badge'
import { ExportButton } from '@/features/codec/export-button'
import { useI18n } from '@/shared/i18n'
import type { ProtocolField } from '@/entities/protocol/model'

function generateDiagram(fields: ProtocolField[]): string {
  const COLS = 32
  const lines: string[] = []

  // Bit ruler
  const ruler = Array.from({ length: COLS }, (_, i) => String(i).padStart(2))
  lines.push(' ' + ruler.join(' '))

  let col = 0
  let row: { name: string; bits: number }[] = []

  const flushRow = () => {
    if (row.length === 0) return
    const border = '+' + row.map((f) => '-'.repeat(f.bits * 3 - 1) + '+').join('')
    const content = '|' + row.map((f) => {
      const space = f.bits * 3 - 1
      const label = f.name.length > space ? f.name.slice(0, space - 1) + '…' : f.name
      const pad = space - label.length
      const left = Math.floor(pad / 2)
      const right = pad - left
      return ' '.repeat(left) + label + ' '.repeat(right) + '|'
    }).join('')
    lines.push(border)
    lines.push(content)
    row = []
  }

  for (const field of fields) {
    let remaining = field.bits || 0
    if (remaining === 0) continue

    while (remaining > 0) {
      const available = COLS - col
      const take = Math.min(remaining, available)
      row.push({ name: remaining === field.bits ? field.name : `${field.name} (cont.)`, bits: take })
      col += take
      remaining -= take
      if (col >= COLS) {
        flushRow()
        col = 0
      }
    }
  }

  if (row.length > 0) {
    flushRow()
  }

  // Bottom border
  const lastBits = row.length > 0 ? row.reduce((s, f) => s + f.bits, 0) : COLS
  lines.push('+' + '-'.repeat(lastBits * 3 - 1) + '+')

  return lines.join('\n')
}

export function Diagram() {
  const { name } = useParams<{ name: string }>()
  const { t } = useI18n()

  if (!name) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{t('bitDiagram')}</h2>
        <p className="text-muted-foreground">{t('selectProtocol')}</p>
        <div className="flex flex-wrap gap-2">
          {protocols.filter((p) => p.fields && p.fields.length > 0).map((p) => (
            <Link key={p.name} to={`/diagram/${p.name}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent">{p.name}</Badge>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const protocol = protocols.find((p) => p.name === name)
  if (!protocol || !protocol.fields || protocol.fields.length === 0) {
    return (
      <div className="space-y-4">
        <Link to="/diagram"><Badge variant="outline">← {t('bitDiagram')}</Badge></Link>
        <p className="text-muted-foreground">{t('noFields')}</p>
      </div>
    )
  }

  const diagram = generateDiagram(protocol.fields)

  return (
    <div className="space-y-6" id="bit-diagram">
      <div className="flex items-center gap-3">
        <Link to="/diagram"><Badge variant="outline">← {t('bitDiagram')}</Badge></Link>
        <h2 className="text-2xl font-bold">{protocol.name}</h2>
        <ExportButton targetId="bit-diagram" />
      </div>
      <pre className="font-mono text-xs overflow-x-auto bg-muted p-4 rounded-lg leading-relaxed">
        {diagram}
      </pre>
    </div>
  )
}
