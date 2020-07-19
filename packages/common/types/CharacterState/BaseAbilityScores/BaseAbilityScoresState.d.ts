declare interface BaseAbilityScoresState extends AbilitiesMap {
  /**
   * generation method
   * 'standardArray' - 15 14 13 12 10 8 values
   * 'pointBy' - 27 points, value-cost: 15-9 14-7 13-5 12-4 11-3 10-2 9-1 8-0
   * 'manual' - user defined custom values
   */
  type: 'standardArray' | 'pointBy' | 'manual'
}
