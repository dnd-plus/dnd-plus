import { CharacterClass } from 'models/Character/Class/Class'
import {
  ARTISAN_TOOL_TYPES,
  MUSIC_TOOL_TYPES,
} from 'common/reference/equipment/ToolType'

export const Monk: CharacterClass = {
  type: 'monk',
  hitDiceValue: 8,
  proficiencies: {
    armor: [],
    weapon: ['simple', 'shortsword'],
    toolNumber: 1,
    toolChoice: [...ARTISAN_TOOL_TYPES, ...MUSIC_TOOL_TYPES],
    savingThrows: ['strength', 'dexterity'],
    skillsNumber: 2,
    skillsChoice: [
      'acrobatics',
      'athletics',
      'history',
      'insight',
      'religion',
      'stealth',
    ],
  },
  archetype: {
    level: 3,
    name: 'Монастырская традиция',
    description:
      'При достижении 3 уровня вы выбираете монастырскую традицию, которой следуете. Выбранная традиция обеспечивает вам дополнительные умения на 3, 6, 11 и 17 уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ dexterity: 13, wisdom: 13 }],
    proficiencies: {
      armor: false,
      weapon: true,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
