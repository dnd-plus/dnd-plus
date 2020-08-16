export const STRENGTH_SKILL_TYPES = ['athletics'] as const

export const DEXTERITY_SKILL_TYPES = [
  'acrobatics',
  'sleightOfHand',
  'stealth',
] as const

// export const CONSTITUTION_SKILL_TYPES = [] as const

export const INTELLIGENCE_SKILL_TYPES = [
  'arcana',
  'history',
  'investigation',
  'nature',
  'religion',
] as const

export const WISDOM_SKILL_TYPES = [
  'animalHandling',
  'insight',
  'medicine',
  'perception',
  'survival',
] as const

export const CHARISMA_SKILL_TYPES = [
  'deception',
  'intimidation',
  'performance',
  'persuasion',
] as const

export const SKILL_TYPES = [
  ...STRENGTH_SKILL_TYPES,
  ...DEXTERITY_SKILL_TYPES,
  ...INTELLIGENCE_SKILL_TYPES,
  ...WISDOM_SKILL_TYPES,
  ...CHARISMA_SKILL_TYPES,
] as const

export type StrengthSkillType = typeof STRENGTH_SKILL_TYPES[number]
export type DexteritySkillType = typeof DEXTERITY_SKILL_TYPES[number]
export type IntelligenceSkillType = typeof INTELLIGENCE_SKILL_TYPES[number]
export type WisdomSkillType = typeof WISDOM_SKILL_TYPES[number]
export type CharismaSkillType = typeof CHARISMA_SKILL_TYPES[number]

export type SkillType = typeof SKILL_TYPES[number]
