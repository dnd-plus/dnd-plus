export type Duration = {
  type: 'round' | 'minute' | 'hour' | 'day'
  value: number
}

export type SpellDuration = Duration | { type: 'special'; text: string }

export type CastDuration =
  | Duration
  | {
      type: 'action' | 'bonusAction'
    }
  | {
      type: 'reaction'
      to: string
    }

export type CastFeatureDuration =
  | CastDuration
  | {
      type: 'instant'
    }
