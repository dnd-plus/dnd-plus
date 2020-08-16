export type BaseDiceValue = 4 | 6 | 8 | 10 | 12

export type DiceValue = BaseDiceValue | 20 | 100

export interface Dice {
  count: number
  value: DiceValue
}
