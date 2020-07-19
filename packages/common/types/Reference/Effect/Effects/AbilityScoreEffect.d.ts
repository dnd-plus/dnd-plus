/** change character ability score */
declare type AbilityScoreEffect = Readonly<{
  type: 'abilityScoreEffect'
  /**
   * type of ability modification
   * 'add' - add to current value
   * 'set' - override current value
   */
  changeType: 'add' | 'set'
  ability: AbilityName
  value: number
}>

declare interface EffectMap {
  abilityScoreEffect: AbilityScoreEffect
}
