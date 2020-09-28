import {
  EffectModel,
  EffectModelsMap,
  effectModelsMap,
} from 'client/src/models/Character/Effect/Effect'
import { createKey } from 'client/src/models/utils/createKey'
import { CharacterModel } from 'client/src/models/Character/CharacterModel'

export function unionEffectModels<T extends keyof EffectModelsMap>(
  characterModel: CharacterModel,
  type: T,
  effectModels: EffectModel[],
) {
  const unionModel = new effectModelsMap[type](
    characterModel,
    effectModelsMap[type].emptyRef,
    createKey(type, 'union'),
  )
  return effectModels
    .filter((effectModel) => effectModel.type === type)
    .reduce((a, b) => {
      a.assignModel(b)
      return a
    }, unionModel)
}
