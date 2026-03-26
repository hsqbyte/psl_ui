import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/shared/i18n'

const BIT_WIDTHS = [8, 16, 32, 64] as const

function clampToWidth(val: bigint, bits: number): bigint {
  if (bits === 64) return val & 0xFFFFFFFFFFFFFFFFn
  return val & ((1n << BigInt(bits)) - 1n)
}

function toBytes(val: bigint, bits: number, bigEndian: boolean): number[] {
  const byteCount = bits / 8
  const bytes: number[] = []
  for (let i = 0; i < byteCount; i++) {
    bytes.push(Number((val >> BigInt(i * 8)) & 0xFFn))
  }
  return bigEndian ? bytes.reverse() : bytes
}

export function Calculator() {
  const { t } = useI18n()
  const [input, setInput] = useState('255')
  const [bits, setBits] = useState<number>(8)
  const [bigEndian, setBigEndian] = useState(true)

  let value = 0n
  try { value = BigInt(input || '0') } catch { /* keep 0 */ }
  const clamped = clampToWidth(value, bits)
  const bytes = toBytes(clamped, bits, bigEndian)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('calculatorTitle')}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        <div>
          <Label>{t('decimalValue')}</Label>
          <Input className="mt-1 font-mono" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div>
          <Label>{t('bitWidth')}</Label>
          <div className="flex gap-2 mt-1">
            {BIT_WIDTHS.map((w) => (
              <Button key={w} size="sm" variant={bits === w ? 'default' : 'outline'} onClick={() => setBits(w)}>
                {w}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Label>{t('byteOrder')}</Label>
        <div className="flex gap-2 mt-1">
          <Button size="sm" variant={bigEndian ? 'default' : 'outline'} onClick={() => setBigEndian(true)}>
            Big-Endian
          </Button>
          <Button size="sm" variant={!bigEndian ? 'default' : 'outline'} onClick={() => setBigEndian(false)}>
            Little-Endian
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>{t('representations')}</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label={t('decimal')} value={clamped.toString(10)} />
            <Row label={t('hex')} value={'0x' + clamped.toString(16).toUpperCase().padStart(bits / 4, '0')} />
            <Row label={t('octal')} value={'0o' + clamped.toString(8)} />
            <Row label={t('binary')} value={'0b' + clamped.toString(2).padStart(bits, '0')} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>{t('byteRepresentation')}</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {bytes.map((b, i) => (
                <div key={i} className="text-center">
                  <div className="bg-muted rounded px-3 py-2 font-mono text-sm">
                    {b.toString(16).toUpperCase().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">[{i}]</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {bigEndian ? 'Big-Endian (MSB first)' : 'Little-Endian (LSB first)'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span className="font-mono text-muted-foreground">{value}</span>
    </div>
  )
}
