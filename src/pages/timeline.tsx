import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/i18n'

const TIMELINE_DATA = [
  { name: 'Ethernet', year: 1980, rfc: 'RFC 894', detail: 'DIX Ethernet II standard' },
  { name: 'IPv4', year: 1981, rfc: 'RFC 791', detail: 'Internet Protocol version 4' },
  { name: 'TCP', year: 1981, rfc: 'RFC 793', detail: 'Transmission Control Protocol' },
  { name: 'UDP', year: 1980, rfc: 'RFC 768', detail: 'User Datagram Protocol' },
  { name: 'DNS', year: 1987, rfc: 'RFC 1035', detail: 'Domain Name System' },
  { name: 'HTTP', year: 1996, rfc: 'RFC 1945', detail: 'HTTP/1.0' },
  { name: 'TLS', year: 1999, rfc: 'RFC 2246', detail: 'TLS 1.0' },
  { name: 'SIP', year: 2002, rfc: 'RFC 3261', detail: 'Session Initiation Protocol' },
  { name: 'SCTP', year: 2000, rfc: 'RFC 2960', detail: 'Stream Control Transmission Protocol' },
  { name: 'CoAP', year: 2014, rfc: 'RFC 7252', detail: 'Constrained Application Protocol' },
  { name: 'HTTP2', year: 2015, rfc: 'RFC 7540', detail: 'HTTP/2' },
  { name: 'WebSocket', year: 2011, rfc: 'RFC 6455', detail: 'WebSocket Protocol' },
  { name: 'MQTT', year: 2014, rfc: 'OASIS', detail: 'MQTT v3.1.1 standard' },
  { name: 'IPv6', year: 2017, rfc: 'RFC 8200', detail: 'Internet Protocol version 6' },
].sort((a, b) => a.year - b.year)

export function Timeline() {
  const { t } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)
  const minYear = Math.min(...TIMELINE_DATA.map((d) => d.year))
  const maxYear = Math.max(...TIMELINE_DATA.map((d) => d.year))
  const range = maxYear - minYear || 1

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t('timelineTitle')}</h2>
      <Card>
        <CardHeader><CardTitle>RFC Publication Timeline</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <div className="relative min-w-[700px] h-48">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border" />
            {TIMELINE_DATA.map((item, i) => {
              const left = ((item.year - minYear) / range) * 90 + 5
              const isTop = i % 2 === 0
              return (
                <div key={item.name} className="absolute" style={{ left: `${left}%`, top: isTop ? '10%' : '60%' }} onMouseEnter={() => setHovered(item.name)} onMouseLeave={() => setHovered(null)}>
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 border-primary ${hovered === item.name ? 'bg-primary' : 'bg-background'}`} />
                    <div className={`text-xs mt-1 text-center whitespace-nowrap transition-opacity ${hovered === item.name ? 'opacity-100' : 'opacity-70'}`}>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-muted-foreground">{item.year}</div>
                    </div>
                    {hovered === item.name && (
                      <div className="absolute top-full mt-1 bg-popover border rounded p-2 text-xs shadow-md z-10 whitespace-nowrap">
                        <div className="font-medium">{item.rfc}</div>
                        <div className="text-muted-foreground">{item.detail}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
