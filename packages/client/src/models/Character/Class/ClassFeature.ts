import {
  Effect,
  effectFactory,
  EffectModel,
} from 'models/Character/Effect/Effect'
import { CharacterLevel } from 'common/types/base/character/Level'
import { DeepReadonly } from 'ts-essentials'
import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import { createKey } from 'models/utils/createKey'
import { computed } from 'mobx'
import {
  levelChoiceMap,
  LevelFeatureChoice,
  LevelFeatureChoiceCreatorParams,
} from 'models/Character/Class/LevelFeatureChoice/LevelFeatureChoice'

type WithoutLevel<Effect> = Effect extends {
  readonly characterLevel: CharacterLevel
}
  ? Omit<Effect, 'characterLevel'>
  : never

type LevelEffect = WithoutLevel<Effect>

export type ClassFeature = Feature &
  DeepReadonly<{
    level: CharacterLevel
    improvement?: true
    levelEffects?: LevelEffect[]
    levelChoices?: LevelFeatureChoice[]
  }>

export class ClassFeatureModel extends FeatureModel<ClassFeature> {
  @computed
  get level() {
    return this.ref.level
  }

  @computed
  get improvement() {
    return this.ref.improvement
  }

  @computed
  get levelEffects() {
    return this.ref.levelEffects || []
  }

  getClassEffects(characterLevel: CharacterLevel): EffectModel[] {
    return [
      ...this.effects,
      ...this.levelEffects.flatMap(
        (levelEffect, index) =>
          effectFactory(
            this.characterModel,
            { ...(levelEffect as Effect), characterLevel } as Effect, // TODO: remove when has at least one level effect
            createKey(this.key, 'levelEffect', index),
            { feature: this.ref.name },
          ) || [],
      ),
    ]
  }

  getLevelChoices(params: LevelFeatureChoiceCreatorParams) {
    return (
      this.ref.levelChoices?.flatMap(({ type, ...info }) => {
        const choiceData = levelChoiceMap[type](params)
        return choiceData
          ? {
              ...choiceData,
              ...info,
            }
          : []
      }) || []
    )
  }
}
