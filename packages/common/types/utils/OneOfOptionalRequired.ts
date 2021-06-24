import { OptionalKeys, RequiredKeys } from 'ts-essentials'

export type OneOfOptionalRequired<T extends {}> = OptionalKeys<T> extends never
  ? T
  : { [KR in RequiredKeys<T>]: T[KR] } &
      {
        [K in OptionalKeys<T>]: Omit<T, K> & { [KR in K]-?: T[K] }
      }[OptionalKeys<T>]

export type OnlyOneOfOptional<T extends {}> = OptionalKeys<T> extends never
  ? T
  : { [KR in RequiredKeys<T>]: T[KR] } &
      {
        [K in OptionalKeys<T>]: { [KR in K]-?: T[K] }
      }[OptionalKeys<T>]

// prettier-ignore
export type ObjectWithOptionalGroups<
  T,
  T1 = {}, T2 = {}, T3 = {}, T4 = {}, T5 = {},
  T6 = {}, T7 = {}, T8 = {}, T9 = {}, T10 = {},
  T11 = {}, T12 = {}, T13 = {}, T14 = {}, T15 = {},
  T16 = {}, T17 = {}, T18 = {}, T19 = {}, T20 = {},
> = T &
  OptionalGroups<
    T1, T2, T3, T4, T5, T6, T7, T8, T9, T10,
    T11, T12, T13, T14, T15, T16, T17, T18, T19, T20
  >

type R<T> = { [K in keyof T]?: undefined }

// prettier-ignore
export type OptionalGroups<
  T1 = {}, T2 = {}, T3 = {}, T4 = {}, T5 = {},
  T6 = {}, T7 = {}, T8 = {}, T9 = {}, T10 = {},
  T11 = {}, T12 = {}, T13 = {}, T14 = {}, T15 = {},
  T16 = {}, T17 = {}, T18 = {}, T19 = {}, T20 = {},
> =
  | ({} extends  T1 ? never : T1 & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T2 ? never : R<T1> & T2 & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T3 ? never : R<T1> & R<T2> & T3 & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T4 ? never : R<T1> & R<T2> & R<T3> & T4 & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T5 ? never : R<T1> & R<T2> & R<T3> & R<T4> & T5 & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T6 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & T6 & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T7 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & T7 & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T8 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & T8 & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T9 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & T9 & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T10 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & T10 & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T11 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & T11 & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T12 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & T12 & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T13 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & T13 & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T14 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & T14 & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T15 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & T15 & R<T16> & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T16 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & T16 & R<T17> & R<T18> & R<T19> & R<T20>)
  | ({} extends T17 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & T17 & R<T18> & R<T19> & R<T20>)
  | ({} extends T18 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & T18 & R<T19> & R<T20>)
  | ({} extends T19 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & T19 & R<T20>)
  | ({} extends T20 ? never : R<T1> & R<T2> & R<T3> & R<T4> & R<T5> & R<T6> & R<T7> & R<T8> & R<T9> & R<T10> & R<T11> & R<T12> & R<T13> & R<T14> & R<T15> & R<T16> & R<T17> & R<T18> & R<T19> & T20)
