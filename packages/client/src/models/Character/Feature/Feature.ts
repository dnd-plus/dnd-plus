import { Effect, effectFactory } from 'models/Character/Effect/Effect'
import {
  FeatureChoice,
  featureChoiceFactory,
} from 'models/Character/FeatureChoice/FeatureChoice'

import { CharacterModel } from 'models/Character/CharacterModel'
import { DeepReadonly } from 'ts-essentials'
import {
  BaseFeatureChoiceModel,
  FeatureChoiceAction,
} from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'

export type Feature = DeepReadonly<{
  name: string
  description: string
  effects?: Effect[]
  choices?: FeatureChoice[]
}>

export class FeatureModel {
  constructor(
    private readonly characterModel: CharacterModel,
    public readonly ref: Feature,
    public readonly key: string,
    private readonly choicesState: Record<any, unknown>,
    private readonly setChoiceAction: FeatureChoiceAction,
  ) {}

  get choices() {
    const resultModels: BaseFeatureChoiceModel<any, any>[] = []
    this.ref.choices?.forEach((choice, index) => {
      const choiceKey = createKey(this.key, 'choice', index)
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

  get effects() {
    return [
      ...(this.ref.effects || []).flatMap(
        (effect, index) =>
          effectFactory(
            this.characterModel,
            effect,
            createKey(this.key, 'effect', index),
            { race: this.ref.name },
          ) || [],
      ),
      ...this.choices.flatMap((choice) => choice.effects),
    ]
  }

  get data() {
    return {
      ...this.ref,
      choices: this.choices,
    }
  }
}
