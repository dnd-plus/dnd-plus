import { AbilityName } from 'common/reference/AbilityType'

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
