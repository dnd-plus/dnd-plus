declare type BaseDiceValue = 4 | 6 | 8 | 10 | 12

declare type DiceValue = BaseDiceValue | 20 | 100

declare interface Dice {
  count: number
  value: DiceValue
}
