import { Writable } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import type { EffectModelsMap } from './Effect'
import { toJS } from 'mobx'

export type EffectFrom = {
  text?: string
  race?: string
  feature?: string
  class?: string
  feat?: string
}

type EffectMap = {
  [K in keyof EffectModelsMap]: InstanceType<EffectModelsMap[K]>
}

export type ChildEffectsData = {
  effectMap: EffectMap
  currentEffectMap: EffectMap
}

export abstract class BaseEffectModel<
  R extends Readonly<{ type: keyof EffectModelsMap }>,
> {
  constructor(
    protected characterModel: CharacterModel,
    ref: R,
    public readonly key: string,
    public from?: EffectFrom,
  ) {
    this.ref = { ...toJS(ref) }
    this.type = this.ref.type
  }

  readonly ref: Writable<R>
  readonly type: keyof EffectModelsMap

  abstract get emptyRef(): R

  static get emptyRef() {
    return this.prototype.emptyRef
  }

  withFrom(from: OneOfOptionalRequired<EffectFrom>): this {
    this.from = { ...this.from, ...from }
    return this
  }

  protected abstract assign(effect: R): void

  assignModel(effectModel: BaseEffectModel<any>) {
    if (this.type === effectModel.type) this.assign(effectModel.ref)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  getChildEffects(data: ChildEffectsData): BaseEffectModel<any>[] {
    return []
  }
}
