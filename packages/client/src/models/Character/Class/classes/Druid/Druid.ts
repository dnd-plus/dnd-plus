import { CharacterClass } from 'models/Character/Class/Class'

export const Druid: CharacterClass = {
  type: 'druid',
  hitDiceValue: 8,
  proficiencies: {
    armor: ['light', 'medium', 'shield'],
    weapon: [
      'quarterstaff',
      'mace',
      'dart',
      'club',
      'dagger',
      'spear',
      'javelin',
      'sling',
      'sickle',
      'scimitar',
    ],
    tool: ['herbalism'],
    savingThrows: ['intelligence', 'wisdom'],
    skillsNumber: 2,
    skillsChoice: [
      'perception',
      'survival',
      'arcana',
      'medicine',
      'animalHandling',
      'nature',
      'insight',
      'religion',
    ],
  },
  spellCasting: {
    type: 'mage',
    ability: 'wisdom',
    fromLevel: 1,
    description:
      'Для сотворения заклинаний друиды пользуются сакральной эссенцией самой природы, облачая в неё свою волю.',
    availableCantripsNumber: [
      2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    ],
    characterLevelSpellsNumberMod: 'full',
    ritual: true,
    focusing: true,
  },
  archetype: {
    level: 2,
    name: 'Круг друидов',
    description:
      'На 2 уровне нужно выбрать, в каком круге друидов состоит персонаж. Этот выбор даёт дополнительные умения на 2, 6, 10 и 14 уровнях.',
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
