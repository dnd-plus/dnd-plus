import { CharacterModel } from 'models/Character/CharacterModel'
import {
  createUseSelector,
  OutputAppSelector,
} from 'models/utils/createUseSelector'
import {
  EFFECT_TYPES,
  EffectModel,
  effectModelsMap,
  EffectModelsMap,
} from 'models/Character/Effect/Effect'
import { DeepReadonly } from 'ts-essentials'
import { createKey } from 'models/utils/createKey'

type EffectTypeSelector<T extends keyof EffectModelsMap> = OutputAppSelector<
  InstanceType<EffectModelsMap[T]>
> & {
  all: OutputAppSelector<InstanceType<EffectModelsMap[T]>[]>
}

type EffectTypeSelectorsMap = {
  [K in keyof EffectModelsMap]: EffectTypeSelector<K>
}

export class EffectsModel {
  constructor(private characterModel: CharacterModel) {}

  readonly effectsAllRaw = createUseSelector(
    this.characterModel.baseAbilitiesEffect,
    this.characterModel.race.effects,
    (baseAbilitiesEffect, raceEffects) => [baseAbilitiesEffect, ...raceEffects],
  )

  readonly effectsAllStatic = createUseSelector(
    this.effectsAllRaw,
    (effectsRaw) =>
      effectsRaw.flatMap((effect) =>
        effect.fromState ? [] : effect.computed ? effect.computed() : effect,
      ),
  )

  readonly effectsAllFromState = createUseSelector(
    this.effectsAllRaw,
    (state) => state,
    (effectsRaw, state) =>
      effectsRaw.flatMap((effect) =>
        effect.fromState ? effect.fromState(state) : [],
      ),
  )

  readonly effectsAll = createUseSelector(
    this.effectsAllStatic,
    this.effectsAllFromState,
    (staticEffects, fromStateEffects) => [
      ...staticEffects,
      ...fromStateEffects,
    ],
  )

  private createEffectSelector<T extends keyof EffectModelsMap>(type: T) {
    const selectorAll = createUseSelector(this.effectsAll, (effects) =>
      effects.filter((effect) => effect.type === type),
    )

    const selector = createUseSelector(selectorAll, (effects) =>
      effects.length
        ? effects.reduce((a, b) => {
            a.assignModel(b as any)
            return a
          })
        : new effectModelsMap[type](
            this.characterModel,
            effectModelsMap[type].emptyRef,
            createKey(type, 'empty'),
          ),
    )

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

  readonly effectsNormalized = createUseSelector(
    Object.values(this.type) as OutputAppSelector<EffectModel>[],
    (effects) => effects,
  )
}
