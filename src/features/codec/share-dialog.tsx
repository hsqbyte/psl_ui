import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useI18n } from '@/shared/i18n'

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
