import { AbilityType } from 'common/reference/AbilityType'
import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { Memoize } from 'models/utils/Memoize'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

export type SavingThrowAdvantageEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'savingThrowAdvantage'
    abilities?: { [k in AbilityType]?: 'advantage' | 'disadvantage' | null }
    damages?: { [k in DamageType]?: 'advantage' | 'disadvantage' | null }
  }>
>

export class SavingThrowAdvantageEffectModel extends BaseEffectModel<SavingThrowAdvantageEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'savingThrowAdvantage',
      abilities: {},
      damages: {},
    } as const
  }

  @Memoize()
  get abilities() {
    return this.ref.abilities || {}
  }

  @Memoize()
  get damages() {
    return this.ref.damages || {}
  }

  assign(effect: SavingThrowAdvantageEffect) {
    ;(['abilities', 'damages'] as const).forEach((prop) => {
      const data = { ...this.ref[prop] }
      type Data = typeof data

      if (data) {
        ;(
          Object.entries(effect[prop] || []) as Array<
            [keyof Data, Data[keyof Data]]
          >
        ).forEach(([key, value]) => {
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
