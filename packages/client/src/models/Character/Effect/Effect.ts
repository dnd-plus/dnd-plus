import { EffectFrom } from 'models/Character/Effect/BaseEffect'
import { Tuple, Writable } from 'ts-essentials'
import {
  AbilityEffect,
  AbilityEffectModel,
} from 'models/Character/Effect/effects/AbilityEffect'
import {
  MovementEffect,
  MovementEffectModel,
} from 'models/Character/Effect/effects/MovementEffect'
import {
  EquipmentPossessionEffect,
  EquipmentPossessionEffectModel,
} from 'models/Character/Effect/effects/EquipmentPossessionEffect'
import {
  DefenceEffect,
  DefenceEffectModel,
} from 'models/Character/Effect/effects/DefenceEffect'
import {
  SavingThrowAdvantageEffect,
  SavingThrowAdvantageEffectModel,
} from 'models/Character/Effect/effects/SavingThrowAdvantageEffect'
import {
  SkillPossessionEffect,
  SkillPossessionEffectModel,
} from 'models/Character/Effect/effects/SkillPossessionEffect'
import {
  VisionEffect,
  VisionEffectModel,
} from 'models/Character/Effect/effects/VisionEffect'
import { CharacterModel } from 'models/Character/CharacterModel'
import {
  LanguageEffect,
  LanguageEffectModel,
} from 'models/Character/Effect/effects/LanguageEffect'
import {
  SavingThrowPossessionEffect,
  SavingThrowPossessionEffectModel,
} from 'models/Character/Effect/effects/SavingThrowPossessionEffect'
import {
  FeatEffect,
  FeatEffectModel,
} from 'models/Character/Effect/effects/FeatEffect'
import {
  HitPointEffect,
  HitPointEffectModel,
} from 'models/Character/Effect/effects/HitPointEffect'
import {
  ArmorClassEffect,
  ArmorClassEffectModel,
} from './effects/ArmorClassEffect'
import {
  SpellCastingEffect,
  SpellCastingEffectModel,
} from 'models/Character/Effect/effects/SpellCastingEffect'
import {
  EmptyEffect,
  EmptyEffectModel,
} from 'models/Character/Effect/effects/EmptyEffect'
import {
  AttackEffect,
  AttackEffectModel,
} from 'models/Character/Effect/effects/AttackEffect'
import {
  CombatStyleEffect,
  CombatStyleEffectModel,
} from 'models/Character/Effect/effects/CombatStyle'
import { extendType } from 'common/utils/extendType'

export type EffectTypeMap = {
  empty: EmptyEffect
  ability: AbilityEffect
  attack: AttackEffect
  defence: DefenceEffect
  equipmentPossession: EquipmentPossessionEffect
  movement: MovementEffect
  savingThrowAdvantage: SavingThrowAdvantageEffect
  savingThrowPossession: SavingThrowPossessionEffect
  skillPossession: SkillPossessionEffect
  vision: VisionEffect
  language: LanguageEffect
  feat: FeatEffect
  hitPoint: HitPointEffect
  armorClass: ArmorClassEffect
  spellCasting: SpellCastingEffect
  combatStyle: CombatStyleEffect
}

export type EffectType = keyof EffectTypeMap

export const effectModelsMap = extendType<Record<EffectType, any>>()({
  empty: EmptyEffectModel,
  ability: AbilityEffectModel,
  attack: AttackEffectModel,
  defence: DefenceEffectModel,
  equipmentPossession: EquipmentPossessionEffectModel,
  movement: MovementEffectModel,
  savingThrowAdvantage: SavingThrowAdvantageEffectModel,
  savingThrowPossession: SavingThrowPossessionEffectModel,
  skillPossession: SkillPossessionEffectModel,
  vision: VisionEffectModel,
  language: LanguageEffectModel,
  feat: FeatEffectModel,
  hitPoint: HitPointEffectModel,
  armorClass: ArmorClassEffectModel,
  spellCasting: SpellCastingEffectModel,
  combatStyle: CombatStyleEffectModel,
})

export const EFFECT_TYPES = Object.keys(effectModelsMap) as Tuple<EffectType>

export type EffectModelMap = Writable<typeof effectModelsMap>
export type EffectModel = InstanceType<EffectModelMap[keyof EffectModelMap]>
export type Effect = EffectTypeMap[EffectType]
export type EffectModelTypeMap = {
  [K in EffectType]: InstanceType<EffectModelMap[K]>
}

export function effectFactory(
  characterModel: CharacterModel,
  effect: Effect,
  key: string,
  from?: EffectFrom,
) {
  if (effectModelsMap[effect.type]) {
    return new effectModelsMap[effect.type](
      characterModel,
      effect as any,
      key,
      from,
    )
  }
  return undefined
}
