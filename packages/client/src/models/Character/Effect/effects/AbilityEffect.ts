import { AbilitiesMap } from 'common/reference/AbilityType'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type AbilityEffect = DeepReadonly<{
  type: 'ability'
  abilities: Partial<AbilitiesMap>
}>

export class AbilityEffectModel extends BaseEffectModel<AbilityEffect> {
  assign(effect: AbilityEffect) {
    type Abilities = AbilityEffect['abilities']
    const abilities = { ...this.ref.abilities }

    ;(Object.entries(effect.abilities) as Array<
      [keyof Abilities, Abilities[keyof Abilities]]
    >).forEach(([key, value]) => {
      abilities[key] = (abilities[key] || 0) + (value || 0)
    })

    this.ref.abilities = abilities
  }
}
