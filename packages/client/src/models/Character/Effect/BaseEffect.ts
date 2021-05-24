import { Writable } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import type { EffectModelsMap } from './Effect'
import { CharacterRace } from '../Race/Race'

export type EffectFrom = {
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
  raceRef?: CharacterRace
}

export abstract class BaseEffectModel<
  R extends Readonly<{ from?: never; type: keyof EffectModelsMap }>
> {
  constructor(
    protected characterModel: CharacterModel,
    ref: R,
    public readonly key: string,
    public from?: EffectFrom,
  ) {
    this.ref = { ...ref }
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

  abstract assign(effect: R): void

  assignModel(effectModel: BaseEffectModel<any>) {
    if (this.type === effectModel.type) this.assign(effectModel.ref)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  getChildEffects(data: ChildEffectsData): BaseEffectModel<any>[] {
    return []
  }
}
