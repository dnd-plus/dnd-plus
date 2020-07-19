declare type CharacterClassFeatureSpec = Readonly<
  | {
      level: CharacterLevel
      feature: CharacterClassFeature
      description: string
    }
  | {
      featuresByLevel: ReadonlyArray<{
        level: CharacterLevel
        feature: CharacterClassFeature
      }>
      description: string
    }
>
