import { useState } from 'react'

interface FieldDef {
  name: string
  startBit: number
  endBit: number
}

interface BinaryInspectorProps {
  bytes: number[]
  fields?: FieldDef[]
}

export function BinaryInspector({ bytes, fields = [] }: BinaryInspectorProps) {
  const [selectedBit, setSelectedBit] = useState<number | null>(null)

  const totalBits = bytes.length * 8
  const bits: number[] = []
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1)
    }
  }

  const activeField = selectedBit !== null
    ? fields.find((f) => selectedBit >= f.startBit && selectedBit <= f.endBit)
    : null

  const getFieldForBit = (bitIdx: number) =>
    fields.find((f) => bitIdx >= f.startBit && bitIdx <= f.endBit)

  const fieldColors = ['bg-blue-100 dark:bg-blue-900/40', 'bg-green-100 dark:bg-green-900/40', 'bg-purple-100 dark:bg-purple-900/40', 'bg-amber-100 dark:bg-amber-900/40', 'bg-pink-100 dark:bg-pink-900/40']

  return (
    <div className="space-y-3">
      <div className="font-mono text-xs">
        {/* Bit index header */}
        <div className="flex gap-[1px] mb-1">
          <span className="w-12 shrink-0 text-muted-foreground text-right pr-2">Bit</span>
          {Array.from({ length: Math.min(32, totalBits) }, (_, i) => (
            <span key={i} className="w-5 text-center text-muted-foreground">{i % 8}</span>
          ))}
        </div>

        {/* Bit rows (8 bits per byte, show byte boundaries) */}
        {bytes.map((byte, byteIdx) => {
          const startBit = byteIdx * 8
          return (
            <div key={byteIdx} className="flex gap-[1px] leading-6">
              <span className="w-12 shrink-0 text-muted-foreground text-right pr-2">
                [{byteIdx}]
              </span>
              {Array.from({ length: 8 }, (_, i) => {
                const bitIdx = startBit + i
                const field = getFieldForBit(bitIdx)
                const fieldIdx = field ? fields.indexOf(field) : -1
                const bgColor = field ? fieldColors[fieldIdx % fieldColors.length] : ''
                const isSelected = selectedBit === bitIdx
                const isBoundary = field && (bitIdx === field.startBit || bitIdx === field.endBit)

                return (
                  <span
                    key={i}
                    className={`w-5 text-center cursor-pointer rounded-sm transition-colors ${bgColor} ${
                      isSelected ? 'ring-2 ring-primary font-bold' : ''
                    } ${isBoundary ? 'border border-foreground/30' : ''} hover:bg-primary/20`}
                    onClick={() => setSelectedBit(isSelected ? null : bitIdx)}
                  >
                    {bits[bitIdx]}
                  </span>
                )
              })}
              <span className="ml-2 text-muted-foreground">
                0x{byte.toString(16).toUpperCase().padStart(2, '0')} ({byte})
              </span>
            </div>
          )
        })}
      </div>

      {/* Field legend */}
      {fields.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {fields.map((f, i) => (
            <span key={f.name} className={`px-2 py-0.5 rounded ${fieldColors[i % fieldColors.length]}`}>
              {f.name} [{f.startBit}:{f.endBit}]
            </span>
          ))}
        </div>
      )}

      {/* Selected bit info */}
      {selectedBit !== null && (
        <div className="text-xs bg-muted rounded p-2 font-mono">
          <span>Bit {selectedBit} (Byte {Math.floor(selectedBit / 8)}, bit {selectedBit % 8})</span>
          <span className="mx-2">= {bits[selectedBit]}</span>
          {activeField && (
            <span className="ml-2 text-primary">
              → {activeField.name} (bits {activeField.startBit}–{activeField.endBit}, value:{' '}
              {(() => {
                let val = 0
                for (let b = activeField.startBit; b <= activeField.endBit; b++) {
                  val = (val << 1) | bits[b]
                }
                return val
              })()})
            </span>
          )}
        </div>
      )}
    </div>
  )
}
