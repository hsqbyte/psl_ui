import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { useI18n } from '@/shared/i18n'

interface Team {
  id: number
  name: string
  members: string[]
}

const initialTeams: Team[] = [
  { id: 1, name: 'Network Core', members: ['alice', 'bob', 'carol'] },
  { id: 2, name: 'Application Layer', members: ['dave', 'eve'] },
  { id: 3, name: 'Security', members: ['frank', 'grace'] },
]

export function Teams() {
  const { t } = useI18n()
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [newName, setNewName] = useState('')

  const createTeam = () => {
    if (!newName.trim()) return
    setTeams((prev) => [...prev, { id: Date.now(), name: newName, members: ['you'] }])
    setNewName('')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('teamsTitle')}</h2>
      <div className="flex gap-2">
        <Input placeholder={t('teamName')} value={newName} onChange={(e) => setNewName(e.target.value)} className="max-w-xs" />
        <Button onClick={createTeam}>{t('createTeam')}</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader><CardTitle>{team.name}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{t('members')}:</p>
              <div className="flex flex-wrap gap-1">
                {team.members.map((m) => <Badge key={m} variant="secondary">{m}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
