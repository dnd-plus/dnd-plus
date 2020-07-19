declare type MagicCharacterClassFeature = Readonly<{
  type: string
  featureType: 'magic'
  spellcastingType: SpellcastingType
  spellsFromClass: 'current' | CharacterClassName
  baseAbility: AbilityName
}>
