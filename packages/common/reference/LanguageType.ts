export const LANGUAGE_TYPES = [
  // standard
  'common',
  'dwarvish',
  'elvish',
  'giant',
  'gnomish',
  'goblin',
  'halfling',
  'orc',

  // exotic
  'abyssal',
  'celestial',
  'draconic',
  'deep',
  'infernal',
  'primordial',
  'sylvan',
  'undercommon',
] as const

export const LanguageTypeDict: Record<LanguageType, string> = {
  common: 'Общий',
  dwarvish: 'Дварфский',
  elvish: 'Эльфийский',
  giant: 'Великаний',
  gnomish: 'Гномий',
  goblin: 'Гоблинский',
  halfling: 'Полуросликов',
  orc: 'Орочий',
  abyssal: 'Бездны',
  celestial: 'Небесный',
  draconic: 'Драконий',
  deep: 'Глубинная Речь',
  infernal: 'Инфернальный',
  primordial: 'Первичный',
  sylvan: 'Сильван',
  undercommon: 'Подземный',
}

export type LanguageType = typeof LANGUAGE_TYPES[number]
