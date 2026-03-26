import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

interface ExportButtonProps {
  targetId?: string
}

export function ExportButton({ targetId }: ExportButtonProps) {
  const { t } = useI18n()

  const handleExport = useCallback(() => {
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        // Use window.print() with a focused view
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <html><head><title>Export</title>
            <style>body { font-family: system-ui, sans-serif; padding: 20px; }</style>
            </head><body>${el.innerHTML}</body></html>
          `)
          printWindow.document.close()
          printWindow.print()
        }
        return
      }
    }
    window.print()
  }, [targetId])

  return (
    <Button variant="outline" size="sm" onClick={handleExport}>
      📄 {t('exportPng')}
    </Button>
  )
}
