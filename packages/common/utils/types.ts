export type RemoveAny<T> = T extends any
  ? 1 | 2 extends (T extends 1 ? 1 : 2)
    ? never
    : T
  : never
