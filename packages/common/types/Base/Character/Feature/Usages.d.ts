declare type Usages =
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
