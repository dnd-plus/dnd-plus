declare interface AbilitiesMap {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

declare type AbilityName = keyof AbilitiesMap
