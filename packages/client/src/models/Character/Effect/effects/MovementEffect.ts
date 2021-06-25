import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

type MovementEffectCreator<T extends string> = DeepReadonly<
  OneOfOptionalRequired<{
    type: T
    absolute?: number
    relative?: number
  }>
>

export type WalkMovementEffect = MovementEffectCreator<'walkMovement'>
export type FlyMovementEffect = MovementEffectCreator<'flyMovement'>
export type SwimMovementEffect = MovementEffectCreator<'swimMovement'>

export type MovementEffect =
  | WalkMovementEffect
  | FlyMovementEffect
  | SwimMovementEffect

abstract class MovementEffectModel<
  R extends MovementEffect,
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

export class WalkMovementEffectModel extends MovementEffectModel<WalkMovementEffect> {
  get emptyRef() {
    return {
      type: 'walkMovement',
      absolute: 0,
      relative: 0,
    } as const
  }
}

export class FlyMovementEffectModel extends MovementEffectModel<FlyMovementEffect> {
  get emptyRef() {
    return {
      type: 'flyMovement',
      absolute: 0,
      relative: 0,
    } as const
  }
}

export class SwimMovementEffectModel extends MovementEffectModel<SwimMovementEffect> {
  get emptyRef() {
    return {
      type: 'swimMovement',
      absolute: 0,
      relative: 0,
    } as const
  }
}
