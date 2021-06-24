import { CharacterClass } from 'models/Character/Class/Class'

export const Cleric: CharacterClass = {
  type: 'cleric',
  hitDiceValue: 8,
  proficiencies: {
    armor: ['light', 'medium', 'shield'],
    weapon: ['simple'],
    tool: [],
    savingThrows: ['wisdom', 'charisma'],
    skillsNumber: 2,
    skillsChoice: ['history', 'medicine', 'insight', 'religion', 'persuasion'],
  },
  spellCasting: {
    type: 'mage',
    ability: 'wisdom',
    fromLevel: 1,
    description:
      'Будучи проводником божественной силы, вы можете творить заклинания жреца.',
    availableCantripsNumber: [
      3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ],
    characterLevelSpellsNumberMod: 'full',
    ritual: true,
    focusing: true,
  },
  archetype: {
    level: 1,
    name: 'Божественный домен',
    description:
      'Выберите один домен, связанный с вашим божеством. Он также даёт вам дополнительные способы использования Божественного канала, когда вы получаете это умение на 2 уровне, и дополнительные умения на 6, 8 и 17 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ wisdom: 13 }],
    proficiencies: {
      armor: true,
      weapon: false,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
