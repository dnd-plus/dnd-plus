import { CharacterModel } from 'models/Character/CharacterModel'
import {
  BaseFeatureChoiceModel,
  FeatureChoiceAction,
} from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { SelectFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatureChoice'
import {
  SelectLanguageFeatureChoiceModel,
  SelectSkillFeatureChoiceModel,
} from 'models/Character/FeatureChoice/choices/SelectPossessionFeatureChoice'

const choiceModelsMap = {
  select: SelectFeatureChoiceModel,
  selectSkill: SelectSkillFeatureChoiceModel,
  selectLanguage: SelectLanguageFeatureChoiceModel,
} as const

type FeatureChoiceModelsMap = typeof choiceModelsMap
export type FeatureChoice = {
  [K in keyof FeatureChoiceModelsMap]: InstanceType<
    FeatureChoiceModelsMap[K]
  > extends BaseFeatureChoiceModel<infer R, any>
    ? R
    : null
}[keyof FeatureChoiceModelsMap]

// eslint-disable-next-line unused-imports/no-unused-vars-ts
const choiceModelsMapGuard: Record<
  FeatureChoice['type'],
  Function
> = choiceModelsMap

export function featureChoiceFactory(
  characterModel: CharacterModel,
  state: unknown,
  choice: FeatureChoice,
  key: string,
  setStateAction: FeatureChoiceAction,
) {
  if (choiceModelsMap[choice.type]) {
    return new choiceModelsMap[choice.type](
      characterModel,
      state,
      choice as any, // todo: understand and fix type error
      key,
      setStateAction,
    )
  }
  return null
}
