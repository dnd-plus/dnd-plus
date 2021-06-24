import { AbilitiesMap, ABILITY_TYPES } from 'common/reference/AbilityType'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { Memoize } from 'models/utils/Memoize'

export type AbilityEffect = DeepReadonly<{
  type: 'ability'
  abilities: Partial<AbilitiesMap>
  maximum?: Partial<AbilitiesMap>
}>

const DEFAULT_MAX = 20

export class AbilityEffectModel extends BaseEffectModel<AbilityEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'ability',
      level: 1,
      abilities: {},
    } as const
  }

  @Memoize()
  get abilities() {
    return this.ref.abilities || {}
  }

  assign(effect: AbilityEffect) {
    const abilities = { ...this.ref.abilities }
    const maximum = { ...this.ref.maximum }

    ABILITY_TYPES.forEach((key) => {
      maximum[key] = Math.max(
        maximum[key] || DEFAULT_MAX,
        effect.maximum?.[key] || DEFAULT_MAX,
      )
    })
    ABILITY_TYPES.forEach((key) => {
      abilities[key] = Math.min(
        (abilities[key] || 0) + (effect.abilities?.[key] || 0),
        maximum[key] || DEFAULT_MAX,
      )
    })

    this.ref.abilities = abilities
    this.ref.maximum = maximum
  }
}
