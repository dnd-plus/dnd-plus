import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { AbilitiesMap, AbilityType } from 'common/reference/AbilityType'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { CreatureSize } from 'common/types/base/stats/CreatureSize'
import {
  CharacterRace,
  CharacterRaceBaseType,
  CharacterRaceType,
} from 'models/Character/Race/Race'
import { Effect } from 'models/Character/Effect/Effect'
import { AbilityEffectModel } from 'models/Character/Effect/effects/AbilityEffect'
import { EquipmentPossessionEffectModel } from 'models/Character/Effect/effects/EquipmentPossessionEffect'

export type FeatCondition = OneOfOptionalRequired<{
  abilities?: Partial<AbilitiesMap>
  armorPossession?: ArmorType
  spellCasting?: true
  race?: CharacterRaceType | CharacterRaceBaseType
  size?: CreatureSize
}>

// todo: add choices
export type Feat = {
  id: number
  nameEn: string
  name: string
  source: 'PHB' | 'XGTE'
  description: string
  type: 'general' | 'armor' | 'weapon' | 'racial'
  demands?: {
    text: string
    conditions: FeatCondition[]
  }
  effects?: Effect[]
}

export function checkFeatConditions(
  feat: Feat,
  {
    abilityEffect,
    equipmentPossessionEffect,
    raceRef,
  }: {
    abilityEffect: AbilityEffectModel
    equipmentPossessionEffect: EquipmentPossessionEffectModel
    raceRef?: CharacterRace
  },
) {
  if (!feat.demands) return true

  return feat.demands.conditions.some(
    ({ abilities, armorPossession, race, size, spellCasting }) =>
      // abilities
      (!abilities ||
        (Object.keys(abilities) as AbilityType[]).every(
          (key) =>
            Number(abilities[key]) <= Number(abilityEffect.abilities[key]),
        )) &&
      // armor
      (!armorPossession ||
        equipmentPossessionEffect.armor.includes(armorPossession)) &&
      // race
      (!race || raceRef?.baseType === race || raceRef?.type === race) &&
      // size
      (!size || size === raceRef?.size) &&
      // spell casting
      !spellCasting,
  )
}
