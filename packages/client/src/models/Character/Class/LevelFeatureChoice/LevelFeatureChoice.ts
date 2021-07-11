import { FeatureChoiceModel } from 'models/Character/FeatureChoice/FeatureChoice'
import { CharacterModel } from 'models/Character/CharacterModel'
import { EffectModelTypeMap } from 'models/Character/Effect/Effect'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import {
  selectSpellsLevelFeatureChoice,
  SelectSpellsLevelFeatureChoiceRef,
} from 'models/Character/Class/LevelFeatureChoice/choices/SelectSpellsLevelFeatureChoice'

type LevelChoiceTypeMap = {
  selectSpell: SelectSpellsLevelFeatureChoiceRef
}

type LevelChoiceType = keyof LevelChoiceTypeMap

export const levelChoiceMap: {
  [K in LevelChoiceType]: LevelFeatureChoiceCreator<LevelChoiceTypeMap[K]>
} = {
  selectSpell: selectSpellsLevelFeatureChoice,
}

export type LevelFeatureChoiceCreatorParams = {
  characterModel: CharacterModel
  currentEffectMap: EffectModelTypeMap
  classType: CharacterClassName
  key: string
}

export type LevelFeatureChoiceCreator<Ref> = (
  params: LevelFeatureChoiceCreatorParams,
  ref: Ref,
) =>
  | {
      choice: FeatureChoiceModel
    }
  | undefined

export type LevelFeatureChoice = {
  [K in LevelChoiceType]: {
    title: string
    type: K
  } & LevelChoiceTypeMap[K]
}[LevelChoiceType]
