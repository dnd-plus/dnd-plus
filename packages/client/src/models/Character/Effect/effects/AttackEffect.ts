import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly } from 'ts-essentials'

export type AttackEffect = DeepReadonly<{
  type: 'attack'
  attacksNumber: number
}>

export class AttackEffectModel extends BaseEffectModel<AttackEffect> {
  get emptyRef(): AttackEffect {
    return {
      type: 'attack',
      attacksNumber: 1,
    }
  }

  protected assign(effect: AttackEffect): void {
    this.ref.attacksNumber = Math.max(
      this.ref.attacksNumber,
      effect.attacksNumber,
    )
  }
}
