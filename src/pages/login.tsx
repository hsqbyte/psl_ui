import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useI18n } from '@/i18n'

export function Login() {
  const { t } = useI18n()
  const { user, login, register, logout } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader><CardTitle>{t('loginTitle')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">{t('loggedInAs')}: <strong>{user.email}</strong></p>
            <Button onClick={() => { logout(); }} className="w-full">{t('logout')}</Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">{t('backToList')}</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login') login(email, password)
    else register(email, password)
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader><CardTitle>{mode === 'login' ? t('loginTitle') : t('registerTitle')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">{mode === 'login' ? t('loginTitle') : t('registerTitle')}</Button>
            <Button type="button" variant="link" className="w-full" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? t('switchToRegister') : t('switchToLogin')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
