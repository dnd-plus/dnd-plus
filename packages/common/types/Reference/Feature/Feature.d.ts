declare type BaseFeature = {
  type: string
  featureType: string
}

/** map for declaring features in separate files */
declare interface FeatureMap {}

/** generic interface describing character feature */
declare type Feature = Readonly<FeatureMap[keyof FeatureMap]>

// TYPE GUARD
type FeatureCheck = CheckType<BaseFeature, Feature>
