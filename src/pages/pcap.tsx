import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useI18n } from '@/shared/i18n'

interface Packet {
  no: number
  time: string
  protocol: string
  src: string
  dst: string
  length: number
  info: string
}

const MOCK_PACKETS: Packet[] = [
  { no: 1, time: '0.000000', protocol: 'TCP', src: '192.168.1.100', dst: '93.184.216.34', length: 74, info: 'SYN [Seq=0]' },
  { no: 2, time: '0.028431', protocol: 'TCP', src: '93.184.216.34', dst: '192.168.1.100', length: 74, info: 'SYN-ACK [Seq=0 Ack=1]' },
  { no: 3, time: '0.028542', protocol: 'TCP', src: '192.168.1.100', dst: '93.184.216.34', length: 66, info: 'ACK [Seq=1 Ack=1]' },
  { no: 4, time: '0.028600', protocol: 'HTTP', src: '192.168.1.100', dst: '93.184.216.34', length: 143, info: 'GET / HTTP/1.1' },
  { no: 5, time: '0.056200', protocol: 'TCP', src: '93.184.216.34', dst: '192.168.1.100', length: 66, info: 'ACK [Seq=1 Ack=78]' },
  { no: 6, time: '0.056800', protocol: 'HTTP', src: '93.184.216.34', dst: '192.168.1.100', length: 1500, info: 'HTTP/1.1 200 OK (text/html)' },
  { no: 7, time: '0.057000', protocol: 'TCP', src: '192.168.1.100', dst: '93.184.216.34', length: 66, info: 'ACK [Seq=78 Ack=1435]' },
  { no: 8, time: '0.100000', protocol: 'DNS', src: '192.168.1.100', dst: '8.8.8.8', length: 82, info: 'Standard query A example.com' },
  { no: 9, time: '0.120000', protocol: 'DNS', src: '8.8.8.8', dst: '192.168.1.100', length: 98, info: 'Standard query response A 93.184.216.34' },
  { no: 10, time: '0.200000', protocol: 'ARP', src: '192.168.1.1', dst: '192.168.1.100', length: 42, info: 'Who has 192.168.1.100? Tell 192.168.1.1' },
]

const protocolColors: Record<string, string> = {
  TCP: 'bg-yellow-50 dark:bg-yellow-950',
  HTTP: 'bg-green-50 dark:bg-green-950',
  DNS: 'bg-blue-50 dark:bg-blue-950',
  ARP: 'bg-purple-50 dark:bg-purple-950',
}

export function Pcap() {
  const { t } = useI18n()
  const [packets, setPackets] = useState<Packet[]>([])
  const [selected, setSelected] = useState<Packet | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    // Mock: any file drop loads sample data
    if (e.dataTransfer.files.length > 0) {
      setPackets(MOCK_PACKETS)
      setSelected(null)
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPackets(MOCK_PACKETS)
      setSelected(null)
    }
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('pcapTitle')}</h2>

      {packets.length === 0 && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <p className="text-lg font-medium">{t('pcapDrop')}</p>
          <p className="text-sm text-muted-foreground mt-1">{t('pcapDropHint')}</p>
          <label className="mt-4 inline-block cursor-pointer text-primary underline text-sm">
            {t('pcapBrowse')}
            <input type="file" className="hidden" accept=".pcap,.pcapng,.cap" onChange={handleFileInput} />
          </label>
        </div>
      )}

      {packets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-2 font-medium">No.</th>
                  <th className="py-2 pr-2 font-medium">{t('time')}</th>
                  <th className="py-2 pr-2 font-medium">{t('protocolLabel')}</th>
                  <th className="py-2 pr-2 font-medium">{t('source')}</th>
                  <th className="py-2 pr-2 font-medium">{t('destination')}</th>
                  <th className="py-2 pr-2 font-medium">{t('length')}</th>
                  <th className="py-2 font-medium">{t('info')}</th>
                </tr>
              </thead>
              <tbody>
                {packets.map((pkt) => (
                  <tr
                    key={pkt.no}
                    className={`border-b cursor-pointer hover:bg-accent/50 ${
                      selected?.no === pkt.no ? 'bg-accent' : protocolColors[pkt.protocol] || ''
                    }`}
                    onClick={() => setSelected(pkt)}
                  >
                    <td className="py-1.5 pr-2 font-mono">{pkt.no}</td>
                    <td className="py-1.5 pr-2 font-mono">{pkt.time}</td>
                    <td className="py-1.5 pr-2 font-semibold">{pkt.protocol}</td>
                    <td className="py-1.5 pr-2 font-mono">{pkt.src}</td>
                    <td className="py-1.5 pr-2 font-mono">{pkt.dst}</td>
                    <td className="py-1.5 pr-2">{pkt.length}</td>
                    <td className="py-1.5 text-muted-foreground">{pkt.info}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card>
            <CardHeader><CardTitle>{t('packetDetail')}</CardTitle></CardHeader>
            <CardContent>
              {!selected ? (
                <p className="text-muted-foreground text-sm">{t('pcapSelectPacket')}</p>
              ) : (
                <dl className="space-y-2 text-sm">
                  {Object.entries({
                    'No.': selected.no,
                    [t('time')]: selected.time,
                    [t('protocolLabel')]: selected.protocol,
                    [t('source')]: selected.src,
                    [t('destination')]: selected.dst,
                    [t('length')]: `${selected.length} bytes`,
                    [t('info')]: selected.info,
                  }).map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-medium">{k}</dt>
                      <dd className="text-muted-foreground font-mono">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
