import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { computed } from 'mobx'

type MovementEffectItem =
  | OneOfOptionalRequired<{
      absolute?: number
      relative?: number
    }>
  | undefined

export type MovementEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'movement'
    walk?: MovementEffectItem
    fly?: MovementEffectItem
    swim?: MovementEffectItem
  }>
>

export class MovementEffectModel extends BaseEffectModel<MovementEffect> {
  private getItem(effectItem: MovementEffectItem) {
    return {
      absolute: effectItem?.absolute || 0,
      relative: effectItem?.relative || 0,
    }
  }

  @computed
  get emptyRef() {
    return {
      type: 'movement',
      walk: this.getItem(undefined),
      fly: this.getItem(undefined),
      swim: this.getItem(undefined),
    } as const
  }

  @computed
  get walk() {
    return this.getItem(this.ref.walk)
  }

  @computed
  get fly() {
    return this.getItem(this.ref.fly)
  }

  @computed
  get swim() {
    return this.getItem(this.ref.swim)
  }

  private assignItem(item1: MovementEffectItem, item2: MovementEffectItem) {
    return {
      absolute: Math.max(item1?.absolute || 0, item2?.absolute || 0),
      relative: (item1?.relative || 0) + (item2?.relative || 0),
    }
  }

  unionRef(effect: MovementEffect) {
    return {
      walk: this.assignItem(this.ref.walk, effect.walk),
      fly: this.assignItem(this.ref.fly, effect.fly),
      swim: this.assignItem(this.ref.swim, effect.swim),
    }
  }
}
