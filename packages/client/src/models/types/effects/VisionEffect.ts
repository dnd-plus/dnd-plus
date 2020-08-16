export type BlindsightVisionEffect = {
  type: 'blindsightVision'
  distance: number
}
export type DarkVisionEffect = {
  type: 'darkVision'
  distance: number
}
export type TremorsenseVisionEffect = {
  type: 'tremorsenseVision'
  distance: number
}
export type TruesightVisionEffect = {
  type: 'truesightVision'
  distance: number
}

export type VisionEffect =
  | BlindsightVisionEffect
  | DarkVisionEffect
  | TremorsenseVisionEffect
  | TruesightVisionEffect
