import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

const KEYWORDS = ['protocol', 'field', 'message', 'transport', 'enum', 'option', 'import', 'version']
const TYPES = ['uint8', 'uint16', 'uint32', 'uint64', 'int8', 'int16', 'int32', 'int64', 'bytes', 'string', 'bool']

function highlightLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let remaining = line
  let key = 0

  while (remaining.length > 0) {
    // Comments
    const commentIdx = remaining.indexOf('//')
    if (commentIdx === 0) {
      parts.push(<span key={key++} className="text-green-600 dark:text-green-400">{remaining}</span>)
      return parts
    }

    let matched = false
    for (const kw of KEYWORDS) {
      const re = new RegExp(`^\\b(${kw})\\b`)
      const m = remaining.match(re)
      if (m) {
        parts.push(<span key={key++} className="text-purple-600 dark:text-purple-400 font-semibold">{m[1]}</span>)
        remaining = remaining.slice(m[1].length)
        matched = true
        break
      }
    }
    if (matched) continue

    for (const tp of TYPES) {
      const re = new RegExp(`^\\b(${tp})\\b`)
      const m = remaining.match(re)
      if (m) {
        parts.push(<span key={key++} className="text-blue-600 dark:text-blue-400">{m[1]}</span>)
        remaining = remaining.slice(m[1].length)
        matched = true
        break
      }
    }
    if (matched) continue

    // String literals
    if (remaining[0] === '"') {
      const end = remaining.indexOf('"', 1)
      const str = end >= 0 ? remaining.slice(0, end + 1) : remaining
      parts.push(<span key={key++} className="text-amber-600 dark:text-amber-400">{str}</span>)
      remaining = remaining.slice(str.length)
      continue
    }

    // Numbers
    const numMatch = remaining.match(/^(\d+)/)
    if (numMatch) {
      parts.push(<span key={key++} className="text-cyan-600 dark:text-cyan-400">{numMatch[1]}</span>)
      remaining = remaining.slice(numMatch[1].length)
      continue
    }

    parts.push(remaining[0])
    remaining = remaining.slice(1)
  }
  return parts
}

const SAMPLE = `protocol TCP {
  field source_port: uint16  // Source port
  field dest_port: uint16    // Destination port
  field seq_number: uint32
  field ack_number: uint32
  field data_offset: uint8
  field flags: uint8
  field window: uint16
  field checksum: uint16
}

message Handshake {
  transport tcp
}`

function validatePSL(code: string): string[] {
  const errors: string[] = []
  const lines = code.split('\n')
  let braceDepth = 0

  lines.forEach((line, i) => {
    const trimmed = line.replace(/\/\/.*$/, '').trim()
    if (!trimmed) return

    braceDepth += (trimmed.match(/{/g) || []).length
    braceDepth -= (trimmed.match(/}/g) || []).length

    if (trimmed.startsWith('protocol ') && !trimmed.includes('{')) {
      errors.push(`Line ${i + 1}: protocol declaration missing opening brace`)
    }
    if (trimmed.startsWith('field ') && !trimmed.includes(':')) {
      errors.push(`Line ${i + 1}: field missing type annotation (:)`)
    }
  })

  if (braceDepth !== 0) {
    errors.push(`Unmatched braces: depth is ${braceDepth}`)
  }
  return errors
}

export function Editor() {
  const { t } = useI18n()
  const [code, setCode] = useState(SAMPLE)
  const [errors, setErrors] = useState<string[]>([])

  const lines = code.split('\n')
  const highlighted = useMemo(() => lines.map((l) => highlightLine(l)), [lines])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('editorTitle')}</h2>
        <Button onClick={() => setErrors(validatePSL(code))}>{t('validate')}</Button>
      </div>

      <Card>
        <CardContent className="p-0 relative">
          <div className="flex overflow-auto max-h-[500px]">
            <div className="select-none text-right pr-3 pl-3 py-3 text-xs font-mono text-muted-foreground bg-muted/50 border-r">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>
            <div className="relative flex-1 min-w-0">
              <textarea
                className="absolute inset-0 w-full h-full font-mono text-sm leading-6 p-3 bg-transparent text-transparent caret-foreground resize-none outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
              <pre className="font-mono text-sm leading-6 p-3 pointer-events-none whitespace-pre-wrap break-all">
                {highlighted.map((h, i) => (
                  <div key={i}>{h.length > 0 ? h : ' '}</div>
                ))}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-red-600">{t('validationErrors')}</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {errors.map((e, i) => (
                <li key={i} className="text-red-600 font-mono">• {e}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {errors.length === 0 && code.trim() && (
        <p className="text-sm text-green-600">{t('validationOk')}</p>
      )}
    </div>
  )
}
