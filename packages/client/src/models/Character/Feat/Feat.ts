import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { AbilitiesMap } from 'common/reference/AbilityType'
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
import { FeatureChoice } from 'models/Character/FeatureChoice/FeatureChoice'
import { RuleSource } from 'common/types/RuleSource'
import { keys } from 'common/utils/typesafe'
import { SpellCastingEffectModel } from 'models/Character/Effect/effects/SpellCastingEffect'

export type FeatCondition = OneOfOptionalRequired<{
  abilities?: Partial<AbilitiesMap>
  armorPossession?: ArmorType
  spellCasting?: true
  race?: CharacterRaceType | CharacterRaceBaseType
  size?: CreatureSize
}>

export type Feat = {
  id: number
  nameEn: string
  name: string
  source: RuleSource
  description: string
  type: 'general' | 'armor' | 'weapon' | 'racial'
  demands?: {
    text: string
    conditions: FeatCondition[]
  }
  effects?: Effect[]
  choices?: FeatureChoice[]
}

export type CheckFeatConditionsProps = {
  abilityEffect: AbilityEffectModel
  equipmentPossessionEffect: EquipmentPossessionEffectModel
  spellCastingEffect: SpellCastingEffectModel
  raceRef?: CharacterRace
}

export function checkFeatConditions(
  feat: Feat,
  {
    abilityEffect,
    equipmentPossessionEffect,
    raceRef,
    spellCastingEffect,
  }: CheckFeatConditionsProps,
) {
  if (!feat.demands) return true

  return feat.demands.conditions.some(
    ({ abilities, armorPossession, race, size, spellCasting }) =>
      // abilities
      (!abilities ||
        keys(abilities).every(
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
      (!spellCasting || spellCastingEffect.hasSpellCasting),
  )
}
