import { useSyncExternalStore, useCallback } from 'react'

interface User {
  email: string
  name: string
}

let currentUser: User | null = (() => {
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('psl-user') : null
    return stored ? JSON.parse(stored) : null
  } catch { return null }
})()

const listeners = new Set<() => void>()
function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb) } }
function getSnapshot() { return currentUser }

export function useAuth() {
  const user = useSyncExternalStore(subscribe, getSnapshot)

  const login = useCallback((email: string, _password: string) => {
    const u: User = { email, name: email.split('@')[0] }
    currentUser = u
    localStorage.setItem('psl-user', JSON.stringify(u))
    listeners.forEach((fn) => fn())
  }, [])

  const register = useCallback((email: string, _password: string) => {
    const u: User = { email, name: email.split('@')[0] }
    currentUser = u
    localStorage.setItem('psl-user', JSON.stringify(u))
    listeners.forEach((fn) => fn())
  }, [])

  const logout = useCallback(() => {
    currentUser = null
    localStorage.removeItem('psl-user')
    listeners.forEach((fn) => fn())
  }, [])

  return { user, login, register, logout } as const
}
