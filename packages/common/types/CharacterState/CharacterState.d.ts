declare interface CharacterState {
  _id: string
  name: string
  userId: string
  createdAt: number
  updatedAt: number
  hp?: {
    current: number
    temporary?: number
    /** user param, added to max hp */
    maxModifier?: number
    /** user param, replace max hp */
    maxOverride?: number
  }
  baseAbilityScores?: BaseAbilityScoresState
  race?: string
  classes?: Array<{
    type: CharacterClassName
    level: CharacterLevel
    choices: {
      archetype: CharacterClassArchetype['type']
      features: ClassFeatureChoice[]
    }
  }>
}
