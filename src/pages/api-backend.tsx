import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const endpoints = [
  { method: 'GET', path: '/api/protocols', desc: 'List all protocols' },
  { method: 'GET', path: '/api/protocols/:name', desc: 'Get protocol by name' },
  { method: 'POST', path: '/api/protocols', desc: 'Create new protocol' },
  { method: 'PUT', path: '/api/protocols/:name', desc: 'Update protocol' },
  { method: 'DELETE', path: '/api/protocols/:name', desc: 'Delete protocol' },
  { method: 'GET', path: '/api/fields/:protocol', desc: 'List fields for protocol' },
  { method: 'POST', path: '/api/validate', desc: 'Validate PSL definition' },
  { method: 'GET', path: '/api/stats', desc: 'Get usage statistics' },
]

const methodColor: Record<string, string> = {
  GET: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  PUT: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function ApiBackend() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('apiBackendTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>REST API Endpoints</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2">Method</th><th className="text-left py-2">Path</th><th className="text-left py-2">Description</th></tr></thead>
            <tbody>
              {endpoints.map((e, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2"><Badge className={methodColor[e.method]}>{e.method}</Badge></td>
                  <td className="py-2 font-mono text-xs">{e.path}</td>
                  <td className="py-2 text-muted-foreground">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
