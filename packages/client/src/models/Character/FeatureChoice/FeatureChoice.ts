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
import { SelectAbilityFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectAbilityFeatureChoice'
import { SelectFeatFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatFeatureChoice'
import { EffectModel } from '../Effect/Effect'
import { noop } from 'lodash-es'

const choiceModelsMap = {
  select: SelectFeatureChoiceModel,
  selectAbility: SelectAbilityFeatureChoiceModel,
  selectSkill: SelectSkillFeatureChoiceModel,
  selectLanguage: SelectLanguageFeatureChoiceModel,
  selectFeat: SelectFeatFeatureChoiceModel,
} as const

type FeatureChoiceModelsMap = typeof choiceModelsMap
export type FeatureChoiceModel = BaseFeatureChoiceModel<any, any>
export type FeatureChoice = {
  [K in keyof FeatureChoiceModelsMap]: InstanceType<
    FeatureChoiceModelsMap[K]
  >['ref']
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

export function getFeatureChoiceEffects(
  characterModel: CharacterModel,
  state: unknown,
  choice: FeatureChoice,
  key: string,
): EffectModel[] {
  return (
    featureChoiceFactory(
      characterModel,
      state,
      choice,
      key,
      noop as FeatureChoiceAction,
    )?.effects || []
  )
}
