import { Effect } from 'models/types/Effect'
import {
  BaseFeatureChoiceModel,
  FeatureChoice,
  FeatureChoiceAction,
} from 'models/Character/FeatureChoice/FeatureChoice'
import { BaseModel } from 'models/Character/BaseModel'
import { CharacterModel } from 'models/Character/CharacterModel'
import { featureChoiceFactory } from 'models/Character/FeatureChoice/featureChoiceFactory'

export type Feature = {
  name: string
  description: string
  effects?: Effect[]
  choices?: FeatureChoice[]
}

export class FeatureModel implements BaseModel {
  constructor(
    private characterModel: CharacterModel,
    public state: Feature,
    public key: string,
    private choicesState: Record<any, unknown>,
    private setChoiceAction: FeatureChoiceAction,
  ) {}

  get choices() {
    const resultModels: BaseFeatureChoiceModel<any>[] = []
    this.state.choices?.forEach((choice, index) => {
      const choiceKey = this.key + ':' + index
      const choiceModel = featureChoiceFactory(
        this.characterModel,
        this.choicesState[choiceKey],
        choice,
        choiceKey,
        this.setChoiceAction,
      )
      if (choiceModel) {
        resultModels.push(choiceModel)
      }
    })
    return resultModels
  }

  get neededChoices() {
    return this.choices.filter((choice) => !choice.chosen)
  }

  get neededChoicesCount() {
    return this.neededChoices.length
  }

  get data() {
    return {
      ...this.state,
      choices: this.choices,
    }
  }
}
