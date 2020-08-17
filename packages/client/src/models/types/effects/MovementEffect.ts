import { DeepReadonly } from 'ts-essentials'

export type WalkMovementEffect = DeepReadonly<{
  type: 'walkMovement'
  speed: number
}>
export type FlyMovementEffect = DeepReadonly<{
  type: 'flyMovement'
  speed: number
}>
export type SwimMovementEffect = DeepReadonly<{
  type: 'swimMovement'
  speed: number
}>
export type MovementEffect =
  | WalkMovementEffect
  | FlyMovementEffect
  | SwimMovementEffect
