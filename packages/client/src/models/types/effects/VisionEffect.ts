import { DeepReadonly } from 'ts-essentials'

export type BlindsightVisionEffect = DeepReadonly<{
  type: 'blindsightVision'
  distance: number
}>
export type DarkVisionEffect = DeepReadonly<{
  type: 'darkVision'
  distance: number
}>
export type TremorsenseVisionEffect = DeepReadonly<{
  type: 'tremorsenseVision'
  distance: number
}>
export type TruesightVisionEffect = DeepReadonly<{
  type: 'truesightVision'
  distance: number
}>

export type VisionEffect =
  | BlindsightVisionEffect
  | DarkVisionEffect
  | TremorsenseVisionEffect
  | TruesightVisionEffect
