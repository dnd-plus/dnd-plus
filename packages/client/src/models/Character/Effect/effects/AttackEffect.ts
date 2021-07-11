import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly } from 'ts-essentials'
import { computed } from 'mobx'

export type AttackEffect = DeepReadonly<{
  type: 'attack'
  attacksNumber: number
}>

export class AttackEffectModel extends BaseEffectModel<AttackEffect> {
  @computed
  get emptyRef(): AttackEffect {
    return {
      type: 'attack',
      attacksNumber: 1,
    }
  }

  protected unionRef(effect: AttackEffect) {
    return {
      attacksNumber: Math.max(this.ref.attacksNumber, effect.attacksNumber),
    }
  }
}
