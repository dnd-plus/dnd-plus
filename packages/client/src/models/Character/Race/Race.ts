import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import { CreatureSize } from 'common/types/base/stats/CreatureSize'
import { CharacterModel } from 'models/Character/CharacterModel'
import { racesList } from 'models/Character/Race/racesList'
import { DeepReadonly } from 'ts-essentials'
import { createKey } from 'models/utils/createKey'
import { computed, makeObservable } from 'mobx'

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
  constructor(private characterModel: CharacterModel) {
    makeObservable(this)
  }

  get state() {
    return this.characterModel.state.race
  }

  @computed
  get ref() {
    return racesList.find(({ type }) => type === this.state?.type)
  }

  @computed
  get choicesState() {
    return this.state?.choices || ({} as Record<string, unknown>)
  }

  @computed
  get features() {
    return (
      this.ref?.features.map(
        (feature, index) =>
          new FeatureModel(
            this.characterModel,
            feature,
            createKey(this.ref?.type, index),
            this.choicesState,
            this.characterModel.actions.setRaceChoice,
          ),
      ) || []
    )
  }

  @computed
  get choicesCount() {
    return !this.ref
      ? 1
      : this.features.reduce((sum, feature) => {
          return sum + feature.choicesCount
        }, 0)
  }

  @computed
  get data() {
    return this.ref ? { ...this.ref, features: this.features } : undefined
  }

  @computed
  get effects() {
    return this.features.flatMap((feature) =>
      feature.effects.map((effect) =>
        effect.withFrom({ race: this.ref?.name }),
      ),
    )
  }
}
