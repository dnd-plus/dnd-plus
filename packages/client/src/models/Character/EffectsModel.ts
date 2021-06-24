import { CharacterModel } from 'models/Character/CharacterModel'
import {
  EFFECT_TYPES,
  EffectModel,
  effectModelsMap,
  EffectModelsMap,
  EffectType,
} from 'models/Character/Effect/Effect'
import { unionEffectModels } from 'models/utils/unionEffectModels'
import { computed, makeObservable } from 'mobx'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { EffectFrom } from 'models/Character/Effect/BaseEffect'
import { mapValues } from 'common/utils/typesafe'

export type EffectTypeMap = {
  [K in EffectType]: InstanceType<EffectModelsMap[K]>
}

type KeyFromAll<KeyAll extends `${EffectType}All`> =
  KeyAll extends `${infer Key}All` ? Key : never

type EffectTypeAllMap = {
  [K in `${EffectType}All`]: InstanceType<EffectModelsMap[KeyFromAll<K>]>[]
}

const EffectModelWithTypes = class {} as new () => EffectTypeMap &
  EffectTypeAllMap

function compareEffectArrays(a: EffectModel[], b: EffectModel[]) {
  return (
    a === b ||
    (a.length === b.length && a.every(({ ref }, index) => ref === b[index].ref))
  )
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
    return [
      this.characterModel.baseAbilitiesEffect,
      this.characterModel.race.effects,
      this.characterModel.class.effects,
    ].flatMap((effects) => effects)
  }

  @computed
  get all() {
    const effects = [...this.raw]
    const createEffectMap = (effects: EffectModel[] = []) =>
      EFFECT_TYPES.reduce(
        (obj, type) => ({
          ...obj,
          [type]: unionEffectModels(this.characterModel, type, effects),
        }),
        {} as EffectTypeMap,
      )
    const effectMap = createEffectMap(effects)
    const currentEffectMap = createEffectMap()

    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i]
      currentEffectMap[effects[i].type].assignModel(effect)

      if (effect.choiceModel) {
        effect.choiceModel.currentEffects = createEffectMap(effects.slice(0, i))
      }

      const childEffects = effect.getChildEffects({
        effectMap,
        currentEffectMap,
      })

      if (childEffects.length) {
        effects.splice(i + 1, 0, ...childEffects)
      }

      childEffects.forEach((childEffect) => {
        childEffect.withFrom(effect.from as OneOfOptionalRequired<EffectFrom>)
        effectMap[childEffect.type].assignModel(childEffect)
        currentEffectMap[childEffect.type].assignModel(childEffect)
      })
    }

    return effects
  }

  @computed
  get normalized() {
    return mapValues(effectModelsMap, (key) => this[key])
  }
}
