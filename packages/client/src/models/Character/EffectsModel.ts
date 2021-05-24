import { CharacterModel } from 'models/Character/CharacterModel'
import {
  createUseSelector,
  OutputAppSelector,
} from 'models/utils/createUseSelector'
import {
  EFFECT_TYPES,
  EffectModel,
  EffectModelsMap,
} from 'models/Character/Effect/Effect'
import { DeepReadonly } from 'ts-essentials'
import { unionEffectModels } from 'models/utils/unionEffectModels'

type EffectTypeSelector<T extends keyof EffectModelsMap> = OutputAppSelector<
  InstanceType<EffectModelsMap[T]>
> & {
  all: OutputAppSelector<InstanceType<EffectModelsMap[T]>[]>
}

type EffectTypeMap = {
  [K in keyof EffectModelsMap]: InstanceType<EffectModelsMap[K]>
}

type EffectTypeSelectorsMap = {
  [K in keyof EffectModelsMap]: EffectTypeSelector<K>
}

export class EffectsModel {
  constructor(private characterModel: CharacterModel) {}

  private raw = createUseSelector(
    this.characterModel.baseAbilitiesEffect,
    this.characterModel.race.effects,
    (baseAbilitiesEffect, raceEffects) => [baseAbilitiesEffect, ...raceEffects],
  )

  readonly all = createUseSelector(
    this.raw,
    this.characterModel.race.ref,
    (effects, raceRef) => {
      const effectMap = EFFECT_TYPES.reduce(
        (obj, type) => ({
          ...obj,
          [type]: unionEffectModels(this.characterModel, type, effects),
        }),
        {} as EffectTypeMap,
      )

      for (let i = 0; i < effects.length; i++) {
        const childEffects = effects[i].getChildEffects({ effectMap, raceRef })

        effects.push(...childEffects)
        childEffects.forEach((effect) => {
          effectMap[effect.type].assignModel(effect)
        })
      }

      console.log(effects)

      return effects
    },
  )

  private createEffectSelector<T extends keyof EffectModelsMap>(type: T) {
    const selectorAll = createUseSelector(this.all, (effects) =>
      effects.filter((effect) => effect.type === type),
    )

    const selector = createUseSelector(this.all, (effects) => {
      return unionEffectModels(this.characterModel, type, effects)
    })

    const selectorWithAll = selector as typeof selector & {
      all: typeof selectorAll
    }

    selectorWithAll.all = selectorAll

    return selectorWithAll
  }

  readonly type: DeepReadonly<EffectTypeSelectorsMap> = EFFECT_TYPES.reduce(
    (obj, type) => {
      return {
        ...obj,
        [type]: this.createEffectSelector(type),
      }
    },
    {} as EffectTypeSelectorsMap,
  )

  readonly normalized = createUseSelector(
    Object.values(this.type) as OutputAppSelector<EffectModel>[],
    (effects) => effects,
  )
}
