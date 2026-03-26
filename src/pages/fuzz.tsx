import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { protocols } from '@/entities/protocol/model'
import { useI18n } from '@/shared/i18n'

interface FuzzResult { id: number; input: string; status: 'ok' | 'crash' | 'timeout' }

function randomHex(len: number) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(' ')
}

export function Fuzz() {
  const { t } = useI18n()
  const [proto, setProto] = useState(protocols[0].name)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<FuzzResult[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setRunning(false); return 100 }
          return p + 2
        })
        setResults((prev) => {
          const statuses: FuzzResult['status'][] = ['ok', 'ok', 'ok', 'crash', 'timeout']
          return [...prev, { id: prev.length + 1, input: randomHex(8), status: statuses[Math.floor(Math.random() * statuses.length)] }]
        })
      }, 200)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const start = () => { setProgress(0); setResults([]); setRunning(true) }
  const stop = () => setRunning(false)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('fuzzTitle')}</h2>
      <div className="flex gap-4 items-end">
        <div className="w-48">
          <Select value={proto} onValueChange={(v) => v && setProto(v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{protocols.map((p) => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Button onClick={running ? stop : start} variant={running ? 'destructive' : 'default'}>{running ? 'Stop' : 'Start Fuzz'}</Button>
      </div>
      <div className="h-4 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-muted-foreground">{progress}% — {results.length} test cases</p>
      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="max-h-64 overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-1">#</th><th className="text-left py-1">Input</th><th className="text-left py-1">Status</th></tr></thead>
            <tbody>
              {results.slice(-20).reverse().map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-1">{r.id}</td>
                  <td className="py-1 font-mono text-xs">{r.input}</td>
                  <td className="py-1"><span className={r.status === 'ok' ? 'text-green-600' : r.status === 'crash' ? 'text-red-600' : 'text-yellow-600'}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
