import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/i18n'

export function ShareDialog({ protocolName }: { protocolName: string }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://psl.example.com/protocol/${protocolName}?shared=true`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        🔗 {t('share')}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('shareProtocol')}: {protocolName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t('shareDescription')}</p>
          <div className="flex gap-2">
            <Input value={shareUrl} readOnly />
            <Button onClick={handleCopy}>{copied ? '✓' : t('copy')}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
