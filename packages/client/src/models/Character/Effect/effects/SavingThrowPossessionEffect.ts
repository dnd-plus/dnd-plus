import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { AbilityType } from 'common/reference/AbilityType'

export type SavingThrowPossessionEffect = DeepReadonly<{
  type: 'savingThrowPossession'
  abilities: {
    [K in AbilityType]?: 'expertise' | 'proficient' | 'halfProficient' | null
  }
}>

// noinspection JSConstantReassignment
export class SavingThrowPossessionEffectModel extends BaseEffectModel<
  SavingThrowPossessionEffect
> {
  assign(effect: SavingThrowPossessionEffect) {
    const priority = [
      undefined,
      'halfProficient',
      'proficient',
      'expertise',
      null,
    ] as const

    type Abilities = SavingThrowPossessionEffect['abilities']
    const abilities = { ...this.ref.abilities }

    ;(Object.entries(effect.abilities) as Array<
      [keyof Abilities, Abilities[keyof Abilities]]
    >).forEach(([key, value]) => {
      if (priority.indexOf(abilities[key]) < priority.indexOf(value)) {
        abilities[key] = value
      }
    })

    this.ref.abilities = abilities
  }
}
