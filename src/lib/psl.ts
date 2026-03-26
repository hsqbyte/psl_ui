/**
 * PSL WASM bridge — loads protospec-wasm and exposes protocol operations.
 *
 * Usage:
 *   import { initPSL, psl } from '@/lib/psl'
 *   await initPSL()
 *   const protocols = psl.listProtocols()
 */

let _initialized = false
let _initPromise: Promise<void> | null = null

async function loadWasm(): Promise<void> {
  // Load wasm_exec.js (Go's JS glue) via script tag
  if (!(globalThis as any).Go) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = '/wasm_exec.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load wasm_exec.js'))
      document.head.appendChild(script)
    })
  }

  const go = new (globalThis as any).Go()
  const resp = await fetch('/protospec.wasm')
  const result = await WebAssembly.instantiateStreaming(resp, go.importObject)
  go.run(result.instance) // non-blocking, Go blocks in select{}
}

export async function initPSL(): Promise<void> {
  if (_initialized) return
  if (_initPromise) return _initPromise
  _initPromise = loadWasm().then(() => { _initialized = true })
  return _initPromise
}

export function isPSLReady(): boolean {
  return _initialized
}

function call<T>(fn: string, ...args: string[]): T {
  if (!_initialized) throw new Error('PSL WASM not initialized. Call initPSL() first.')
  const raw = (globalThis as any)[fn](...args)
  return JSON.parse(raw) as T
}

export interface ProtocolMeta {
  name: string
  rfc?: string
  title?: Record<string, string>
  description?: Record<string, string>
  layer?: string
  type?: string
  depends_on?: string[]
  status?: string
}

export interface EncodeResult {
  hex?: string
  error?: string
}

export interface DecodeResult {
  fields?: Record<string, any>
  bytes_read?: number
  error?: string
}

export const psl = {
  listProtocols(): ProtocolMeta[] {
    return call<ProtocolMeta[]>('psl_listProtocols')
  },

  getProtocol(name: string): any {
    return call<any>('psl_getProtocol', name)
  },

  getMeta(name: string): ProtocolMeta | { error: string } {
    return call<ProtocolMeta>('psl_getMeta', name)
  },

  encode(protocolName: string, fields: Record<string, any>): EncodeResult {
    return call<EncodeResult>('psl_encode', protocolName, JSON.stringify(fields))
  },

  decode(protocolName: string, hexString: string): DecodeResult {
    return call<DecodeResult>('psl_decode', protocolName, hexString)
  },
}
