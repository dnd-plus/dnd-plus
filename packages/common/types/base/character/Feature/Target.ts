export type Target =
  | {
      type: 'notSelf' | 'notSelfAlly' | 'ally' | 'enemy' | 'any'
      count?: number
      from?: 'range' | 'area'
    }
  | { type: 'self' }
