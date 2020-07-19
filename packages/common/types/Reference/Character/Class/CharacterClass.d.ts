// TODO: add start equipment
declare type CharacterClass = Readonly<{
  type: CharacterClassName
  name: string
  description: string
  hpDice: BaseDiceValue

  proficiencies: CharacterClassProficiencies
  archetypes: ReadonlyArray<CharacterClassArchetype>
  spellcasting?: CharacterClassSpellcasting
  featuresSpec: ReadonlyArray<CharacterClassFeatureSpec>
}>
