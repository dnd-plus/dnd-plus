// TODO: add start equipment
declare type CharacterClass = Readonly<{
  type: CharacterClassName
  name: string
  description: string
  hpDice: BaseDiceValue
  proficiencies: CharacterClassProficiencies
  archetypes: ReadonlyArray<CharacterClassArchetype>
  featuresSpec: ReadonlyArray<CharacterClassFeatureSpec>
}>
