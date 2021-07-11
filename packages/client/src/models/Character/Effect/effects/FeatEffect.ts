import { DeepReadonly } from 'ts-essentials'
import {
  BaseEffectModel,
  ChildEffectsData,
} from 'models/Character/Effect/BaseEffect'
import { uniqBy } from 'lodash-es'
import { effectFactory, EffectModel } from 'models/Character/Effect/Effect'
import { createKey } from 'models/utils/createKey'
import { checkFeatConditions } from 'models/Character/Feat/Feat'
import { feats } from 'models/Character/Feat/feats'
import { getFeatureChoiceEffects } from '../../FeatureChoice/FeatureChoice'
import { computed } from 'mobx'

export type FeatEffect = DeepReadonly<{
  type: 'feat'
  feats: { id: number; choices?: Record<string, unknown> }[]
}>

export class FeatEffectModel extends BaseEffectModel<FeatEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'feat',
      feats: [],
    } as const
  }

  getChildEffects({
    currentEffectMap,
    effectMap,
  }: ChildEffectsData): EffectModel[] {
    return this.feats.flatMap(({ id, choices }) => {
      const feat = feats.find((feat) => feat.id === id)

      if (
        !feat ||
        !checkFeatConditions(feat, {
          abilityEffect: currentEffectMap.ability,
          equipmentPossessionEffect: currentEffectMap.equipmentPossession,
          spellCastingEffect: effectMap.spellCasting,
          raceRef: this.characterModel.race.ref,
        })
      ) {
        return []
      }

      const featEffects =
        feat.effects?.flatMap(
          (effect, index) =>
            effectFactory(
              this.characterModel,
              effect,
              createKey(this.key, feat.id, index),
            ) || [],
        ) || []

      const choiceEffects =
        feat.choices?.flatMap((choice, index) =>
          getFeatureChoiceEffects(
            this.characterModel,
            choices?.[index],
            choice,
            createKey(this.key, 'choice', feat.id, index),
          ),
        ) || []

      return [...featEffects, ...choiceEffects].map((model) =>
        model.withFrom({ feat: feat.name }),
      )
    })
  }

  @computed
  get feats() {
    return this.ref.feats
  }

  @computed
  get featIds() {
    return this.ref.feats.map(({ id }) => id)
  }

  unionRef(effect: FeatEffect) {
    return {
      feats: uniqBy([...this.ref.feats, ...effect.feats], 'id'),
    }
  }
}
