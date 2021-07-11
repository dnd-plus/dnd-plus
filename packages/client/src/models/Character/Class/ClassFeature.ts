import {
  Effect,
  effectFactory,
  EffectTypeMap,
  EffectModel,
  EffectType,
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

type NotString<T> = T extends any ? (string extends T ? never : T) : never

type LevelEffect = {
  [K in EffectType]: 'classLevel' extends NotString<keyof EffectTypeMap[K]>
    ? Omit<EffectTypeMap[K], 'classLevel'>
    : never
}[EffectType]

export type ClassFeature = Feature &
  DeepReadonly<{
    level: CharacterLevel
    levelEffects?: LevelEffect[]
    levelChoices?: LevelFeatureChoice[]
    nextLevels?: Omit<ClassFeature, 'nextLevels' | 'name'>[]
  }>

type ClassFeatureExtended = ClassFeature & {
  improvement?: boolean
  archetype?: boolean
}

export class ClassFeatureModel extends FeatureModel<ClassFeatureExtended> {
  @computed
  get level() {
    return this.ref.level
  }

  @computed
  get improvement() {
    return this.ref.improvement
  }

  @computed
  get archetype() {
    return this.ref.archetype
  }

  @computed
  get levelEffects() {
    return this.ref.levelEffects || []
  }

  getClassEffects(classLevel: CharacterLevel): EffectModel[] {
    return [
      ...this.effects,
      ...this.levelEffects.flatMap(
        (levelEffect, index) =>
          effectFactory(
            this.characterModel,
            { ...levelEffect, classLevel } as Effect,
            createKey(this.key, 'levelEffect', index),
            { feature: this.ref.name },
          ) || [],
      ),
    ]
  }

  getLevelChoices(params: LevelFeatureChoiceCreatorParams) {
    return (
      this.ref.levelChoices?.flatMap(({ title, type, ...levelChoice }) => {
        const choiceData = levelChoiceMap[type](params, levelChoice)
        return choiceData
          ? {
              title,
              ...choiceData,
            }
          : []
      }) || []
    )
  }
}
