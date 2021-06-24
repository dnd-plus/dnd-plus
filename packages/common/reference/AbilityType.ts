export const ABILITY_TYPES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const

export const AbilityTypeDict: Record<AbilityType, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма',
}

export const AbilityTypeGenDict: Record<AbilityType, string> = {
  strength: 'Силы',
  dexterity: 'Ловкости',
  constitution: 'Телосложения',
  intelligence: 'Интеллекта',
  wisdom: 'Мудрости',
  charisma: 'Харизмы',
}

export type AbilityType = typeof ABILITY_TYPES[number]

export type AbilitiesMap = Record<AbilityType, number>
