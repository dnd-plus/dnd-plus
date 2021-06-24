import { CharacterClass } from 'models/Character/Class/Class'

export const Wizard: CharacterClass = {
  type: 'wizard',
  hitDiceValue: 6,
  proficiencies: {
    armor: [],
    weapon: ['dagger', 'dart', 'sling', 'quarterstaff', 'lightCrossbow'],
    tool: [],
    savingThrows: ['intelligence', 'wisdom'],
    skillsNumber: 2,
    skillsChoice: [
      'investigation',
      'history',
      'arcana',
      'medicine',
      'insight',
      'religion',
    ],
  },
  spellCasting: {
    type: 'mage',
    ability: 'intelligence',
    fromLevel: 1,
    description:
      'Являясь учеником тайной магии, вы обладаете книгой, содержащей заклинания, показывающие первые проблески вашей истинной силы.',
    availableCantripsNumber: [
      3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ],
    characterLevelSpellsNumberMod: 'full',
    ritual: true,
    focusing: false,
  },
  archetype: {
    level: 2,
    name: 'Магические традиции',
    description:
      'Когда вы достигаете 2 уровня, вы выбираете магическую традицию, формирующую вашу магическую практику посредством одной из школ. Ваш выбор даёт вам умения на 2, 6, 10 и 14 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ intelligence: 13 }],
    proficiencies: {
      armor: false,
      weapon: false,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
