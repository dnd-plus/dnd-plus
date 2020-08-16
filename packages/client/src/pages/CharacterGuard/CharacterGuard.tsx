import React, { useMemo } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { profileRoute } from 'constants/routes'
import { useSubscription } from '@logux/redux'
import { characterChannel } from 'common/modules/character/channels'
import { CharacterModelContext } from 'models/Character/CharacterModelContext'
import { CharacterModel } from 'models/Character/CharacterModel'

export function CharacterGuard() {
  const { characterId: id = '' } = useParams() as { characterId: string }

  const isSubscribing = useSubscription(id ? [characterChannel.link(id)] : [])

  const characterModel = useMemo(() => new CharacterModel(id), [id])
  const hasCharacterState = characterModel.hasState.use()

  if (!id) {
    console.error('route inside CharacterGuard must have `characterId` param')
    return <Navigate to={profileRoute.link()} />
  }

  if (isSubscribing) return null
  if (!hasCharacterState) return <Navigate to={profileRoute.link()} />
  return (
    <CharacterModelContext.Provider value={characterModel}>
      <Outlet />
    </CharacterModelContext.Provider>
  )
}
