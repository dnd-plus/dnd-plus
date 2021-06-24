import { CharacterClass } from 'models/Character/Class/Class'

export const Ranger: CharacterClass = {
  type: 'ranger',
  hitDiceValue: 10,
  proficiencies: {
    armor: ['light', 'medium', 'shield'],
    weapon: ['simple', 'martial'],
    tool: [],
    savingThrows: ['strength', 'dexterity'],
    skillsNumber: 2,
    skillsChoice: [
      'investigation',
      'athletics',
      'perception',
      'nature',
      'insight',
      'stealth',
      'animalHandling',
    ],
  },
  spellCasting: {
    type: 'secondMage',
    ability: 'wisdom',
    fromLevel: 2,
    description:
      'Получив 2 уровень, вы обучаетесь использованию волшебной сущности природы для сотворения заклинаний подобно друиду.',
    characterLevelSpellsNumberMod: 'half',
    focusing: false,
    ritual: false,
  },
  archetype: {
    level: 3,
    name: 'Архетип следопыта',
    description:
      'На 3 уровне вы выбираете архетип, к которому вы стремитесь. Выбранный вами архетип предоставляет умения на 3, 7, 11 и 15 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ dexterity: 13, wisdom: 13 }],
    proficiencies: {
      armor: true,
      weapon: true,
      tool: false,
      skillsNumber: 1,
    },
  },
  features: [],
}
