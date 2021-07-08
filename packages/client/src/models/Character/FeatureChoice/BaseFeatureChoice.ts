import { CharacterModel } from 'models/Character/CharacterModel'
import { DeepReadonly } from 'ts-essentials'
import { ReactNode } from 'react'
import { AnyAction } from '@logux/core'
import { EffectModel } from 'models/Character/Effect/Effect'
import { computed, makeObservable } from 'mobx'
import { compareEffectArrays, createEffectMap } from 'models/utils/effect'
import { EmptyEffectModel } from 'models/Character/Effect/effects/EmptyEffect'

export type FeatureChoiceAction<V = unknown> = (payload: {
  key: string
  value: V
}) => AnyAction

export abstract class BaseFeatureChoiceModel<R extends { type: string }, ST> {
  constructor(
    readonly characterModel: CharacterModel,
    public readonly state: unknown,
    public readonly ref: R,
    public readonly key: string,
    readonly setChoiceAction: FeatureChoiceAction<ST>,
  ) {
    makeObservable(this)
  }

  @computed({ equals: compareEffectArrays })
  get currentEffects() {
    const index = this.characterModel.effects.all.findIndex(
      (effect) => effect instanceof EmptyEffectModel && effect.key === this.key,
    )
    return index >= 0 ? this.characterModel.effects.all.slice(0, index) : []
  }

  @computed
  get currentEffectMap() {
    return createEffectMap(this.characterModel, this.currentEffects, false)
  }

  @computed
  get effects(): EffectModel[] {
    return [
      new EmptyEffectModel(this.characterModel, { type: 'empty' }, this.key),
      ...this.choiceEffects,
    ]
  }

  readonly type: R['type'] = this.ref.type

  abstract get knownState(): DeepReadonly<ST> | null

  abstract get choicesCount(): number

  protected abstract get choiceEffects(): EffectModel[]

  abstract get node(): ReactNode
}
