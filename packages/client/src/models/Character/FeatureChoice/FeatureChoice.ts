import { CharacterModel } from 'models/Character/CharacterModel'
import {
  BaseFeatureChoiceModel,
  FeatureChoiceAction,
} from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { SelectFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatureChoice'
import {
  SelectLanguageFeatureChoiceModel,
  SelectSkillFeatureChoiceModel,
  SelectToolFeatureChoiceModel,
} from 'models/Character/FeatureChoice/choices/SelectPossessionFeatureChoice'
import { SelectAbilityFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectAbilityFeatureChoice'
import { SelectFeatFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatFeatureChoice'
import { EffectModel } from '../Effect/Effect'
import { noop } from 'lodash-es'
import { SelectAbilityOrFeatFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectAbilityOrFeatFeatureChoice'
import { SelectSpellsFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectSpellsFeatureChoice'
import { SelectCombatStyleFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectCombatStyleFeatureChoice'

const choiceModelsMap = {
  select: SelectFeatureChoiceModel,
  selectAbility: SelectAbilityFeatureChoiceModel,
  selectSkill: SelectSkillFeatureChoiceModel,
  selectTool: SelectToolFeatureChoiceModel,
  selectLanguage: SelectLanguageFeatureChoiceModel,
  selectFeat: SelectFeatFeatureChoiceModel,
  selectAbilityOrFeat: SelectAbilityOrFeatFeatureChoiceModel,
  selectSpells: SelectSpellsFeatureChoiceModel,
  selectCombatStyle: SelectCombatStyleFeatureChoiceModel,
} as const

export type FeatureChoiceModelsMap = typeof choiceModelsMap
export type FeatureChoiceModelType = keyof FeatureChoiceModelsMap
export type FeatureChoiceModel = BaseFeatureChoiceModel<any, any>
export type FeatureChoice = {
  [K in keyof FeatureChoiceModelsMap]: InstanceType<
    FeatureChoiceModelsMap[K]
  >['ref']
}[keyof FeatureChoiceModelsMap]

// eslint-disable-next-line unused-imports/no-unused-vars-ts
const choiceModelsMapGuard: Record<
  FeatureChoice['type'],
  // eslint-disable-next-line @typescript-eslint/ban-types
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
  return undefined
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
