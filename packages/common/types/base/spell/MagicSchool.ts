export type MagicSchool =
  | 'evocation'
  | 'conjuration'
  | 'illusion'
  | 'necromancy'
  | 'abjuration'
  | 'enchantment'
  | 'transmutation'
  | 'divination'

export const MagicSchoolDict: Record<MagicSchool, string> = {
  evocation: 'воплощение',
  conjuration: 'вызов',
  illusion: 'иллюзия',
  necromancy: 'некромантия',
  abjuration: 'ограждение',
  enchantment: 'очарование',
  transmutation: 'преобразование',
  divination: 'прорицание',
}
