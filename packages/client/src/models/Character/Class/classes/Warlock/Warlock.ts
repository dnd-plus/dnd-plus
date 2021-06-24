import { CharacterClass } from 'models/Character/Class/Class'

export const Warlock: CharacterClass = {
  type: 'warlock',
  hitDiceValue: 8,
  proficiencies: {
    armor: ['light'],
    weapon: ['simple'],
    tool: [],
    savingThrows: ['wisdom', 'charisma'],
    skillsNumber: 2,
    skillsChoice: [
      'investigation',
      'intimidation',
      'history',
      'arcana',
      'deception',
      'nature',
      'religion',
    ],
  },
  spellCasting: {
    type: 'caster',
    ability: 'charisma',
    fromLevel: 1,
    description:
      'Исследования тайн и магия, дарованная покровителем, дают вам возможность использовать заклинания.',
    availableCantripsNumber: [
      2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ],
    availableSpellsNumber: [
      2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15,
    ],
    pact: {
      spellsNumber: [
        1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4,
      ],
      spellsLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    },
    ritual: false,
    focusing: true,
  },
  archetype: {
    level: 1,
    name: 'Потусторонний покровитель',
    description:
      'На 1 уровне вы заключаете сделку с потусторонним существом на ваш выбор. Ваш выбор определит умения, предоставляемые на 1, 6, 10 и 14 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ charisma: 13 }],
    proficiencies: {
      armor: true,
      weapon: true,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
