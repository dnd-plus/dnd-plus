import { CharacterRace } from 'models/Character/Race/Race'
import halfElfImg from './assets/halfElf.jpeg'
import { ABILITY_TYPES, AbilityTypeDict } from 'common/reference/AbilityType'

export const HalfElf: CharacterRace = {
  type: 'HalfElf',
  name: 'Полуэльф',
  description:
    'Полуэльфы сочетают в себе, как некоторые говорят, лучшие качества обеих рас: человеческие любознательность, изобретательность и амбиции, приправленные изысканными чувствами, любовью к природе и ощущением прекрасного, свойственными эльфам.',
  size: 'medium',
  image: halfElfImg,
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашей Харизмы увеличивается на 2, а значения двух других характеристик на ваш выбор увеличиваются на 1',
      effects: [{ type: 'ability', abilities: { charisma: 2 } }],
      choices: [1, 2].map(() => ({
        type: 'select',
        label: 'Выбор характеристики',
        options: ABILITY_TYPES.map((type) => ({
          name: AbilityTypeDict[type],
          effects: [{ type: 'ability', abilities: { [type]: 1 } }],
        })),
      })),
    },
    {
      name: 'Размер',
      description:
        'Полуэльфы почти такого же размера, как и люди. Их рост колеблется от 5 до 6 фт. (от 155 до 183 сантиметров). Ваш размер — Средний.',
    },
    {
      name: 'Скорость',
      description: 'Базовая скорость вашего перемещения равна 30 футам.',
      effects: [{ type: 'walkMovement', absolute: 30 }],
    },
    {
      name: 'Тёмное зрение',
      description:
        'Благодаря вашей эльфийской крови, вы обладаете превосходным зрением в темноте и при тусклом освещении. На расстоянии в 60 фт. вы при тусклом освещении можете видеть так, как будто это яркое освещение, и в темноте так, как будто это тусклое освещение. В темноте вы не можете различать цвета, только оттенки серого.',
      effects: [{ type: 'darkVision', distance: 60 }],
    },
    {
      name: 'Наследие фей',
      // todo: add effect
      description:
        'Вы совершаете с преимуществом спасброски от очарования, и вас невозможно магически усыпить.',
    },
    {
      name: 'Универсальность навыков',
      description: 'Вы получаете владение двумя навыками на ваш выбор.',
      choices: [1, 2].map(() => ({ type: 'selectSkill' })),
    },
    {
      name: 'Языки',
      description:
        'Вы можете говорить, читать и писать на Общем, Эльфийском, и ещё одном языке на ваш выбор.',
      effects: [
        {
          type: 'language',
          languages: ['common', 'elvish'],
        },
      ],
      choices: [{ type: 'selectLanguage' }],
    },
  ],
}
