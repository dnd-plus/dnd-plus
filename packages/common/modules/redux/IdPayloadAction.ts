import { PayloadAction } from '@reduxjs/toolkit'

export type IdPayloadAction<
  P = {},
  T extends string = string,
  M = never,
  E = never
> = PayloadAction<
  P & {
    _id: string
  },
  T,
  M,
  E
>
