import { CharacterClass } from 'models/Character/Class/Class'

export const Paladin: CharacterClass = {
  type: 'paladin',
  hitDiceValue: 10,
  proficiencies: {
    armor: ['light', 'medium', 'heavy', 'shield'],
    weapon: ['simple', 'martial'],
    tool: [],
    savingThrows: ['wisdom', 'charisma'],
    skillsNumber: 2,
    skillsChoice: [
      'athletics',
      'intimidation',
      'medicine',
      'insight',
      'religion',
      'persuasion',
    ],
  },
  spellCasting: {
    type: 'secondMage',
    ability: 'charisma',
    fromLevel: 2,
    description:
      'Получая 2 уровень, вы узнаёте, как черпать божественную магию посредством медитации и молитв, чтобы творить заклятья подобно жрецу.',
    characterLevelSpellsNumberMod: 'half',
    ritual: false,
    focusing: true,
  },
  archetype: {
    level: 3,
    name: 'Священная клятва',
    description:
      'Когда вы получаете 3 уровень, вы даёте клятву, навсегда связывающую вас, как паладина. До этого момента вы были в подготовительной стадии, следуя по пути, но ещё не дав присягу. Ваш выбор предоставляет вам умения на 3, 7, 15 и 20 уровнях. Эти умения включают в себя заклинания клятвы и умения Божественного канала.',
    variants: [],
  },
  multiclass: {
    requirements: [{ strength: 13, charisma: 13 }],
    proficiencies: {
      armor: true,
      weapon: true,
      tool: false,
      skillsNumber: 0,
    },
  },
  features: [],
}
