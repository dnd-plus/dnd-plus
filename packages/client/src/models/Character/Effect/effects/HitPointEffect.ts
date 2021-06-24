import { DeepReadonly } from 'ts-essentials'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { Memoize } from 'models/utils/Memoize'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

type HitPointEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'hitPoint'
    increase?: number
    increaseByLevel?: number
    decrease?: number
    override?: number
  }>
>

export class HitPointEffectModel extends BaseEffectModel<HitPointEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'hitPoint',
      increase: 0,
      increaseByLevel: 0,
      decrease: 0,
    } as const
  }

  @Memoize()
  get increase() {
    return this.ref.increase ?? 0
  }
  @Memoize()
  get increaseByLevel() {
    return this.ref.increaseByLevel ?? 0
  }
  @Memoize()
  get decrease() {
    return this.ref.decrease ?? 0
  }
  @Memoize()
  get override() {
    return this.ref.override || undefined
  }

  assign(effect: HitPointEffect) {
    this.ref.increase = this.increase + (effect.increase || 0)
    this.ref.increaseByLevel = this.increaseByLevel + (effect.increase || 0)
    this.ref.decrease = this.decrease + (effect.increase || 0)
    this.ref.override = this.override || effect.override
  }
}
