declare interface CharacterClassFeatureMap {}

declare type CharacterClassFeature =
  | Readonly<CharacterClassFeatureMap[keyof CharacterClassFeatureMap]>
  | Feature

// TYPE GUARD
type CharacterClassFeatureCheck = CheckType<BaseFeature, CharacterClassFeature>
