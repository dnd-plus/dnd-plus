import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

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

abstract class VisionEffectModel<
  R extends VisionEffect
> extends BaseEffectModel<R> {
  assign(effect: R) {
    this.ref.distance = Math.max(this.ref.distance, effect.distance)
  }
}

export class BlindsightVisionEffectModel extends VisionEffectModel<
  BlindsightVisionEffect
> {}

export class DarkVisionEffectModel extends VisionEffectModel<
  DarkVisionEffect
> {}

export class TremorsenseVisionEffectModel extends VisionEffectModel<
  TremorsenseVisionEffect
> {}

export class TruesightVisionEffectModel extends VisionEffectModel<
  TruesightVisionEffect
> {}
