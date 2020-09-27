import { CharacterRace } from 'models/Character/Race/Race'
import humanImg from './assets/human.jpeg'
import variantHumanImg from './assets/variantHuman.jpeg'

export const Human: CharacterRace = {
  baseType: 'Human',
  baseName: 'Человек',
  type: 'Human',
  name: 'Человек',
  description:
    'Люди являются самыми приспособленным и амбициозным народом среди распространённых рас. Их вкусы, нравы и обычаи сильно отличаются во множестве разных земель, где они поселились.',
  image: humanImg,
  size: 'medium',
  features: [
    {
      name: 'Увеличение характеристик',
      description: 'Значение всех ваших характеристик увеличивается на 1.',
      effects: [
        {
          type: 'ability',
          abilities: {
            dexterity: 1,
            strength: 1,
            constitution: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1,
          },
        },
      ],
    },
    {
      name: 'Размер',
      description:
        'Люди сильно различаются по размерам. Некоторые с трудом достигают 5 фт. (152 сантиметров) ростом, тогда как другие имеют рост, превосходящий 6 фт. (183 сантиметра). Вне зависимости от роста, ваш размер — Средний.',
    },
    {
      name: 'Скорость',
      description: 'Ваша базовая скорость перемещения составляет 30 фт.',
      effects: [{ type: 'walkMovement', absolute: 30 }],
    },
    {
      name: 'Языки',
      description:
        'Вы можете говорить, читать и писать на Общем и ещё одном языке на ваш выбор. Люди обычно изучают языки народов, с которыми имеют дело, включая редкие диалекты. Они любят разбавлять собственную речь словами, позаимствованными из других языков: орочьими ругательствами, эльфийскими музыкальными терминами, дварфскими военными командами.',
      effects: [{ type: 'language', languages: ['common'] }],
      choices: [{ type: 'selectLanguage' }],
    },
  ],
}

export const VariantHuman: CharacterRace = {
  baseType: 'Human',
  baseName: 'Человек',
  type: 'VariantHuman',
  name: 'Человек',
  variant: true,
  description:
    'Люди являются самыми приспособленным и амбициозным народом среди распространённых рас. Их вкусы, нравы и обычаи сильно отличаются во множестве разных земель, где они поселились.',
  image: variantHumanImg,
  size: 'medium',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение двух характеристик на ваш выбор увеличивается на 1.',
      choices: [{ type: 'selectAbility', count: 2 }],
    },
    {
      name: 'Размер',
      description:
        'Люди сильно различаются по размерам. Некоторые с трудом достигают 5 фт. (152 сантиметров) ростом, тогда как другие имеют рост, превосходящий 6 фт. (183 сантиметра). Вне зависимости от роста, ваш размер — Средний.',
    },
    {
      name: 'Скорость',
      description: 'Ваша базовая скорость перемещения составляет 30 фт.',
      effects: [{ type: 'walkMovement', absolute: 30 }],
    },
    {
      name: 'Навыки',
      description: 'Вы получаете владение одним навыком на ваш выбор.',
      choices: [{ type: 'selectSkill' }],
    },
    {
      name: 'Черта',
      description: 'Вы получаете одну черту на ваш выбор.',
      choices: [{ type: 'selectFeat' }],
    },
    {
      name: 'Языки',
      description:
        'Вы можете говорить, читать и писать на Общем и ещё одном языке на ваш выбор. Люди обычно изучают языки народов, с которыми имеют дело, включая редкие диалекты. Они любят разбавлять собственную речь словами, позаимствованными из других языков: орочьими ругательствами, эльфийскими музыкальными терминами, дварфскими военными командами.',
      effects: [{ type: 'language', languages: ['common'] }],
      choices: [{ type: 'selectLanguage' }],
    },
  ],
}
