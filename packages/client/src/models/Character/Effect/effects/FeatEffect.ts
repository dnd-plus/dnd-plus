import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { uniq } from 'lodash-es'
import { effectFactory, EffectModel } from 'models/Character/Effect/Effect'
import { createKey } from 'models/utils/createKey'
import { feats } from 'models/Character/Feat/feats'
import { checkFeatConditions } from 'models/Character/Feat/Feat'
import { createUseSelector } from 'models/utils/createUseSelector'

export type FeatEffect = DeepReadonly<{
  type: 'feat'
  featIds: number[]
}>

export class FeatEffectModel extends BaseEffectModel<FeatEffect> {
  get emptyRef() {
    return {
      type: 'feat',
      featIds: [],
    } as const
  }

  fromState = createUseSelector(
    this.characterModel.effects.type.ability,
    this.characterModel.effects.type.equipmentPossession,
    this.characterModel.race.ref,
    (abilityEffect, equipmentPossessionEffect, raceRef): EffectModel[] => {
      return this.featIds.flatMap((id) => {
        const feat = feats.find((feat) => feat.id === id)

        return feat && feat.effects
          ? feat.effects.flatMap((effect, index) => {
              if (
                checkFeatConditions(feat, {
                  abilityEffect,
                  equipmentPossessionEffect,
                  raceRef,
                })
              ) {
                return (
                  effectFactory(
                    this.characterModel,
                    effect,
                    createKey(this.key, id, index),
                  ) || []
                )
              } else {
                return []
              }
            })
          : []
      })
    },
  )

  get featIds() {
    return this.ref.featIds
  }

  assign(effect: FeatEffect) {
    this.ref.featIds = uniq([...this.ref.featIds, ...effect.featIds])
  }
}
