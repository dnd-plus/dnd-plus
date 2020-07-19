interface Duration {
  type: 'round' | 'minute' | 'hour' | 'day'
  value: number
}

declare type CastDuration =
  | Duration
  | {
      type: 'action' | 'bonusAction' | 'reaction'
    }

declare type CastFeatureDuration =
  | CastDuration
  | {
      type: 'instant'
    }
