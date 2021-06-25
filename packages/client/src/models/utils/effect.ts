import {
  EFFECT_TYPES,
  EffectModel,
  EffectModelsMap,
  effectModelsMap,
  EffectTypeMap,
} from 'client/src/models/Character/Effect/Effect'
import { createKey } from 'client/src/models/utils/createKey'
import { CharacterModel } from 'client/src/models/Character/CharacterModel'

export function unionEffectModels<T extends keyof EffectModelsMap>(
  characterModel: CharacterModel,
  type: T,
  effectModels: EffectModel[],
): EffectTypeMap[T] {
  const unionModel = new effectModelsMap[type](
    characterModel,
    effectModelsMap[type].emptyRef,
    createKey(type, 'union'),
  )

  effectModels
    .filter((effectModel) => effectModel.type === type)
    .forEach((effect) => {
      unionModel.assignModel(effect)
    })

  return unionModel as EffectTypeMap[T]
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
) {
  return EFFECT_TYPES.reduce(
    (obj, type) => ({
      ...obj,
      [type]: unionEffectModels(characterModel, type, effects),
    }),
    {} as EffectTypeMap,
  )
}
