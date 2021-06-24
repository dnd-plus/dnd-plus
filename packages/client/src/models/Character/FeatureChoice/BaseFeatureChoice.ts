import { CharacterModel } from 'models/Character/CharacterModel'
import { DeepReadonly } from 'ts-essentials'
import { ReactNode } from 'react'
import { AnyAction } from '@logux/core'
import { EffectModel } from 'models/Character/Effect/Effect'
import { computed, makeObservable, observable } from 'mobx'
import { EffectTypeMap } from 'models/Character/EffectsModel'

export type FeatureChoiceAction<V = unknown> = (payload: {
  key: string
  value: V
}) => AnyAction

export abstract class BaseFeatureChoiceModel<R extends { type: string }, ST> {
  constructor(
    protected readonly characterModel: CharacterModel,
    public readonly state: unknown,
    public readonly ref: R,
    public readonly key: string,
    protected readonly setChoiceAction: FeatureChoiceAction<ST>,
  ) {
    makeObservable(this)
  }

  @observable
  private _currentEffects?: EffectTypeMap

  @computed
  get currentEffects() {
    return this._currentEffects || this.characterModel.effects
  }
  set currentEffects(currentEffects: EffectTypeMap) {
    this._currentEffects = currentEffects
  }

  readonly type: R['type'] = this.ref.type

  abstract get knownState(): DeepReadonly<ST> | null

  abstract get choicesCount(): number

  abstract get effects(): EffectModel[]

  abstract hook: () => {
    node: ReactNode
  }
}
