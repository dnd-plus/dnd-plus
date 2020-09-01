import { extendType } from 'common/utils/extendType'
import { CharacterRace } from 'models/Character/Race/Race'
import stoutHalflingImg from 'models/Character/Race/races/assets/stoutHalfling.jpeg'
import lightfootHalflingImg from 'models/Character/Race/races/assets/lightfootHalfling.jpeg'

const CommonHalfling = extendType<Partial<CharacterRace>>()({
  baseName: 'Халфлинг',
  size: 'small',
  features: [
    {
      name: 'Скорость',
      description: 'Ваша базовая скорость передвижения составляет 25 фт.',
      effects: [{ type: 'walkMovement', absolute: 25 }],
    },
    {
      name: 'Размер',
      description:
        'Полурослики в среднем примерно 3 фута (90 сантиметров) ростом и весят около 40 фунтов (18 килограмм). Ваш размер — Маленький.',
    },
    {
      name: 'Везучий',
      // todo: add effect
      description:
        'Если при броске атаки, проверке характеристики или спасброске у вас выпало «1», вы можете перебросить кость, и должны использовать новый результат.',
    },
    {
      name: 'Храбрый',
      // todo: add effect
      description: 'Вы совершаете с преимуществом спасброски от испуга.',
    },
    {
      name: 'Проворство полуросликов',
      // todo: add effect
      description:
        'Вы можете проходить сквозь пространство, занятое существами, чей размер больше вашего.',
    },
    {
      name: 'Языки',
      description:
        'Вы можете говорить, читать и писать на Общем и языке Полуросликов. Их язык не является секретным, но они не торопятся делиться им с остальными. Пишут они мало, и почти не создали собственной литературы, но устные предания у них очень распространены. Почти все полурослики знают Общий, чтобы общаться с людьми в землях, куда они направляются, или по которым странствуют.',
      effects: [
        {
          type: 'language',
          languages: ['common', 'halfling'],
        },
      ],
    },
  ],
})

export const StoutHalfling: CharacterRace = {
  ...CommonHalfling,
  type: 'StoutHalfling',
  name: 'Коренастый полурослик',
  image: stoutHalflingImg,
  description:
    'Крошечные полурослики выживают в мире, полном более крупных существ, стараясь избегать внимания, а если это оказывается невозможным, то избегая враждебности. Коренастые полурослики выносливее других и обладают некоторой устойчивостью к ядам.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашей Ловкости увеличивается на 2, а значение Телосложения увеличивается на 1.',
      effects: [
        { type: 'ability', abilities: { dexterity: 2, constitution: 1 } },
      ],
    },
    ...CommonHalfling.features,
    {
      name: 'Устойчивость коренастых',
      description:
        'Вы совершаете с преимуществом спасброски от яда, и вы получаете сопротивление к урону ядом.',
      effects: [
        { type: 'defence', damages: { acid: 'resistance' } },
        { type: 'savingThrowAdvantage', damages: { acid: 'advantage' } },
      ],
    },
  ],
}

export const LighfootHalfling: CharacterRace = {
  ...CommonHalfling,
  type: 'LighfootHalfling',
  name: 'Легконогий полурослик',
  image: lightfootHalflingImg,
  description:
    'Крошечные полурослики выживают в мире, полном более крупных существ, стараясь избегать внимания, а если это оказывается невозможным, то избегая враждебности. Легконогие полурослики умеют отлично скрываться, в том числе используя других существ как укрытие.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашей Ловкости увеличивается на 2, а значение Харизмы увеличивается на 1.',
      effects: [{ type: 'ability', abilities: { dexterity: 2, charisma: 1 } }],
    },
    ...CommonHalfling.features,
    {
      name: 'Естественная скрытность',
      // todo: add effect
      description:
        'Вы можете предпринять попытку скрыться даже если заслонены только существом, превосходящими вас в размере как минимум на одну категорию.',
    },
  ],
}
