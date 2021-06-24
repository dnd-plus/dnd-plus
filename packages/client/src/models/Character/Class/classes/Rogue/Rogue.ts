import { CharacterClass } from 'models/Character/Class/Class'

export const Rogue: CharacterClass = {
  type: 'rogue',
  hitDiceValue: 8,
  proficiencies: {
    armor: ['light'],
    weapon: ['simple', 'handCrossbow', 'longsword', 'rapier', 'shortsword'],
    tool: ['thieves'],
    savingThrows: ['dexterity', 'intelligence'],
    skillsNumber: 4,
    skillsChoice: [
      'acrobatics',
      'investigation',
      'athletics',
      'perception',
      'performance',
      'intimidation',
      'sleightOfHand',
      'deception',
      'insight',
      'stealth',
      'persuasion',
    ],
  },
  archetype: {
    level: 3,
    name: 'Архетип плута',
    description:
      'На 3 уровне вы выбираете архетип, который отображает ваши плутовские способности. Выбранный вами архетип предоставляет умения на 9, 13 и 17 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ dexterity: 13 }],
    proficiencies: {
      armor: true,
      weapon: false,
      tool: true,
      skillsNumber: 1,
    },
  },
  features: [],
}
