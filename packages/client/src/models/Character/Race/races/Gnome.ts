import { extendType } from 'common/utils/extendType'
import { CharacterRace } from 'models/Character/Race/Race'
import forestGnomeImg from './assets/forestGnome.jpeg'
import rockGnomeImg from './assets/rockGnome.jpeg'

const CommonGnome = extendType<Partial<CharacterRace>>()({
  baseName: 'Гном',
  size: 'small',
  languages: ['Общий', 'Гномий'],
  features: [
    {
      name: 'Скорость',
      description: 'Ваша базовая скорость перемещения — 25 фт.',
      effects: [
        {
          type: 'walkMovement',
          speed: 25,
        },
      ],
    },
    {
      name: 'Размер',
      description:
        'Рост дварфов находится между 4 и 5 футами (122 и 152 сантиметрами), и весят они около 150 фунтов (68 килограмм). Ваш размер — Средний.',
    },
    {
      name: 'Темное зрение',
      description:
        'Привыкнув к жизни под землёй, вы обладаете превосходным зрением в темноте и при тусклом освещении. На расстоянии в 60 фт. вы при тусклом освещении можете видеть так, как будто это яркое освещение, и в темноте так, как будто это тусклое освещение. В темноте вы не можете различать цвета, только оттенки серого.',
      effects: [
        {
          type: 'darkVision',
          distance: 60,
        },
      ],
    },
    {
      // todo: feature
      name: 'Гномья хитрость',
      description:
        'Вы совершаете с преимуществом спасброски Интеллекта, Мудрости и Харизмы против магии.',
    },
  ],
})

export const ForestGnome: CharacterRace = {
  ...CommonGnome,
  type: 'ForestGnome',
  name: 'Лесной гном',
  image: forestGnomeImg,
  description:
    'Гномы очень энергичны, и кажется, что каждый сантиметр их крошечного тела излучает энтузиазм и жизнелюбие. Лесные гномы обладают природными способностями к иллюзии, и унаследовали проворство и скрытность.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашего Интеллекта увеличивается на 2, а значение вашей Ловкости увеличивается на 1.',
      effects: [
        {
          type: 'ability',
          abilities: {
            intelligence: 2,
            dexterity: 1,
          },
        },
      ],
    },
    ...CommonGnome.features,
    {
      name: 'Природная иллюзия',
      // todo: feature
      // todo: mark md magic
      description:
        'Вы знаете заклинание малая иллюзия. Базовой характеристикой для его использования является Интеллект.',
    },
    {
      name: 'Общение с маленькими зверями',
      description:
        'С помощью звуков и жестов вы можете передавать простые понятия Маленьким или ещё меньшим зверям. Лесные гномы любят животных и часто держат белок, барсуков, кроликов, кротов, дятлов и других животных в качестве питомцев.',
    },
  ],
}

export const RockGnome: CharacterRace = {
  ...CommonGnome,
  type: 'RockGnome',
  name: 'Скальный гном',
  image: rockGnomeImg,
  description:
    'Гномы очень энергичны, и кажется, что каждый сантиметр их крошечного тела излучает энтузиазм и жизнелюбие. Скальные гномы выделяются своей изобретательностью и стойкостью.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашего Интеллекта увеличивается на 2, а значение вашего Телосложения увеличивается на 1.',
      effects: [
        {
          type: 'ability',
          abilities: {
            intelligence: 2,
            constitution: 1,
          },
        },
      ],
    },
    ...CommonGnome.features,
    {
      name: 'Ремесленные знания',
      // todo: feature
      description:
        'При совершении проверки Интеллекта (История) применительно к магическому, алхимическому или технологическому объекту, вы можете добавить к проверке удвоенный бонус мастерства вместо обычного.',
    },
    {
      name: 'Жестянщик',
      description: `
Вы владеете ремесленными инструментами (инструменты жестянщика). С их помощью вы можете, потратив 1 час времени и материалы на сумму в 10 зм, создать Крошечное механическое устройство (КД 5, 1 хит). Это устройство перестаёт работать через 24 часа (если вы не потратите 1 час на поддержание его работы). Вы можете действием разобрать его; в этом случае вы можете получить обратно использованные материалы. Одновременно вы можете иметь не более трёх таких устройств.

При создании устройства выберите один из следующих вариантов:

* **Заводная игрушка.** Эта заводная игрушка изображает животное, чудовище или существо, вроде лягушки, мыши, птицы, дракона или солдатика. Поставленная на землю, она проходит 5 фт. в случайном направлении за каждый ваш ход, издавая звуки, соответствующие изображаемому существу.
* **Зажигалка.** Это устройство производит миниатюрный огонёк, с помощью которого можно зажечь свечу, факел или костёр. Использование этого устройства требует действия.
* **Музыкальная шкатулка.** При открытии эта шкатулка проигрывает мелодию средней громкости. Шкатулка перестаёт играть если мелодия закончилась или если шкатулку закрыли.
      `,
    },
  ],
}
