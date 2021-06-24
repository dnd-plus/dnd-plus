import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { Memoize } from 'models/utils/Memoize'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

export type ArmorClassEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'armorClass'
    absolute?: number
    relative?: number
  }>
>

export class ArmorClassEffectModel extends BaseEffectModel<ArmorClassEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'armorClass',
      absolute: 0,
      relative: 0,
    } as const
  }

  @Memoize()
  get absolute() {
    return this.ref.absolute || 0
  }

  @Memoize()
  get relative() {
    return this.ref.relative || 0
  }

  assign(effect: ArmorClassEffect) {
    this.ref.absolute = Math.max(this.absolute, effect.absolute || 0)
    this.ref.relative = this.relative + (effect.relative || 0)
  }
}
