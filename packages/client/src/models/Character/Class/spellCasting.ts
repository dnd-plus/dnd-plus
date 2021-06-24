import { CharacterClass } from 'models/Character/Class/Class'
import { CharacterLevelArray } from 'common/types/base/character/Level'
import {
  CharacterClassName,
  CharacterClassNameDict,
} from 'common/types/base/character/CharacterClassName'
import {
  AbilityTypeDict,
  AbilityTypeGenDict,
} from 'common/reference/AbilityType'

const CHARACTER_LEVELS = [...Array(20)].map((_, index) => index + 1)

export function createSpellCastingFeatureDescription(
  className: CharacterClassName,
  {
    type,
    ability,
    pact,
    description,
    availableCantripsNumber,
    availableSpellsNumber,
    characterLevelSpellsNumberMod,
    focusing,
    ritual,
  }: Exclude<CharacterClass['spellCasting'], undefined>,
) {
  const slots = spellCastingSlotsMap[type]

  // prettier-ignore
  return `
${description}

<table size='small'>
<thead>
<tr>
<th rowspan="2">Ур.</th>
${availableCantripsNumber ? '<th rowspan="2"><small>Известные<br>заговоры</small></th>' : ''}
${availableSpellsNumber ? '<th rowspan="2"><small>Известные<br>заклинания</small></th>' : ''}
${slots ? `<th colspan="${slots[0].length}" align="center">Ячейки заклинаний на ур. заклинания</th>` : ''}
${pact ? '<th rowspan="2">Ячейки заклинаний</th><th rowspan="2">Уровень ячеек</th>' : ''}
</tr>
${slots ? `<tr>${slots[0].map((_, index) => `<th>${index + 1}</th>`).join('')}</tr>` : ''}
</thead>
<tbody>
${CHARACTER_LEVELS.map((level, index) => `
  <tr>
  <td>${level}</td>
  ${availableCantripsNumber ? `<td>${availableCantripsNumber[index]}</td>` : ''}
  ${availableSpellsNumber ? `<td>${availableSpellsNumber[index]}</td>` : ''}
  ${slots ? slots[index].map((num) => `<td>${num}</td>`).join('') : ''}
  ${pact ? `<td>${pact.spellsNumber[index]}</td><td>${pact.spellsLevel[index]}</td>` : ''}
  </tr>
`.trim()).join('')}
</tbody>
</table>

${availableCantripsNumber && `
**Заговоры**

Вы можете творить заговоры из доступных для класса ${CharacterClassNameDict[className]} согласно таблице.
`}

**Ячейки заклинаний**
${pact ? `
Таблица показывает, какое количество ячеек для сотворения заклинаний у вас есть, а также уровень этих ячеек — все ваши ячейки заклинаний одного уровня. Для сотворения одного из заклинаний колдуна 1 уровня и выше вы должны потратить ячейку заклинаний. Вы восстановите все потраченные ячейки, когда завершите короткий или продолжительный отдых.
` : `
Таблица показывает, сколько ячеек заклинаний у вас есть для заклинаний 1 и других уровней. Для использования заклинания вы должны потратить ячейку соответствующего, либо превышающего уровня. Вы восстанавливаете все потраченные ячейки в конце продолжительного отдыха.
`}

**Известные заклинания первого и более высоких уровней**
${pact || availableSpellsNumber ? `
Колонка «известные заклинания» показывает, когда вы сможете выучить новые заклинания. Уровень заклинаний не должен превышать уровень самой высокой имеющейся у вас ячейки заклинаний.

Кроме того, когда вы получаете новый уровень в этом классе, вы можете одно из известных вам заклинаний этого класса заменить на другое, уровень которого тоже должен соответствовать имеющимся ячейкам заклинаний.
` : `
Вы подготавливаете список заклинаний вашего класса, доступных для сотворения. При этом вы выбираете число заклинаний из списка заклинаний вашего класса, равное модификатору ${AbilityTypeGenDict[ability]} + ${characterLevelSpellsNumberMod === 'full' ? 'уровень класса' :'половине уровня класса, округляя в меньшую сторону'} (минимум одно заклинание). Уровень заклинаний не должен превышать уровень самой высокой имеющейся у вас ячейки заклинаний.
`}

**Базовая характеристика заклинаний**
Ваша базовая характеристика для заклинаний - ${AbilityTypeDict[ability]}. Вы используете ее в случаях, когда заклинание ссылается на базовую характеристику. Кроме того, вы используете ее при определении Сл спасбросков от ваших заклинаний, и при броске атаки заклинаниями.

**Сл спасброска** = 8 + бонус мастерства + модификатор ${AbilityTypeGenDict[ability]}.

**Модификатор броска атаки** = бонус мастерства + модификатор ${AbilityTypeGenDict[ability]}

${ritual && `
**Исполнение ритуалов**
Вы можете исполнить любое известное вам заклинание вашего класса в качестве ритуала, если заклинание позволяет это.
`}
${focusing && `
**Фокусировка заклинания**
Вы можете использовать заклинательную фокусировки для заклинаний вашего класса.
`}
  `
}

export const spellCastingSlotsMap: {
  mage: CharacterLevelArray<
    [number, number, number, number, number, number, number, number, number]
  >
  secondMage: CharacterLevelArray<[number, number, number, number, number]>
  thirdMage: CharacterLevelArray<[number, number, number, number]>
  caster?: never
} = {
  mage: [
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 2, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 0, 0, 0, 0, 0, 0, 0],
    [4, 3, 2, 0, 0, 0, 0, 0, 0],
    [4, 3, 3, 0, 0, 0, 0, 0, 0],
    [4, 3, 3, 1, 0, 0, 0, 0, 0],
    [4, 3, 3, 2, 0, 0, 0, 0, 0],
    [4, 3, 3, 3, 1, 0, 0, 0, 0],
    [4, 3, 3, 3, 2, 0, 0, 0, 0],
    [4, 3, 3, 3, 2, 1, 0, 0, 0],
    [4, 3, 3, 3, 2, 1, 0, 0, 0],
    [4, 3, 3, 3, 2, 1, 1, 0, 0],
    [4, 3, 3, 3, 2, 1, 1, 0, 0],
    [4, 3, 3, 3, 2, 1, 1, 1, 0],
    [4, 3, 3, 3, 2, 1, 1, 1, 0],
    [4, 3, 3, 3, 2, 1, 1, 1, 1],
    [4, 3, 3, 3, 3, 1, 1, 1, 1],
    [4, 3, 3, 3, 3, 2, 1, 1, 1],
    [4, 3, 3, 3, 3, 2, 2, 1, 1],
  ],
  secondMage: [
    [2, 0, 0, 0, 0],
    [2, 0, 0, 0, 0],
    [3, 0, 0, 0, 0],
    [3, 0, 0, 0, 0],
    [4, 2, 0, 0, 0],
    [4, 2, 0, 0, 0],
    [4, 3, 0, 0, 0],
    [4, 3, 0, 0, 0],
    [4, 3, 2, 0, 0],
    [4, 3, 2, 0, 0],
    [4, 3, 3, 0, 0],
    [4, 3, 3, 0, 0],
    [4, 3, 3, 1, 0],
    [4, 3, 3, 1, 0],
    [4, 3, 3, 2, 0],
    [4, 3, 3, 2, 0],
    [4, 3, 3, 3, 1],
    [4, 3, 3, 3, 1],
    [4, 3, 3, 3, 2],
    [4, 3, 3, 3, 2],
  ],
  thirdMage: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [3, 0, 0, 0],
    [3, 0, 0, 0],
    [3, 0, 0, 0],
    [4, 2, 0, 0],
    [4, 2, 0, 0],
    [4, 2, 0, 0],
    [4, 3, 0, 0],
    [4, 3, 0, 0],
    [4, 3, 0, 0],
    [4, 3, 2, 0],
    [4, 3, 2, 0],
    [4, 3, 2, 0],
    [4, 3, 3, 0],
    [4, 3, 3, 0],
    [4, 3, 3, 0],
    [4, 3, 3, 1],
    [4, 3, 3, 1],
  ],
}
