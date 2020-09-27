import { BaseEffectModel, EffectFrom } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly, Tuple, Writable } from 'ts-essentials'
import { AbilityEffectModel } from 'models/Character/Effect/effects/AbilityEffect'
import {
  FlyMovementEffectModel,
  SwimMovementEffectModel,
  WalkMovementEffectModel,
} from 'models/Character/Effect/effects/MovementEffect'
import { EquipmentPossessionEffectModel } from 'models/Character/Effect/effects/EquipmentPossessionEffect'
import { DefenceEffectModel } from 'models/Character/Effect/effects/DefenceEffect'
import { SavingThrowAdvantageEffectModel } from 'models/Character/Effect/effects/SavingThrowAdvantageEffect'
import { SkillPossessionEffectModel } from 'models/Character/Effect/effects/SkillPossessionEffect'
import {
  BlindsightVisionEffectModel,
  DarkVisionEffectModel,
  TremorsenseVisionEffectModel,
  TruesightVisionEffectModel,
} from 'models/Character/Effect/effects/VisionEffect'
import { CharacterModel } from 'models/Character/CharacterModel'
import { LanguageEffectModel } from 'models/Character/Effect/effects/LanguageEffect'
import { SavingThrowPossessionEffectModel } from 'models/Character/Effect/effects/SavingThrowPossessionEffect'
import { FeatEffectModel } from 'models/Character/Effect/effects/FeatEffect'

export const effectModelsMap = {
  ability: AbilityEffectModel,
  defence: DefenceEffectModel,
  equipmentPossession: EquipmentPossessionEffectModel,
  walkMovement: WalkMovementEffectModel,
  flyMovement: FlyMovementEffectModel,
  swimMovement: SwimMovementEffectModel,
  savingThrowAdvantage: SavingThrowAdvantageEffectModel,
  savingThrowPossession: SavingThrowPossessionEffectModel,
  skillPossession: SkillPossessionEffectModel,
  blindsightVision: BlindsightVisionEffectModel,
  darkVision: DarkVisionEffectModel,
  tremorsenseVision: TremorsenseVisionEffectModel,
  truesightVision: TruesightVisionEffectModel,
  language: LanguageEffectModel,
  feat: FeatEffectModel,
} as const

export const EFFECT_TYPES = Object.keys(effectModelsMap) as Tuple<
  keyof EffectModelsMap
>

export type EffectModelsMap = Writable<typeof effectModelsMap>
export type EffectModel = BaseEffectModel<any>
export type Effect = {
  [K in keyof EffectModelsMap]: InstanceType<
    EffectModelsMap[K]
  > extends BaseEffectModel<infer R>
    ? R
    : null
}[keyof EffectModelsMap]

export type FinalEffect = Effect &
  DeepReadonly<{
    from: {
      feature?: string
      race?: string
    }
  }>

// eslint-disable-next-line unused-imports/no-unused-vars-ts
const effectModelsMapGuard: Record<Effect['type'], Function> = effectModelsMap

export function effectFactory(
  characterModel: CharacterModel,
  effect: Effect,
  key: string,
  from?: EffectFrom,
) {
  if (effectModelsMap[effect.type]) {
    // todo: understand and fix type error
    return new effectModelsMap[effect.type](
      characterModel,
      effect as any,
      key,
      from,
    )
  }

  return null
}
