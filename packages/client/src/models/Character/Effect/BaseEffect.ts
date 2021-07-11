import { CharacterModel } from 'models/Character/CharacterModel'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import type { EffectModel, EffectModelMap, EffectType } from './Effect'
import { makeObservable } from 'mobx'
import { deepToJS } from 'models/utils/deepToJS'

export type EffectFrom = {
  text?: string
  race?: string
  feature?: string
  class?: string
  archetype?: string
  feat?: string
}

type EffectMap = {
  [K in keyof EffectModelMap]: InstanceType<EffectModelMap[K]>
}

export type ChildEffectsData = {
  effectMap: EffectMap
  currentEffectMap: EffectMap
}

export abstract class BaseEffectModel<
  Ref extends Readonly<{ type: EffectType }>,
> {
  constructor(
    protected characterModel: CharacterModel,
    ref: Ref,
    public readonly key: string,
    public from?: EffectFrom,
  ) {
    this._ref = deepToJS(ref)
    this.type = ref.type
    makeObservable(this)
  }

  private readonly _ref: Ref

  get ref(): Ref {
    return this._ref
  }

  readonly type: Ref['type']

  abstract get emptyRef(): Ref

  static get emptyRef() {
    return this.prototype.emptyRef
  }

  withFrom(from: OneOfOptionalRequired<EffectFrom>): this {
    this.from = { ...this.from, ...from }
    return this
  }

  protected abstract unionRef(effect: Ref): Omit<Ref, 'type'>

  private createUnionRef(effect: Ref): Ref {
    return { type: this.type, ...this.unionRef(effect) } as Ref
  }

  createUnionModel(effectModel: BaseEffectModel<any>): this {
    if (effectModel.type !== this.type) return this

    const Model = this.constructor as new (
      characterModel: CharacterModel,
      ref: Ref,
      key: string,
      from?: EffectFrom,
    ) => BaseEffectModel<any>

    return new Model(
      this.characterModel,
      this.createUnionRef(effectModel.ref),
      this.key,
    ) as this
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  getChildEffects(data: ChildEffectsData): EffectModel[] {
    return []
  }
}
