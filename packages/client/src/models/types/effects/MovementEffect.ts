export type WalkMovementEffect = {
  type: 'walkMovement'
  speed: number
}
export type FlyMovementEffect = {
  type: 'flyMovement'
  speed: number
}
export type SwimMovementEffect = {
  type: 'swimMovement'
  speed: number
}
export type MovementEffect =
  | WalkMovementEffect
  | FlyMovementEffect
  | SwimMovementEffect
