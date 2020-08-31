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

type EffectTypeSelector<
  T extends keyof EffectModelsMap
> = OutputAppSelector<InstanceType<EffectModelsMap[T]> | null> & {
  all: OutputAppSelector<InstanceType<EffectModelsMap[T]>[]>
}

type EffectTypeSelectorsMap = {
  [K in keyof EffectModelsMap]: EffectTypeSelector<K>
}

export class EffectsModel {
  constructor(private characterModel: CharacterModel) {}

  readonly effectsAll = createUseSelector(
    this.characterModel.race.effects,
    (raceEffects) => [...raceEffects],
  )

  private createEffectSelector<T extends keyof EffectModelsMap>(type: T) {
    const selectorAll = createUseSelector(
      this.effectsAll,
      (effects) =>
        effects.filter(
          (effect) => effect.type === type,
          // change type from array of union to union of arrays to correct reduce
        ) as InstanceType<EffectModelsMap[T]>[],
    )

    const selector = createUseSelector(selectorAll, (effects) =>
      effects.length
        ? effects.reduce((a, b) => {
            a.assignModel(b as any)
            return a
          })
        : null,
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
