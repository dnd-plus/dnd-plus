import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type DefenceEffect = DeepReadonly<{
  type: 'defence'
  damages: {
    [k in DamageType]?: 'resistance' | 'immunity' | 'vulnerability' | null
  }
}>

export class DefenceEffectModel extends BaseEffectModel<DefenceEffect> {
  assign(effect: DefenceEffect) {
    type Damages = DefenceEffect['damages']
    const damages = { ...this.ref.damages }

    ;(Object.entries(effect.damages) as Array<
      [keyof Damages, Damages[keyof Damages]]
    >).forEach(([key, value]) => {
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
