import { CharacterModel } from 'models/Character/CharacterModel'
import { SelectFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatureChoice'
import {
  FeatureChoice,
  FeatureChoiceAction,
} from 'models/Character/FeatureChoice/FeatureChoice'

export function featureChoiceFactory(
  characterModel: CharacterModel,
  state: unknown,
  choice: FeatureChoice,
  key: string,
  setStateAction: FeatureChoiceAction,
) {
  switch (choice.type) {
    case 'select':
      return new SelectFeatureChoiceModel(
        characterModel,
        state,
        choice,
        key,
        setStateAction,
      )
  }
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  const typeGuard: never = choice.type
  return null
}
