import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'

export type DefenceEffect = DeepReadonly<{
  type: 'defence'
  damages: { [k in DamageType]?: 'resistance' | 'immunity' | 'vulnerability' }
}>
