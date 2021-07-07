import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

type MovementEffectItem =
  | OneOfOptionalRequired<{
      absolute?: number
      relative?: number
    }>
  | undefined

type MovementEffect = DeepReadonly<
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

  get emptyRef() {
    return {
      type: 'movement',
      walk: this.getItem(undefined),
      fly: this.getItem(undefined),
      swim: this.getItem(undefined),
    } as const
  }

  get walk() {
    return this.getItem(this.ref.walk)
  }
  get fly() {
    return this.getItem(this.ref.fly)
  }
  get swim() {
    return this.getItem(this.ref.swim)
  }

  private assignItem(item1: MovementEffectItem, item2: MovementEffectItem) {
    return {
      absolute: Math.max(item1?.absolute || 0, item2?.absolute || 0),
      relative: (item1?.relative || 0) + (item2?.relative || 0),
    }
  }

  assign(effect: MovementEffect) {
    this.ref.walk = this.assignItem(this.ref.walk, effect.walk)
    this.ref.fly = this.assignItem(this.ref.fly, effect.fly)
    this.ref.swim = this.assignItem(this.ref.swim, effect.swim)
  }
}
