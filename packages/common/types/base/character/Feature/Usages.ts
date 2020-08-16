import { AbilityName } from 'common/types/base/character/Ability'

export type Usages =
  /** fix usages */
  | {
      value: number
    }
  /** usages with ability score calculation */
  | {
      value?: number
      abilityScore: AbilityName
      min?: number
    }
