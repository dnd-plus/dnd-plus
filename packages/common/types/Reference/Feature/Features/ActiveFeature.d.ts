declare type ActiveFeature = Readonly<{
  type: string
  featureType: 'active'
  castDuration: CastFeatureDuration
  cooldown: Cooldown
  usages: Usages
  description?: string
  effects: ReadonlyArray<Effect>
}>

declare interface FeatureMap {
  activeFeature: ActiveFeature
}
