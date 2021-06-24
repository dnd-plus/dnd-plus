import { Memoize } from 'models/utils/Memoize'
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
  R extends VisionEffect,
> extends BaseEffectModel<R> {
  @Memoize()
  get distance() {
    return this.ref.distance
  }

  assign(effect: R) {
    this.ref.distance = Math.max(this.ref.distance, effect.distance)
  }
}

export class BlindsightVisionEffectModel extends VisionEffectModel<BlindsightVisionEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'blindsightVision',
      distance: 0,
    } as const
  }
}

export class DarkVisionEffectModel extends VisionEffectModel<DarkVisionEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'darkVision',
      distance: 0,
    } as const
  }
}

export class TremorsenseVisionEffectModel extends VisionEffectModel<TremorsenseVisionEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'tremorsenseVision',
      distance: 0,
    } as const
  }
}

export class TruesightVisionEffectModel extends VisionEffectModel<TruesightVisionEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'truesightVision',
      distance: 0,
    } as const
  }
}
