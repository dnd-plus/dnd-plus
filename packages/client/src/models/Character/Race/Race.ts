import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import { CreatureSize } from 'common/types/base/stats/CreatureSize'
import { CharacterModel } from 'models/Character/CharacterModel'
import { createUseSelector } from 'models/utils/createUseSelector'
import { racesList } from 'models/Character/Race/racesList'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'

export type CharacterRace = DeepReadonly<{
  type: string
  image: string
  baseName?: string
  name: string
  variant?: boolean
  description: string
  size: CreatureSize
  features: Feature[]
}>

export class RaceModel {
  constructor(private characterModel: CharacterModel) {}

  state = createUseSelector(
    this.characterModel.state,
    (characterState) => characterState.race,
  )

  ref = createUseSelector(this.state, (state) =>
    racesList.find(({ type }) => type === state?.type),
  )

  choicesState = createUseSelector(
    this.state,
    (state) => state?.choices || ({} as Record<string, unknown>),
  )

  isEmpty = createUseSelector(this.ref, (ref) => !ref)

  features = createUseSelector(
    this.ref,
    this.choicesState,
    (ref, choicesState) =>
      ref?.features.map(
        (feature, index) =>
          new FeatureModel(
            this.characterModel,
            feature,
            createKey(ref.type, +index),
            choicesState,
            this.characterModel.actions.setRaceChoice,
          ),
      ) || [],
  )

  neededChoices = createUseSelector(this.features, (features) =>
    features.reduce((neededChoices, feature) => {
      return neededChoices.concat(feature.neededChoices)
    }, [] as BaseFeatureChoiceModel<any, any>[]),
  )

  neededChoicesCount = createUseSelector(
    this.neededChoices,
    (neededChoices) => neededChoices.length,
  )

  data = createUseSelector(this.ref, this.features, (ref, features) =>
    ref
      ? {
          ...ref,
          features,
        }
      : undefined,
  )

  effects = createUseSelector(this.ref, this.features, (ref, features) =>
    features.flatMap((feature) =>
      feature.effects.map((effect) => effect.withFrom({ race: this.ref.name })),
    ),
  )
}
