import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n'

const messages = [
  { role: 'user', text: 'How do I define a TCP header in PSL?' },
  { role: 'assistant', text: 'Use `protocol TCP { src_port: uint16; dst_port: uint16; ... }` to define a TCP header.' },
  { role: 'user', text: 'Can I add conditional fields?' },
  { role: 'assistant', text: 'Yes! Use `when` clauses: `payload: bytes when flags.has_payload`' },
]

export function AiAssistant() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('aiAssistantTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>Chat</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Badge variant="outline" className="mb-1 text-xs">{m.role}</Badge>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <div className="flex gap-2">
            <div className="flex-1 h-9 rounded border bg-muted px-3 flex items-center text-sm text-muted-foreground">Ask about PSL...</div>
            <Badge variant="default" className="cursor-pointer px-4 py-2">Send</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
