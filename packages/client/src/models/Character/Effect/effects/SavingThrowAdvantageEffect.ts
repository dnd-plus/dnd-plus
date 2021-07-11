import { AbilityType } from 'common/reference/AbilityType'
import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { computed } from 'mobx'

export type SavingThrowAdvantageEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'savingThrowAdvantage'
    abilities?: { [k in AbilityType]?: 'advantage' | 'disadvantage' | null }
    damages?: { [k in DamageType]?: 'advantage' | 'disadvantage' | null }
  }>
>

export class SavingThrowAdvantageEffectModel extends BaseEffectModel<SavingThrowAdvantageEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'savingThrowAdvantage',
      abilities: {},
      damages: {},
    } as const
  }

  @computed
  get abilities() {
    return this.ref.abilities || {}
  }

  @computed
  get damages() {
    return this.ref.damages || {}
  }

  unionRef(effect: SavingThrowAdvantageEffect) {
    let unionRef = this.emptyRef
    ;(['abilities', 'damages'] as const).forEach((prop) => {
      const data = { ...this.ref[prop] }
      type Data = typeof data
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

      unionRef = { ...unionRef, [prop]: data }
    })

    return unionRef
  }
}
