import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

const providers = [
  { name: 'SAML 2.0', status: 'configured', issuer: 'https://idp.example.com' },
  { name: 'OIDC', status: 'not configured', issuer: '—' },
  { name: 'LDAP', status: 'configured', issuer: 'ldap://ldap.example.com' },
]
const fields = ['Entity ID', 'SSO URL', 'Certificate', 'Callback URL']

export function Sso() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('ssoTitle')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {providers.map((p) => (
          <Card key={p.name}>
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-bold">{p.name}</span>
                <Badge variant={p.status === 'configured' ? 'default' : 'outline'}>{p.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground font-mono">{p.issuer}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>SAML Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {fields.map((f) => (
            <div key={f} className="space-y-1">
              <label className="text-sm font-medium">{f}</label>
              <div className="h-9 rounded border bg-muted px-3 flex items-center text-xs text-muted-foreground">Enter {f.toLowerCase()}...</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
