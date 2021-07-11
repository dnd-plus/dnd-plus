import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { AbilityType } from 'common/reference/AbilityType'
import { entries } from 'common/utils/typesafe'
import { computed } from 'mobx'

export type SavingThrowPossessionEffect = DeepReadonly<{
  type: 'savingThrowPossession'
  abilities: {
    [K in AbilityType]?: 'expertise' | 'proficient' | 'halfProficient' | null
  }
}>

export class SavingThrowPossessionEffectModel extends BaseEffectModel<SavingThrowPossessionEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'savingThrowPossession',
      abilities: {},
    } as const
  }

  @computed
  get abilities() {
    return this.ref.abilities
  }

  unionRef(effect: SavingThrowPossessionEffect) {
    const priority = [
      undefined,
      'halfProficient',
      'proficient',
      'expertise',
      null,
    ] as const

    const abilities = { ...this.ref.abilities }

    entries(effect.abilities).forEach(([key, value]) => {
      if (priority.indexOf(abilities[key]) < priority.indexOf(value)) {
        abilities[key] = value
      }
    })

    return { abilities }
  }
}
