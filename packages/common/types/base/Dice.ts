export type BaseDiceValue = 4 | 6 | 8 | 10 | 12

export type DiceValue = BaseDiceValue | 20 | 100

export type DamageDice = {
  count: number
  value: BaseDiceValue
}
export type Dice = {
  count: number
  value: DiceValue
}
