import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly } from 'ts-essentials'

export type EmptyEffect = DeepReadonly<{
  type: 'empty'
  [k: string]: unknown
}>

export class EmptyEffectModel extends BaseEffectModel<EmptyEffect> {
  get emptyRef() {
    return { type: 'empty' } as const
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  assign() {}
}
