import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const versions = ['v1.0', 'v1.5', 'v2.0', 'v2.5']
const apis = [
  { name: 'parse()', compat: [true, true, true, true] },
  { name: 'encode()', compat: [true, true, true, false] },
  { name: 'validate()', compat: [true, true, false, false] },
  { name: 'transform()', compat: [false, true, true, true] },
  { name: 'stream()', compat: [false, false, true, true] },
]

export function ApiCompat() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('apiCompatTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>API Version Compatibility Matrix</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">API</th>
                {versions.map((v) => <th key={v} className="text-center py-2">{v}</th>)}
              </tr>
            </thead>
            <tbody>{apis.map((a) => (
              <tr key={a.name} className="border-b last:border-0">
                <td className="py-2 font-mono">{a.name}</td>
                {a.compat.map((c, i) => (
                  <td key={i} className="py-2 text-center">
                    <Badge variant={c ? 'default' : 'destructive'}>{c ? '✓' : '✗'}</Badge>
                  </td>
                ))}
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
