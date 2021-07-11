import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { computed } from 'mobx'

export type ArmorClassEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'armorClass'
    absolute?: number
    relative?: number
  }>
>

export class ArmorClassEffectModel extends BaseEffectModel<ArmorClassEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'armorClass',
      absolute: 0,
      relative: 0,
    } as const
  }

  @computed
  get absolute() {
    return this.ref.absolute || 0
  }

  @computed
  get relative() {
    return this.ref.relative || 0
  }

  unionRef(effect: ArmorClassEffect) {
    return {
      absolute: Math.max(this.absolute, effect.absolute || 0),
      relative: this.relative + (effect.relative || 0),
    }
  }
}
