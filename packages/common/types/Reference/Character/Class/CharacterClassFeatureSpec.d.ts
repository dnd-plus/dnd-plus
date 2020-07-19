declare type CharacterClassFeatureSpec = Readonly<
  | {
      level: CharacterLevel
      feature: CharacterClassFeature
      description: string
    }
  | {
      featureByLevel: ReadonlyArray<{
        level: CharacterLevel
        feature: CharacterClassFeature
      }>
      description: string
    }
>
