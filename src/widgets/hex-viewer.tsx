import { useState } from 'react'

interface HexViewerProps {
  data: number[]
}

export function HexViewer({ data }: HexViewerProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const BYTES_PER_ROW = 16
  const rows: number[][] = []

  for (let i = 0; i < data.length; i += BYTES_PER_ROW) {
    rows.push(data.slice(i, i + BYTES_PER_ROW))
  }

  return (
    <div className="font-mono text-xs overflow-auto bg-muted rounded-lg p-3">
      <div className="flex text-muted-foreground mb-1">
        <span className="w-16 shrink-0">Offset</span>
        <span className="flex-1">
          {Array.from({ length: BYTES_PER_ROW }, (_, i) =>
            i.toString(16).toUpperCase().padStart(2, '0')
          ).join(' ')}
        </span>
        <span className="ml-4">ASCII</span>
      </div>
      {rows.map((row, ri) => {
        const offset = ri * BYTES_PER_ROW
        return (
          <div key={ri} className="flex leading-5">
            <span className="w-16 shrink-0 text-muted-foreground">
              {offset.toString(16).toUpperCase().padStart(6, '0')}
            </span>
            <span className="flex-1">
              {row.map((byte, bi) => {
                const idx = offset + bi
                return (
                  <span
                    key={bi}
                    className={`cursor-pointer hover:bg-primary/20 rounded px-[1px] ${
                      selected === idx ? 'bg-primary/30 text-primary font-bold' : ''
                    }`}
                    onClick={() => setSelected(selected === idx ? null : idx)}
                  >
                    {byte.toString(16).toUpperCase().padStart(2, '0')}
                    {bi < row.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
              {row.length < BYTES_PER_ROW && (
                <span>{' '.repeat((BYTES_PER_ROW - row.length) * 3)}</span>
              )}
            </span>
            <span className="ml-4 text-muted-foreground">
              {row.map((byte, bi) => {
                const idx = offset + bi
                const ch = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.'
                return (
                  <span
                    key={bi}
                    className={selected === idx ? 'bg-primary/30 text-primary font-bold' : ''}
                  >
                    {ch}
                  </span>
                )
              })}
            </span>
          </div>
        )
      })}
      {selected !== null && selected < data.length && (
        <div className="mt-2 pt-2 border-t text-muted-foreground">
          Offset: 0x{selected.toString(16).toUpperCase()} | Dec: {data[selected]} | Hex: 0x{data[selected].toString(16).toUpperCase().padStart(2, '0')} | Bin: {data[selected].toString(2).padStart(8, '0')}
        </div>
      )}
    </div>
  )
}
