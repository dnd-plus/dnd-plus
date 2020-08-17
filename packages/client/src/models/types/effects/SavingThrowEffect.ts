import { AbilityName } from 'common/types/base/character/Ability'
import { DamageType } from 'common/types/base/Damage'
import { DeepReadonly } from 'ts-essentials'

export type SavingThrowEffect = DeepReadonly<{
  type: 'savingThrow'
  abilities?: { [k in AbilityName]?: 'advantage' | 'disadvantage' }
  damages?: { [k in DamageType]?: 'advantage' | 'disadvantage' }
}>
