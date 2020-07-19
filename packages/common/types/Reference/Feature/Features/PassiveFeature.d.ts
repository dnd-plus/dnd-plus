declare type PassiveFeature = Readonly<{
  type: string
  featureType: 'passive'
  description?: string
  effects?: ReadonlyArray<Effect>
}>

declare interface FeatureMap {
  passiveFeature: PassiveFeature
}
