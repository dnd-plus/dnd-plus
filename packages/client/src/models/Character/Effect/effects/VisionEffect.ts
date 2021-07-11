import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { computed } from 'mobx'

export type VisionEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'vision'
    blindsight?: number
    dark?: number
    tremorsense?: number
    truesight?: number
  }>
>
export class VisionEffectModel extends BaseEffectModel<VisionEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'vision',
      blindsight: 0,
      dark: 0,
      tremorsense: 0,
      truesight: 0,
    } as const
  }

  @computed
  get blindsight() {
    return this.ref.blindsight || 0
  }

  @computed
  get dark() {
    return this.ref.dark || 0
  }

  @computed
  get tremorsense() {
    return this.ref.tremorsense || 0
  }

  @computed
  get truesight() {
    return this.ref.truesight || 0
  }

  unionRef(effect: VisionEffect) {
    return {
      blindsight: Math.max(this.blindsight, effect.blindsight || 0),
      dark: Math.max(this.dark, effect.dark || 0),
      tremorsense: Math.max(this.tremorsense, effect.tremorsense || 0),
      truesight: Math.max(this.truesight, effect.truesight || 0),
    }
  }
}
