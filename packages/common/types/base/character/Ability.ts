export interface AbilitiesMap {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export type AbilityName = keyof AbilitiesMap
