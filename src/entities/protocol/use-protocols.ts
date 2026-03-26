import { useState, useEffect } from 'react'
import { initPSL, psl, type ProtocolMeta } from '@/shared/lib/psl'

export function useProtocols() {
  const [protocols, setProtocols] = useState<ProtocolMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initPSL()
      .then(() => {
        const list = psl.listProtocols()
        setProtocols(list)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load WASM')
        setLoading(false)
      })
  }, [])

  return { protocols, loading, error }
}

export function useProtocol(name: string | undefined) {
  const [schema, setSchema] = useState<any>(null)
  const [meta, setMeta] = useState<ProtocolMeta | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!name) return
    initPSL().then(() => {
      setSchema(psl.getProtocol(name))
      const m = psl.getMeta(name)
      if (m && !('error' in m)) setMeta(m)
      setLoading(false)
    })
  }, [name])

  return { schema, meta, loading }
}
