type CharacterClassFeatureSpecFeature = Readonly<{
  level: CharacterLevel
  feature: CharacterClassFeature
}>

declare type CharacterClassFeatureSpec = Readonly<
  {
    name: string
    description: string
  } & (
    | CharacterClassFeatureSpecFeature
    | {
        featuresByLevel: ReadonlyArray<CharacterClassFeatureSpecFeature>
      }
  )
>
