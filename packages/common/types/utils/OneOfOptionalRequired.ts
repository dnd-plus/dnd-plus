import { OptionalKeys, RequiredKeys } from 'ts-essentials'

export type OneOfOptionalRequired<T extends {}> = OptionalKeys<T> extends never
  ? T
  : {
      [K in OptionalKeys<T>]: { [KR in RequiredKeys<T>]: T[KR] } &
        Omit<T, K> &
        { [KR in K]-?: T[K] }
    }[OptionalKeys<T>]
