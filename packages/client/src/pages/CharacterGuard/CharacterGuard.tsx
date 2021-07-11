import React, { useEffect, useMemo } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { homeRoute } from 'constants/routes'
import { useSubscription } from '@logux/redux'
import { characterChannel } from 'common/modules/character/channels'
import { CharacterModelContext } from 'models/Character/CharacterModelContext'
import { CharacterModel } from 'models/Character/CharacterModel'
import { useDispatch, useStore } from 'react-redux'
import { characterUpdaters } from 'common/modules/character/characterUpdaters'
import { runInAction } from 'mobx'
import {
  characterActions,
  charactersReducerName,
} from 'common/modules/character/redux'
import { cloneDeep } from 'lodash-es'

export function CharacterGuard() {
  const { characterId: id = '' } = useParams() as { characterId: string }

  const isSubscribing = useSubscription(id ? [characterChannel.link(id)] : [])

  const store = useStore()
  const dispatch = useDispatch()

  const characterModel = useMemo(() => {
    const characterState = store.getState().characters[id]
    return characterState && !isSubscribing
      ? new CharacterModel(cloneDeep(characterState), dispatch.sync)
      : undefined
  }, [dispatch.sync, id, isSubscribing, store])

  useEffect(() => {
    const prefix = charactersReducerName + '/'
    const unsubscribe =
      characterModel &&
      store.client.on('add', (action) => {
        if (
          (action.type === 'logux/undo' &&
            action.action?.type?.startsWith(prefix) &&
            action.action?.payload?._id === id) ||
          (action.type === characterActions.load.type &&
            action.payload?._id === id)
        ) {
          runInAction(
            () =>
              (characterModel.state = cloneDeep(
                store.getState().characters[id],
              )),
          )
        } else {
          const type = action.type.replace(
            prefix,
            '',
          ) as keyof typeof characterUpdaters

          const updater = characterUpdaters[type]

          if (updater && action.payload?._id === id) {
            runInAction(() => updater(characterModel.state, action as any))
          }
        }
      })

    return unsubscribe
  }, [characterModel, id, store, store.client])

  if (!id) {
    console.error('route inside CharacterGuard must have `characterId` param')
    return <Navigate to={homeRoute.link()} />
  }

  if (isSubscribing) return null
  if (!characterModel) return <Navigate to={homeRoute.link()} />
  return (
    <CharacterModelContext.Provider value={characterModel}>
      <Outlet />
    </CharacterModelContext.Provider>
  )
}
