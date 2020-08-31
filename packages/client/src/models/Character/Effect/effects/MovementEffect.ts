import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

type MovementEffectCreator<T extends string> = DeepReadonly<
  | {
      type: T
      absolute?: number
      relative: number
    }
  | {
      type: T
      absolute: number
      relative?: number
    }
>

export type WalkMovementEffect = MovementEffectCreator<'walkMovement'>
export type FlyMovementEffect = MovementEffectCreator<'flyMovement'>
export type SwimMovementEffect = MovementEffectCreator<'swimMovement'>

export type MovementEffect =
  | WalkMovementEffect
  | FlyMovementEffect
  | SwimMovementEffect

abstract class MovementEffectModel<
  R extends MovementEffect
> extends BaseEffectModel<R> {
  get absolute() {
    return this.ref.absolute ?? 0
  }
  get relative() {
    return this.ref.relative ?? 0
  }
  get speed() {
    return this.absolute + this.relative
  }

  assign(effect: MovementEffect) {
    this.ref.absolute = Math.max(this.absolute, effect.absolute || 0)
    this.ref.relative = this.relative + (effect.relative || 0)
  }
}

export class WalkMovementEffectModel extends MovementEffectModel<
  WalkMovementEffect
> {}

export class FlyMovementEffectModel extends MovementEffectModel<
  FlyMovementEffect
> {}

export class SwimMovementEffectModel extends MovementEffectModel<
  SwimMovementEffect
> {}
