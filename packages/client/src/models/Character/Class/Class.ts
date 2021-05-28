import {
  CHARACTER_CLASS_NAMES,
  CharacterClassName,
} from 'common/types/base/character/CharacterClassName'
import { Dice } from 'common/types/base/Dice'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { WeaponTypeWithGroups } from 'common/reference/equipment/WeaponType'
import { ToolType } from 'common/reference/equipment/ToolType'
import { AbilityType } from 'common/reference/AbilityType'
import { SkillType } from 'common/reference/SkillType'
import { SpellCastingType } from 'common/types/base/character/Feature/SpellSlotsType'
import { ClassFeature } from 'models/Character/Feature/Feature'
import { DeepReadonly } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { createUseSelector } from 'models/utils/createUseSelector'
import { CharacterClassState } from 'common/modules/character/redux'
import { classMap } from 'models/Character/Class/classMap'

export type CharacterClass = DeepReadonly<{
  type: CharacterClassName
  hitDice: Dice
  proficiencies: {
    armor: ArmorType[]
    weapon: WeaponTypeWithGroups[]
    tools: ToolType[]
    savingThrows: AbilityType[]
    skillsChoice: SkillType[]
    skillsNumber: number
  }
  spellCasting?: {
    type: SpellCastingType
    ability: AbilityType
    ritual: boolean
    focus: boolean
  }
  features: ClassFeature[]
}>

export class ClassModel {
  constructor(private characterModel: CharacterModel) {}

  state = createUseSelector(
    this.characterModel.state,
    (characterState) => characterState.class,
  )

  refMap = createUseSelector(this.state, (state) =>
    CHARACTER_CLASS_NAMES.reduce((obj, type) => {
      if (state?.[type]) {
        obj[type] = classMap[type]
      }
      return obj
    }, {} as { [K in CharacterClassName]?: CharacterClassState }),
  )

  refList = createUseSelector(this.state, (state) =>
    CHARACTER_CLASS_NAMES.flatMap((type) =>
      state?.[type] ? classMap[type] : [],
    ),
  )

  choicesStateMap = createUseSelector(this.state, (state) =>
    CHARACTER_CLASS_NAMES.reduce((obj, type) => {
      if (state?.[type]) {
        obj[type] = state[type]?.choices || {}
      }
      return obj
    }, {} as { [K in CharacterClassName]?: Record<string, unknown> }),
  )

  choicesStateList = createUseSelector(this.state, (state) =>
    CHARACTER_CLASS_NAMES.flatMap((type) =>
      state?.[type]?.choices || [],
    ),
  )
}
