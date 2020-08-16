interface Duration {
  type: 'round' | 'minute' | 'hour' | 'day'
  value: number
}

export type CastDuration =
  | Duration
  | {
      type: 'action' | 'bonusAction' | 'reaction'
    }

export type CastFeatureDuration =
  | CastDuration
  | {
      type: 'instant'
    }
