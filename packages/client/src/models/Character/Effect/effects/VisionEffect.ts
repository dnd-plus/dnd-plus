import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

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
  get emptyRef() {
    return {
      type: 'vision',
      blindsight: 0,
      dark: 0,
      tremorsense: 0,
      truesight: 0,
    } as const
  }

  get blindsight() {
    return this.ref.blindsight || 0
  }
  get dark() {
    return this.ref.dark || 0
  }
  get tremorsense() {
    return this.ref.tremorsense || 0
  }
  get truesight() {
    return this.ref.truesight || 0
  }

  assign(effect: VisionEffect) {
    this.ref.blindsight = Math.max(this.blindsight, effect.blindsight || 0)
    this.ref.dark = Math.max(this.dark, effect.dark || 0)
    this.ref.tremorsense = Math.max(this.tremorsense, effect.tremorsense || 0)
    this.ref.truesight = Math.max(this.truesight, effect.truesight || 0)
  }
}
