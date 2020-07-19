import { SIMPLE_WEAPON_GROUP_TYPE } from '../../equipment/WEAPON_TYPE'

export const bard: CharacterClass = {
  type: 'bard',
  name: 'Бард',
  description: 'Вдохновляющий маг, чья сила идет от музыки создания',
  proficiencies: {
    armor: ['light'],
    weapon: [
      SIMPLE_WEAPON_GROUP_TYPE,
      'handCrossbow',
      'longsword',
      'rapier',
      'shortsword',
    ],
    savingThrows: ['dexterity', 'charisma'],
    skills: {
      count: 2,
      variants: [
        'acrobatics',
        'animalHandling',
        'athletics',
        'history',
        'insight',
        'intimidation',
        'perception',
        'survival',
      ],
    },
  },
  hpDice: 8,
  archetypes: [],
  featuresSpec: [],
} as const
