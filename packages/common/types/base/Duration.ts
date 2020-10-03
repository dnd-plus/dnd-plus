export interface Duration {
  type: 'round' | 'minute' | 'hour' | 'day'
  value: number
}

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
