export const ARMOR_TYPES = ['light', 'medium', 'heavy', 'shield'] as const

export type ArmorType = typeof ARMOR_TYPES[number]

export const ArmorTypeDict: Record<ArmorType, string> = {
  light: 'Легкая броня',
  medium: 'Средняя броня',
  heavy: 'Тяжелая броня',
  shield: 'Щит',
}
