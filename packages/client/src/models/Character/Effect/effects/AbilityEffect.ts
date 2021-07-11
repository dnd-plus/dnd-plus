import { AbilitiesMap, ABILITY_TYPES } from 'common/reference/AbilityType'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { mapValues } from 'common/utils/typesafe'
import { computed } from 'mobx'

export type AbilityEffect = DeepReadonly<{
  type: 'ability'
  abilities: Partial<AbilitiesMap>
  maximum?: Partial<AbilitiesMap>
}>

const DEFAULT_MAX = 20

export class AbilityEffectModel extends BaseEffectModel<AbilityEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'ability',
      level: 1,
      abilities: {},
    } as const
  }

  @computed
  get abilities() {
    return {
      strength: this.ref.abilities?.strength || 0,
      dexterity: this.ref.abilities?.dexterity || 0,
      constitution: this.ref.abilities?.constitution || 0,
      intelligence: this.ref.abilities?.intelligence || 0,
      wisdom: this.ref.abilities?.wisdom || 0,
      charisma: this.ref.abilities?.charisma || 0,
    }
  }

  @computed
  get modifiers() {
    return mapValues(this.abilities, (ability, value) =>
      Math.floor((value - 10) / 2),
    )
  }

  unionRef(effect: AbilityEffect) {
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

    return { abilities, maximum }
  }
}
