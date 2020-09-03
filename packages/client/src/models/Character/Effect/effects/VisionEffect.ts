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
  get distance() {
    return this.ref.distance
  }

  assign(effect: R) {
    this.ref.distance = Math.max(this.ref.distance, effect.distance)
  }
}

export class BlindsightVisionEffectModel extends VisionEffectModel<
  BlindsightVisionEffect
> {
  get emptyRef() {
    return {
      type: 'blindsightVision',
      distance: 0,
    } as const
  }
}

export class DarkVisionEffectModel extends VisionEffectModel<DarkVisionEffect> {
  get emptyRef() {
    return {
      type: 'darkVision',
      distance: 0,
    } as const
  }
}

export class TremorsenseVisionEffectModel extends VisionEffectModel<
  TremorsenseVisionEffect
> {
  get emptyRef() {
    return {
      type: 'tremorsenseVision',
      distance: 0,
    } as const
  }
}

export class TruesightVisionEffectModel extends VisionEffectModel<
  TruesightVisionEffect
> {
  get emptyRef() {
    return {
      type: 'truesightVision',
      distance: 0,
    } as const
  }
}
