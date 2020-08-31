export const ABILITY_TYPES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const

export const AbilityTypeDict: Record<AbilityName, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма',
}

export type AbilityName = typeof ABILITY_TYPES[number]

export type AbilitiesMap = Record<AbilityName, number>
