import { CharacterClass } from 'models/Character/Class/Class'
import { createSpellCastingFeature } from 'models/Character/Class/spellCasting'

export const Sorcerer: CharacterClass = {
  type: 'sorcerer',
  hitDiceValue: 6,
  proficiencies: {
    armor: [],
    weapon: ['quarterstaff', 'dart', 'dagger', 'lightCrossbow', 'sling'],
    tool: [],
    savingThrows: ['constitution', 'charisma'],
    skillsNumber: 2,
    skillsChoice: [
      'intimidation',
      'arcana',
      'deception',
      'insight',
      'religion',
      'persuasion',
    ],
  },
  archetype: {
    level: 1,
    name: 'Происхождение чародея',
    description:
      'Выберите источник, из которого ваш персонаж черпает свою силу. Ваш выбор предоставляет вам умения на 1, 6, 14 и 18 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ charisma: 13 }],
    proficiencies: {
      armor: false,
      weapon: false,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [
    createSpellCastingFeature('sorcerer', 1, {
      spellCastingType: 'mage',
      ability: 'charisma',
      description:
        'Определённое событие в вашем прошлом или в жизни ваших родителей или предков оставило на вас неизгладимый отпечаток, связав вас с магией. Ваши заклинания питает некий источник магии, какого бы происхождения он не был.',
      availableCantripsNumber: [
        4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      ],
      availableSpellsNumber: [
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15,
      ],
      ritual: true,
      focusing: true,
    }),
  ],
}
