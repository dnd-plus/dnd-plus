declare interface CharacterState {
  hp: {
    current: number
    temporary?: number
    /** user param, added to max hp */
    maxModifier?: number
    /** user param, replace max hp */
    maxOverride?: number
  }
  baseAbilityScores: BaseAbilityScoresState
  classes: Array<{
    type: CharacterClassName
    level: CharacterLevel
    choices: {
      archetype: CharacterClassArchetype['type']
      features: ClassFeatureChoice[]
    }
  }>
}
