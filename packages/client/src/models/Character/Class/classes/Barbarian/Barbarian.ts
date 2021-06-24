import { CharacterClass } from 'models/Character/Class/Class'

export const Barbarian: CharacterClass = {
  type: 'barbarian',
  hitDiceValue: 12,
  proficiencies: {
    armor: ['light', 'medium', 'shield'],
    weapon: ['simple', 'martial'],
    tool: [],
    savingThrows: ['strength', 'constitution'],
    skillsNumber: 2,
    skillsChoice: [
      'athletics',
      'perception',
      'survival',
      'intimidation',
      'nature',
      'animalHandling',
    ],
  },
  archetype: {
    level: 3,
    name: 'Путь дикости',
    description:
      'На 3 уровне вы выбираете путь, определяющий природу вашей ярости. Ваш выбор обеспечит вам умения на 3, 6, 10 и 14 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ strength: 13 }],
    proficiencies: {
      armor: false,
      weapon: true,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
