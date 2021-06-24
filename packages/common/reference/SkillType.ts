import { AbilityType } from 'common/reference/AbilityType'
import { entries } from 'common/utils/typesafe'

export const STRENGTH_SKILL_TYPES = ['athletics'] as const

export const DEXTERITY_SKILL_TYPES = [
  'acrobatics',
  'sleightOfHand',
  'stealth',
] as const

export const CONSTITUTION_SKILL_TYPES: readonly [] = [] as const

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
  ...CONSTITUTION_SKILL_TYPES,
  ...INTELLIGENCE_SKILL_TYPES,
  ...WISDOM_SKILL_TYPES,
  ...CHARISMA_SKILL_TYPES,
] as const

export const SkillTypeDict: Record<SkillType, string> = {
  athletics: 'Атлетика',

  acrobatics: 'Акробатика',
  sleightOfHand: 'Ловкость рук',
  stealth: 'Скрытность',

  arcana: 'Магия',
  history: 'История',
  investigation: 'Анализ',
  nature: 'Природа',
  religion: 'Религия',

  animalHandling: 'Уход за животными',
  insight: 'Проницательность',
  medicine: 'Медицина',
  perception: 'Внимательность',
  survival: 'Выживание',

  deception: 'Обман',
  intimidation: 'Запугивание',
  performance: 'Выступление',
  persuasion: 'Убеждение',
}

export type StrengthSkillType = typeof STRENGTH_SKILL_TYPES[number]
export type DexteritySkillType = typeof DEXTERITY_SKILL_TYPES[number]
export type ConstitutionSkillType = typeof CONSTITUTION_SKILL_TYPES[number]
export type IntelligenceSkillType = typeof INTELLIGENCE_SKILL_TYPES[number]
export type WisdomSkillType = typeof WISDOM_SKILL_TYPES[number]
export type CharismaSkillType = typeof CHARISMA_SKILL_TYPES[number]

export const ABILITY_SKILL_TYPE_MAP = {
  strength: STRENGTH_SKILL_TYPES,
  dexterity: DEXTERITY_SKILL_TYPES,
  constitution: CONSTITUTION_SKILL_TYPES,
  intelligence: INTELLIGENCE_SKILL_TYPES,
  wisdom: WISDOM_SKILL_TYPES,
  charisma: CHARISMA_SKILL_TYPES,
} as const

export type SkillType = typeof SKILL_TYPES[number]

export function getSkillAbility(skill: SkillType): AbilityType | undefined {
  for (const [ability, skills] of entries(ABILITY_SKILL_TYPE_MAP)) {
    if ((skills as ReadonlyArray<string>).includes(skill)) {
      return ability
    }
  }
}
