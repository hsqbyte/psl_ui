import { useState } from 'react'
import { protocols } from '@/data/protocols'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

export function Compare() {
  const { t } = useI18n()
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')

  const leftProto = protocols.find((p) => p.name === left)
  const rightProto = protocols.find((p) => p.name === right)

  const leftFields = leftProto?.fields || []
  const rightFields = rightProto?.fields || []

  const leftNames = new Set(leftFields.map((f) => f.name))
  const rightNames = new Set(rightFields.map((f) => f.name))

  const allNames = Array.from(new Set([...leftFields.map((f) => f.name), ...rightFields.map((f) => f.name)]))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('compareTitle')}</h2>

      <div className="grid grid-cols-2 gap-4 max-w-lg">
        <div>
          <Label>{t('protocolA')}</Label>
          <Select value={left} onValueChange={(v) => v && setLeft(v)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder={t('selectProtocol')} /></SelectTrigger>
            <SelectContent>
              {protocols.map((p) => (
                <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{t('protocolB')}</Label>
          <Select value={right} onValueChange={(v) => v && setRight(v)}>
            <SelectTrigger className="mt-1"><SelectValue placeholder={t('selectProtocol')} /></SelectTrigger>
            <SelectContent>
              {protocols.map((p) => (
                <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {leftProto && rightProto && (
        <Card>
          <CardHeader><CardTitle>{t('fieldComparison')}</CardTitle></CardHeader>
          <CardContent>
            {allNames.length === 0 ? (
              <p className="text-muted-foreground text-sm">{t('noFields')}</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">{t('fieldName')}</th>
                    <th className="text-left py-2 pr-4 font-medium">{leftProto.name}</th>
                    <th className="text-left py-2 font-medium">{rightProto.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {allNames.map((name) => {
                    const inLeft = leftNames.has(name)
                    const inRight = rightNames.has(name)
                    const lf = leftFields.find((f) => f.name === name)
                    const rf = rightFields.find((f) => f.name === name)
                    const isDiff = !inLeft || !inRight || lf?.type !== rf?.type || lf?.bits !== rf?.bits

                    return (
                      <tr key={name} className={`border-b last:border-0 ${isDiff ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`}>
                        <td className="py-2 pr-4 font-mono">{name}</td>
                        <td className="py-2 pr-4">
                          {inLeft ? (
                            <span className="font-mono text-muted-foreground">{lf!.type} ({lf!.bits}b)</span>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-300">—</Badge>
                          )}
                        </td>
                        <td className="py-2">
                          {inRight ? (
                            <span className="font-mono text-muted-foreground">{rf!.type} ({rf!.bits}b)</span>
                          ) : (
                            <Badge variant="outline" className="text-red-600 border-red-300">—</Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
