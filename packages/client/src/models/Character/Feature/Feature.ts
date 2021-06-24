import { Effect, effectFactory } from 'models/Character/Effect/Effect'
import {
  FeatureChoice,
  featureChoiceFactory,
} from 'models/Character/FeatureChoice/FeatureChoice'
import { CharacterModel } from 'models/Character/CharacterModel'
import { DeepReadonly } from 'ts-essentials'
import { FeatureChoiceAction } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'
import { computed, makeObservable } from 'mobx'

export type Feature = DeepReadonly<{
  name: string
  description: string
  effects?: Effect[]
  choices?: FeatureChoice[]
}>

export class FeatureModel<Ref extends Feature = Feature> {
  constructor(
    protected readonly characterModel: CharacterModel,
    public readonly ref: Ref,
    public readonly key: string,
    protected readonly choicesState: Record<any, unknown>,
    protected readonly setChoiceAction: FeatureChoiceAction,
  ) {
    makeObservable(this)
  }

  @computed
  get choices() {
    return (
      this.ref.choices?.flatMap((choice, index) => {
        const choiceKey = createKey(this.key, 'choice', index)
        return (
          featureChoiceFactory(
            this.characterModel,
            this.choicesState[choiceKey],
            choice,
            choiceKey,
            this.setChoiceAction,
          ) || []
        )
      }) || []
    )
  }

  @computed
  get choicesCount() {
    return this.choices.reduce((sum, choice) => sum + choice.choicesCount, 0)
  }

  @computed
  get effects() {
    return [
      ...(this.ref.effects || []).flatMap(
        (effect, index) =>
          effectFactory(
            this.characterModel,
            effect,
            createKey(this.key, 'effect', index),
          ) || [],
      ),
      ...this.choices.flatMap((choice) => choice.effects),
    ].map((effect) => effect.withFrom({ feature: this.ref.name }))
  }

  @computed
  get data() {
    return {
      ...this.ref,
      choices: this.choices,
    }
  }
}
