// SIMPLE

export const SIMPLE_WEAPON_GROUP_TYPE = 'martial'

export const SIMPLE_MELEE_WEAPON_TYPES = [
  'club',
  'dagger',
  'greatclub',
  'handaxe',
  'javelin',
  'light',
  'mace',
  'quarterstaff',
  'sickle',
  'spear',
] as const

export const SIMPLE_RANGED_WEAPON_TYPES = [
  'lightCrossbow',
  'dart',
  'shortbow',
  'sling',
] as const

export const SIMPLE_WEAPON_TYPES = [
  ...SIMPLE_MELEE_WEAPON_TYPES,
  ...SIMPLE_RANGED_WEAPON_TYPES,
] as const

// MARTIAL

export const MARTIAL_WEAPON_GROUP_TYPE = 'martial'

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
  'war',
  'warhammer',
  'whip',
] as const

export const MARTIAL_RANGED_WEAPON_TYPE = [
  'blowgun',
  'handCrossbow',
  'heavyCrossbow',
  'longbow',
  'net',
] as const

export const MARTIAL_WEAPON_TYPES = [
  ...MARTIAL_MELEE_WEAPON_TYPES,
  ...MARTIAL_RANGED_WEAPON_TYPE,
] as const

// BY DISTANCE

export const MELEE_WEAPON_TYPES = [
  ...SIMPLE_MELEE_WEAPON_TYPES,
  ...MARTIAL_MELEE_WEAPON_TYPES,
] as const

export const RANGE_WEAPON_TYPES = [
  ...SIMPLE_RANGED_WEAPON_TYPES,
  ...MARTIAL_RANGED_WEAPON_TYPE,
] as const

// TYPES

declare global {
  type SimpleWeaponGroupType = typeof SIMPLE_WEAPON_GROUP_TYPE
  type SimpleMeleeWeaponType = typeof SIMPLE_MELEE_WEAPON_TYPES[number]
  type SimpleRangedWeaponType = typeof SIMPLE_RANGED_WEAPON_TYPES[number]
  type SimpleWeaponType = typeof SIMPLE_WEAPON_TYPES[number]

  type MartialWeaponGroupType = typeof MARTIAL_WEAPON_GROUP_TYPE
  type MartialMeleeWeaponType = typeof MARTIAL_MELEE_WEAPON_TYPES[number]
  type MartialRangedWeaponType = typeof MARTIAL_RANGED_WEAPON_TYPE[number]
  type MartialWeaponType = typeof MARTIAL_WEAPON_TYPES[number]

  type MeleeWeaponType = typeof MELEE_WEAPON_TYPES[number]
  type RangeWeaponType = typeof RANGE_WEAPON_TYPES[number]

  type WeaponType = SimpleWeaponType | MartialWeaponType
}
