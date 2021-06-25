import {
  CharacterState,
  characterActions,
} from 'common/modules/character/redux'
import { RaceModel } from 'models/Character/Race/Race'
import { EffectsModel } from 'models/Character/EffectsModel'
import { AbilityEffectModel } from 'models/Character/Effect/effects/AbilityEffect'
import { ClassModel } from 'models/Character/Class/Class'
import { computed, makeObservable, observable } from 'mobx'
import { entries } from 'common/utils/typesafe'
import { AnyAction } from '@logux/core'
import { deepToJS } from 'models/utils/deepToJS'
import { ABILITY_TYPES } from 'common/reference/AbilityType'

type CActions = typeof characterActions

export class CharacterModel {
  constructor(
    private readonly initialState: CharacterState,
    public readonly dispatch?: (action: AnyAction) => unknown,
  ) {
    makeObservable(this)
  }

  readonly actions = entries(characterActions).reduce(
    (actions, [key, actionCreator]) => ({
      ...actions,
      [key]: (payload: any) => {
        const action = actionCreator({
          ...deepToJS(payload),
          _id: this.initialState._id,
        })
        return this.dispatch ? this.dispatch(action) : action
      },
    }),
    {} as {
      [K in keyof CActions]: (
        p: Omit<Parameters<CActions[K]>[0], '_id'>,
      ) => ReturnType<CActions[K]>
    },
  )

  @observable
  state: CharacterState = this.initialState

  @computed
  get hasState() {
    return !!this.state
  }

  @computed
  get name() {
    return this.state.name
  }

  @computed
  get baseAbilities() {
    return this.state.baseAbilities
  }

  @computed
  get baseAbilitiesChoicesCount() {
    return this.baseAbilities?.abilities
      ? ABILITY_TYPES.length -
          Object.values(this.baseAbilities.abilities).filter(Boolean).length
      : 1
  }

  @computed
  get baseAbilitiesEffect() {
    return new AbilityEffectModel(
      this,
      { type: 'ability', abilities: this.baseAbilities?.abilities || {} },
      'baseAbilities',
    )
  }

  readonly race = new RaceModel(this)

  readonly class = new ClassModel(this)

  // must be last
  readonly effects = new EffectsModel(this)
}

export class CharacterMockModel extends CharacterModel {
  constructor(initialState: Partial<CharacterState>) {
    super({ _id: '', userId: '', name: '', ...initialState })
  }
}
