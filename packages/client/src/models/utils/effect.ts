import {
  EFFECT_TYPES,
  EffectModel,
  EffectModelMap,
  effectModelsMap,
  EffectModelTypeMap,
} from 'client/src/models/Character/Effect/Effect'
import { createKey } from 'client/src/models/utils/createKey'
import { CharacterModel } from 'client/src/models/Character/CharacterModel'
import { withChildEffects } from 'models/Character/EffectsModel'

export function unionEffectModels<T extends keyof EffectModelMap>(
  characterModel: CharacterModel,
  type: T,
  effectModels: EffectModel[],
): EffectModelTypeMap[T] {
  return effectModels.reduce(
    (unionModel, model) => unionModel.createUnionModel(model),
    new effectModelsMap[type](
      characterModel,
      effectModelsMap[type].emptyRef,
      createKey(type, 'union'),
    ),
  ) as EffectModelTypeMap[T]
}

export function compareEffectArrays(a: EffectModel[], b: EffectModel[]) {
  return (
    a === b ||
    (a.length === b.length && a.every(({ ref }, index) => ref === b[index].ref))
  )
}

export function createEffectMap(
  characterModel: CharacterModel,
  effects: EffectModel[],
  produceChildEffects: boolean,
) {
  const resultEffects = produceChildEffects
    ? withChildEffects(characterModel, effects)
    : effects

  return EFFECT_TYPES.reduce(
    (obj, type) => ({
      ...obj,
      [type]: unionEffectModels(characterModel, type, resultEffects),
    }),
    {} as EffectModelTypeMap,
  )
}
