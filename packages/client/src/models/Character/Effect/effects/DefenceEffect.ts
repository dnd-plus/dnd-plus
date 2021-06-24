import { Memoize } from 'models/utils/Memoize'
import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { entries } from 'common/utils/typesafe'

export type DefenceEffect = DeepReadonly<{
  type: 'defence'
  damages: {
    [k in DamageType]?: 'resistance' | 'immunity' | 'vulnerability' | null
  }
}>

export class DefenceEffectModel extends BaseEffectModel<DefenceEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'defence',
      damages: {},
    } as const
  }

  @Memoize()
  get damages() {
    return this.ref.damages
  }

  assign(effect: DefenceEffect) {
    const damages = { ...this.ref.damages }

    entries(effect.damages).forEach(([key, value]) => {
      if (value === undefined || damages[key] === 'immunity') {
        return
      } else if (damages[key] === undefined || value === 'immunity') {
        damages[key] = value
      } else if (
        damages[key] === null ||
        value === null ||
        (damages[key] === 'resistance' && value === 'vulnerability') ||
        (damages[key] === 'vulnerability' && value === 'resistance')
      ) {
        damages[key] = null
      }
    })

    this.ref.damages = damages
  }
}
