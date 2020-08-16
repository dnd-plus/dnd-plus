import {
  CharacterState,
  characterActions,
} from 'common/modules/character/redux'
import { AppState } from 'redux/configureStore'
import { createUseSelector } from 'models/utils/createUseSelector'
import { RaceModel } from 'models/Character/Race/Race'

type CActions = typeof characterActions

export class CharacterModel {
  constructor(public readonly id: string) {}

  actions = Object.entries(characterActions).reduce(
    (actions, [key, action]) => {
      // @ts-ignore
      actions[key] = (payload) => action({ ...payload, _id: this.id })
      return actions
    },
    {} as {
      [K in keyof CActions]: (
        p: Omit<Parameters<CActions[K]>[0], '_id'>,
      ) => ReturnType<CActions[K]>
    },
  )

  state = createUseSelector(
    (state: AppState) => state.characters[this.id] as CharacterState,
    (state) => state,
  )

  hasState = createUseSelector(this.state, (state) => !!state)

  name = createUseSelector(this.state, (state) => state.name)

  race = new RaceModel(this)
}
