import { extendType } from 'common/utils/extendType'

export const ARTISAN_TOOL_TYPES = [
  'alchemist',
  'brewer',
  'calligrapher',
  'carpenter',
  'cartographer',
  'cobbler',
  'cook',
  'glassblower',
  'jeweler',
  'leatherworker',
  'mason',
  'painter',
  'potter',
  'smith',
  'tinker',
  'weaver',
  'woodcarver',
] as const
export type ArtisanToolType = typeof ARTISAN_TOOL_TYPES[number]

export const GAMING_TOOL_TYPES = ['dice', 'playingCard'] as const
export type GamingToolType = typeof GAMING_TOOL_TYPES[number]

export const MUSIC_TOOL_TYPES = [
  'bagpipes',
  'drum',
  'dulcimer',
  'flute',
  'lute',
  'lyre',
  'horn',
  'panflute',
  'shawm',
  'viol',
] as const
export type MusicToolType = typeof MUSIC_TOOL_TYPES[number]

export const TOOL_TYPES = [
  ...ARTISAN_TOOL_TYPES,
  ...GAMING_TOOL_TYPES,
  ...MUSIC_TOOL_TYPES,
  'disguise',
  'forgery',
  'gaming',
  'herbalism',
  'navigator',
  'poisoner',
  'thieves',
  'vehicles',
] as const
export type ToolType = typeof TOOL_TYPES[number]

export const ToolTypeDict = extendType<Record<ToolType, string>>()({
  alchemist: 'Инструменты алхимика',
  brewer: 'Инструменты пивовара',
  calligrapher: 'Инструменты каллиграфа',
  carpenter: 'Инструменты плотника',
  cartographer: 'Инструменты картографа',
  cobbler: 'Инструменты сапожника',
  cook: 'Инструменты повара',
  glassblower: 'Инструменты стеклодува',
  jeweler: 'Инструменты ювелира',
  leatherworker: 'Инструменты кожевника',
  mason: 'Инструменты каменщика',
  painter: 'Инструменты художника',
  potter: 'Инструменты гончара',
  smith: 'Инструменты кузнеца',
  tinker: 'Инструменты жестянщика',
  weaver: 'Инструменты ткача',
  woodcarver: 'Инструменты резчика по дереву',
  dice: 'Кости',
  playingCard: 'Карты',
  bagpipes: 'Волынка',
  drum: 'Барабан',
  dulcimer: 'Цимбалы',
  flute: 'Флейта',
  lute: 'Лютня',
  lyre: 'Лары',
  horn: 'Рожок',
  panflute: 'Свирель',
  shawm: 'Шалмей',
  viol: 'Виола',
  disguise: 'Набор для гримма',
  forgery: 'Набор для фальсификации',
  gaming: 'Игровой набор',
  herbalism: 'Набор травника',
  navigator: 'Инструменты навигатора',
  poisoner: 'Инструменты отравителя',
  thieves: 'Воровские инструменты',
  vehicles: 'Транспорт',
} as const)
