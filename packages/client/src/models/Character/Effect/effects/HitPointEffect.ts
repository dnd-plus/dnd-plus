import { DeepReadonly } from 'ts-essentials'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { computed } from 'mobx'

export type HitPointEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'hitPoint'
    increase?: number
    increaseByLevel?: number
    decrease?: number
    override?: number
  }>
>

export class HitPointEffectModel extends BaseEffectModel<HitPointEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'hitPoint',
      increase: 0,
      increaseByLevel: 0,
      decrease: 0,
    } as const
  }

  @computed
  get increase() {
    return this.ref.increase ?? 0
  }

  @computed
  get increaseByLevel() {
    return this.ref.increaseByLevel ?? 0
  }

  @computed
  get decrease() {
    return this.ref.decrease ?? 0
  }

  @computed
  get override() {
    return this.ref.override || undefined
  }

  unionRef(effect: HitPointEffect) {
    return {
      increase: this.increase + (effect.increase || 0),
      increaseByLevel: this.increaseByLevel + (effect.increase || 0),
      decrease: this.decrease + (effect.increase || 0),
      override: this.override || effect.override,
    }
  }
}
