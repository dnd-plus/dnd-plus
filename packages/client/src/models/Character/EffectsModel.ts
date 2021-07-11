import { CharacterModel } from 'models/Character/CharacterModel'
import {
  EFFECT_TYPES,
  EffectModel,
  effectModelsMap,
  EffectModelMap,
  EffectType,
  EffectModelTypeMap,
} from 'models/Character/Effect/Effect'
import {
  compareEffectArrays,
  createEffectMap,
  unionEffectModels,
} from 'models/utils/effect'
import { computed, makeObservable } from 'mobx'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { EffectFrom } from 'models/Character/Effect/BaseEffect'
import { mapValues } from 'common/utils/typesafe'

type KeyFromAll<KeyAll extends `${EffectType}All`> =
  KeyAll extends `${infer Key}All` ? Key : never

type EffectTypeAllMap = {
  [K in `${EffectType}All`]: InstanceType<EffectModelMap[KeyFromAll<K>]>[]
}

const EffectModelWithTypes = class {} as new () => EffectModelTypeMap &
  EffectTypeAllMap

function unionEffectMapModel(
  effectMap: EffectModelTypeMap,
  effect: EffectModel,
) {
  effectMap[effect.type] = effectMap[effect.type].createUnionModel(
    effect,
  ) as any
}

export function withChildEffects(
  characterModel: CharacterModel,
  effects: EffectModel[],
): EffectModel[] {
  const nextEffects = effects.slice()
  const effectMap = createEffectMap(characterModel, nextEffects, false)
  const currentEffectMap = createEffectMap(characterModel, [], false)

  for (let i = 0; i < nextEffects.length; i++) {
    const effect = nextEffects[i]
    unionEffectMapModel(currentEffectMap, effect)

    const childEffects = effect.getChildEffects({
      effectMap,
      currentEffectMap,
    })

    if (childEffects.length) {
      nextEffects.splice(i + 1, 0, ...childEffects)
    }

    childEffects.forEach((childEffect) => {
      childEffect.withFrom(effect.from as OneOfOptionalRequired<EffectFrom>)
      unionEffectMapModel(effectMap, effect)
      unionEffectMapModel(currentEffectMap, effect)
    })
  }

  return nextEffects
}

export class EffectsModel extends EffectModelWithTypes {
  constructor(private characterModel: CharacterModel) {
    super()
    EFFECT_TYPES.forEach((type) => {
      Object.defineProperty(this, `${type}All`, {
        get() {
          return this.all.filter((effect: EffectModel) => effect.type === type)
        },
        configurable: true,
      })
      computed({
        equals: compareEffectArrays,
      })(this, `${type}All`)

      Object.defineProperty(this, type, {
        get() {
          return unionEffectModels(
            this.characterModel,
            type,
            this[`${type}All`],
          )
        },
        configurable: true,
      })
      computed(this, type)
    })
    makeObservable(this)
  }

  @computed
  private get raw(): EffectModel[] {
    return this.characterModel.class.effects
  }

  @computed
  get all() {
    return withChildEffects(this.characterModel, this.raw)
  }

  @computed
  get normalized() {
    return mapValues(effectModelsMap, (key) => this[key])
  }
}
