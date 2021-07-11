import { CharacterClass } from 'models/Character/Class/Class'
import { ARTISAN_TOOL_TYPES } from 'common/reference/equipment/ToolType'
import { createSpellCastingFeature } from 'models/Character/Class/spellCasting'

export const Artificer: CharacterClass = {
  type: 'artificer',
  hitDiceValue: 8,
  proficiencies: {
    armor: ['light', 'medium', 'shield'],
    weapon: ['simple'],
    tool: ['thieves', 'tinker'],
    toolNumber: 1,
    toolChoice: ARTISAN_TOOL_TYPES,
    savingThrows: ['constitution', 'intelligence'],
    skillsNumber: 2,
    skillsChoice: [
      'perception',
      'history',
      'sleightOfHand',
      'arcana',
      'medicine',
      'nature',
      'investigation',
    ],
  },
  archetype: {
    level: 3,
    name: 'Специальность изобретателя',
    description:
      'Вы выбираете свою специальность. Ваш выбор предоставляет вам способности на 5-м, 9-м и 15-м уровнях.',
    variants: [],
  },
  multiclass: {
    requirements: [{ intelligence: 13 }],
    proficiencies: {
      armor: true,
      weapon: false,
      tool: true,
      skillsNumber: 0,
    },
  },
  features: [
    createSpellCastingFeature('artificer', 1, {
      spellCastingType: 'secondMage',
      ability: 'intelligence',
      description: `
Вы изучили то, как работает магия, и то, как накладывать заклинания, направляя её через предметы. Наблюдающим за вами кажется, что вы не используете обычные способы для сотворения заклинаний, а творите чудеса с помощью обычных предметов и всяких диковинок.

**Необходимый инструмент**
При чтении любого заклинания с помощью умения «Использование заклинаний» вы должны держать в руках воровские инструменты или любые из инструментов ремесленника в качестве магической фокусировки (это значит, что у заклинаний есть материальный компонент). Смотрите главу 5 «Снаряжение» в «Книге игрока», где представлены описания всех инструментов.

После получения умения «Инфузирование предмета» на 2-м уровне вы сможете в качестве магической фокусировки использовать любой предмет, насыщенный вами магией
    `,
      availableCantripsNumber: [
        2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
      ],
      characterLevelSpellsNumberMod: 'half',
      ritual: true,
      focusing: true,
    }),
  ],
}
