import { FeatureChoiceModel } from 'models/Character/FeatureChoice/FeatureChoice'
import { CharacterModel } from 'models/Character/CharacterModel'
import { EffectTypeMap } from 'models/Character/Effect/Effect'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { selectSpellsLevelFeatureChoice } from 'models/Character/Class/LevelFeatureChoice/choices/SelectSpellsLevelFeatureChoice'

export const levelChoiceMap = {
  selectSpell: selectSpellsLevelFeatureChoice,
}

export type LevelFeatureChoiceCreatorParams = {
  characterModel: CharacterModel
  currentEffectMap: EffectTypeMap
  classType: CharacterClassName
  key: string
}

export type LevelFeatureChoiceCreator = (
  params: LevelFeatureChoiceCreatorParams,
) =>
  | {
      choice: FeatureChoiceModel
    }
  | undefined

export type LevelFeatureChoice = {
  type: keyof typeof levelChoiceMap
  title: string
}
