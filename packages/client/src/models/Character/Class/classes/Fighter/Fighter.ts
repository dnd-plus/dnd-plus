import { CharacterClass } from 'models/Character/Class/Class'

export const Fighter: CharacterClass = {
  type: 'fighter',
  hitDiceValue: 10,
  proficiencies: {
    armor: ['light', 'medium', 'heavy', 'shield'],
    weapon: ['simple', 'martial'],
    tool: [],
    savingThrows: ['strength', 'constitution'],
    skillsNumber: 2,
    skillsChoice: [
      'acrobatics',
      'athletics',
      'perception',
      'survival',
      'intimidation',
      'history',
      'insight',
      'animalHandling',
    ],
  },
  archetype: {
    level: 3,
    name: 'Воинский архетип',
    description:
      'На 3 уровне вы выбираете архетип, отражающий стиль и технику, к которым вы стремитесь. Выбранный вами архетип предоставляет умения на 3, 7, 10, 15 и 18 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ strength: 13 }, { dexterity: 13 }],
    proficiencies: {
      armor: true,
      weapon: true,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
