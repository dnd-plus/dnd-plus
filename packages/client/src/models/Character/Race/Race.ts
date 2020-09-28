import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import { CreatureSize } from 'common/types/base/stats/CreatureSize'
import { CharacterModel } from 'models/Character/CharacterModel'
import { createUseSelector } from 'models/utils/createUseSelector'
import { racesList } from 'models/Character/Race/racesList'
import { DeepReadonly } from 'ts-essentials'
import { createKey } from 'models/utils/createKey'

export type CharacterRace = DeepReadonly<
  {
    type: CharacterRaceType
    image: string
    name: string
    variant?: boolean
    description: string
    size: CreatureSize
    features: Feature[]
  } & (
    | {
        baseType: CharacterRaceBaseType
        baseName: string
      }
    | {
        baseType?: never
        baseName?: never
      }
  )
>

export type CharacterRaceBaseType =
  | 'Dwarf'
  | 'Gnome'
  | 'Halfling'
  | 'Elf'
  | 'Human'

export type CharacterRaceType =
  | 'MountainDwarf'
  | 'HillDwarf'
  | 'ForestGnome'
  | 'RockGnome'
  | 'DeepGnome'
  | 'Dragonborn'
  | 'HalfOrc'
  | 'HalfElf'
  | 'StoutHalfling'
  | 'LighfootHalfling'
  | 'Tiefling'
  | 'HighElf'
  | 'WoodElf'
  | 'EladrinElf'
  | 'Human'
  | 'VariantHuman'

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

  choicesCount = createUseSelector(
    this.features,
    this.characterModel.globalCharacterState,
    (features, state) =>
      features.reduce((sum, feature) => {
        return sum + feature.choicesCountSelector(state)
      }, 0),
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
