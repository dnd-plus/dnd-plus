import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly } from 'ts-essentials'
import { computed } from 'mobx'

export type EmptyEffect = DeepReadonly<{
  type: 'empty'
  [k: string]: unknown
}>

export class EmptyEffectModel extends BaseEffectModel<EmptyEffect> {
  @computed
  get emptyRef() {
    return { type: 'empty' } as const
  }

  unionRef() {
    return this.emptyRef
  }
}
