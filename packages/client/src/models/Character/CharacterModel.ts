import {
  CharacterState,
  characterActions,
} from 'common/modules/character/redux'
import { AppState } from 'redux/configureStore'
import { createUseSelector } from 'models/utils/createUseSelector'
import { RaceModel } from 'models/Character/Race/Race'
import { EffectsModel } from 'models/Character/EffectsModel'
import { AbilityEffectModel } from 'models/Character/Effect/effects/AbilityEffect'

type CActions = typeof characterActions

export class CharacterModel {
  constructor(public readonly id: string) {}

  actions = Object.entries(characterActions).reduce(
    (actions, [key, action]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore too hard to create typings
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

  baseAbilities = createUseSelector(this.state, (state) => state.baseAbilities)

  baseAbilitiesEffect = createUseSelector(
    this.baseAbilities,
    (baseAbilities) =>
      new AbilityEffectModel(
        this,
        { type: 'ability', abilities: baseAbilities?.abilities || {} },
        'baseAbilities',
      ),
  )

  race = new RaceModel(this)

  // must be last
  effects = new EffectsModel(this)
}
