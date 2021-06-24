export type CharacterLevel =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20

export const MAX_CHARACTER_LEVEL = 20

export type CharacterLevelArray<T> = [
  T, // 1
  T, // 2
  T, // 3
  T, // 4
  T, // 5
  T, // 6
  T, // 7
  T, // 8
  T, // 9
  T, // 10
  T, // 11
  T, // 12
  T, // 13
  T, // 14
  T, // 15
  T, // 16
  T, // 17
  T, // 18
  T, // 19
  T, // 20
]

export type MonsterLevel =
  | CharacterLevel
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
