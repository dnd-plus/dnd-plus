export interface Target {
  type: 'self' | 'notSelf' | 'ally' | 'enemy' | 'any'
  count?: number
}
