import { AbilityName } from 'common/reference/AbilityType'
import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type SavingThrowEffect = DeepReadonly<
  | {
      type: 'savingThrow'
      abilities: { [k in AbilityName]?: 'advantage' | 'disadvantage' | null }
      damages?: { [k in DamageType]?: 'advantage' | 'disadvantage' | null }
    }
  | {
      type: 'savingThrow'
      abilities?: { [k in AbilityName]?: 'advantage' | 'disadvantage' | null }
      damages: { [k in DamageType]?: 'advantage' | 'disadvantage' | null }
    }
>

export class SavingThrowEffectModel extends BaseEffectModel<SavingThrowEffect> {
  assign(effect: SavingThrowEffect) {
    ;(['abilities', 'damages'] as const).forEach((prop) => {
      const data = { ...this.ref[prop] }
      type Data = typeof data

      if (data) {
        ;(Object.entries(effect[prop] || []) as Array<
          [keyof Data, Data[keyof Data]]
        >).forEach(([key, value]) => {
          if (value === undefined || data[key] === null) {
            return
          } else if (data[key] === undefined || value === null) {
            data[key] = value
          } else if (
            (data[key] === 'advantage' && value === 'disadvantage') ||
            (data[key] === 'disadvantage' && value === 'advantage')
          ) {
            data[key] = null as never
          }
        })

        this.ref[prop] = data
      }
    })
  }
}
