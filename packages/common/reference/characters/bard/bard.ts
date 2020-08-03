import { SIMPLE_WEAPON_GROUP_TYPE } from 'common/reference/equipment/WEAPON_TYPE'

export const bard: CharacterClass = {
  type: 'bard',
  name: 'Бард',
  description: 'Вдохновляющий маг, чья сила идет от музыки создания',
  hpDice: 8,
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
  spellcasting: {
    spellSlotsType: 'mage',
    baseAbility: 'charisma',
    // prettier-ignore
    cantripsByLevel: [
      2, 2, 2, 3, 3,
      3, 3, 3, 3, 4,
      4, 4, 4, 4, 4,
      4, 4, 4, 4, 4,
    ],
    // prettier-ignore
    spellsByLevel: [
      4,  5,  6,  7,  8,
      9,  10, 11, 12, 13,
      14, 15, 15, 16, 18,
      19, 19, 20, 22, 22,
    ]
  },
  archetypes: [],
  featuresSpec: [],
} as const
