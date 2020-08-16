// SIMPLE

import { extendType } from 'common/utils/extendType'

export const SIMPLE_WEAPON_GROUP_TYPE = 'simple'
export type SimpleWeaponGroupType = typeof SIMPLE_WEAPON_GROUP_TYPE

export const SIMPLE_MELEE_WEAPON_TYPES = [
  'club',
  'dagger',
  'greatclub',
  'handaxe',
  'javelin',
  'lightHammer',
  'mace',
  'quarterstaff',
  'sickle',
  'spear',
] as const
export type SimpleMeleeWeaponType = typeof SIMPLE_MELEE_WEAPON_TYPES[number]

export const SIMPLE_RANGED_WEAPON_TYPES = [
  'lightCrossbow',
  'dart',
  'shortbow',
  'sling',
] as const
export type SimpleRangedWeaponType = typeof SIMPLE_RANGED_WEAPON_TYPES[number]

export const SIMPLE_WEAPON_TYPES = [
  ...SIMPLE_MELEE_WEAPON_TYPES,
  ...SIMPLE_RANGED_WEAPON_TYPES,
] as const
export type SimpleWeaponType = typeof SIMPLE_WEAPON_TYPES[number]

// MARTIAL

export const MARTIAL_WEAPON_GROUP_TYPE = 'martial'
export type MartialWeaponGroupType = typeof MARTIAL_WEAPON_GROUP_TYPE

export const MARTIAL_MELEE_WEAPON_TYPES = [
  'battleaxe',
  'flail',
  'glaive',
  'greataxe',
  'greatsword',
  'halberd',
  'lance',
  'longsword',
  'maul',
  'morningstar',
  'pike',
  'rapier',
  'scimitar',
  'shortsword',
  'trident',
  'warPick',
  'warhammer',
  'whip',
] as const
export type MartialMeleeWeaponType = typeof MARTIAL_MELEE_WEAPON_TYPES[number]

export const MARTIAL_RANGED_WEAPON_TYPE = [
  'blowgun',
  'handCrossbow',
  'heavyCrossbow',
  'longbow',
  'net',
] as const
export type MartialRangedWeaponType = typeof MARTIAL_RANGED_WEAPON_TYPE[number]

export const MARTIAL_WEAPON_TYPES = [
  ...MARTIAL_MELEE_WEAPON_TYPES,
  ...MARTIAL_RANGED_WEAPON_TYPE,
] as const
export type MartialWeaponType = typeof MARTIAL_WEAPON_TYPES[number]

// BY DISTANCE

export const MELEE_WEAPON_TYPES = [
  ...SIMPLE_MELEE_WEAPON_TYPES,
  ...MARTIAL_MELEE_WEAPON_TYPES,
] as const
export type MeleeWeaponType = typeof MELEE_WEAPON_TYPES[number]

export const RANGE_WEAPON_TYPES = [
  ...SIMPLE_RANGED_WEAPON_TYPES,
  ...MARTIAL_RANGED_WEAPON_TYPE,
] as const
export type RangeWeaponType = typeof RANGE_WEAPON_TYPES[number]

export const WEAPON_TYPES = [
  ...SIMPLE_WEAPON_TYPES,
  ...MARTIAL_WEAPON_TYPES,
] as const
export type WeaponType = typeof WEAPON_TYPES[number]

export const WEAPON_TYPES_WITH_GROUPS = [
  ...WEAPON_TYPES,
  SIMPLE_WEAPON_GROUP_TYPE,
  MARTIAL_WEAPON_GROUP_TYPE,
] as const
export type WeaponTypeWithGroups = typeof WEAPON_TYPES_WITH_GROUPS[number]

export const WeaponTypeDict = extendType<
  Record<WeaponTypeWithGroups, string>
>()({
  simple: 'Простое оружие',

  club: 'Дубинка',
  dagger: 'Кинжал',
  greatclub: 'Палица',
  mace: 'Булава',
  spear: 'Копье',
  lightHammer: 'Легкий молот',
  javelin: 'Метательное копье',
  quarterstaff: 'Боевой посох',
  handaxe: 'Ручной топор',
  sickle: 'Серп',

  lightCrossbow: 'Арбалет, легкий',
  dart: 'Дротик',
  shortbow: 'Короткий лук',
  sling: 'Праща',

  martial: 'Воинское оружие',

  battleaxe: 'Боевой топор',
  flail: 'Цеп',
  glaive: 'Глефа',
  greataxe: 'Секира',
  greatsword: 'Двуручный меч',
  halberd: 'Алебарда',
  lance: 'Копье',
  longsword: 'Длинный меч',
  maul: 'Молот',
  morningstar: 'Моргенштерн',
  pike: 'Пика',
  rapier: 'Рапира',
  scimitar: 'Скимитар',
  shortsword: 'Короткий меч',
  trident: 'Трезубец',
  warPick: 'Пика',
  warhammer: 'Боевой молот',
  whip: 'Кнут',

  blowgun: 'Духовая трубка',
  handCrossbow: 'Арбалет, ручной',
  heavyCrossbow: 'Арбалет, тяжелый',
  longbow: 'Длинный лук',
  net: 'Сеть',
} as const)
