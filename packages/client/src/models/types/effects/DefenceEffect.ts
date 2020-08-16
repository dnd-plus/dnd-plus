import { DamageType } from 'common/types/base/Damage'

export type DefenceEffect = {
  type: 'defence'
  damages: { [k in DamageType]?: 'resistance' | 'immunity' | 'vulnerability' }
}
