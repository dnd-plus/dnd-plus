import { OptionalKeys, RequiredKeys } from 'ts-essentials'

export type OneOfOptionalRequired<T extends {}> = {
  [K in OptionalKeys<T>]: { [KR in RequiredKeys<T>]: T[KR] } &
    Omit<T, K> &
    Record<K, T[K]>
}[OptionalKeys<T>]
