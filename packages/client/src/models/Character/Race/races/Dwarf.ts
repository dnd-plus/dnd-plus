import { CharacterRace } from 'models/Character/Race/Race'
import { extendType } from 'common/utils/extendType'
import { ToolTypeDict } from 'common/reference/equipment/ToolType'
import hillDwarfImg from './assets/hillDwarf.jpeg'
import mountainDwarfImg from './assets/mountainDwarf.jpeg'

const CommonDwarf = extendType<Partial<CharacterRace>>()({
  baseName: 'Дварф',
  size: 'medium',
  features: [
    {
      name: 'Скорость',
      // todo: add feature
      description:
        'Ваша базовая скорость перемещения — 25 фт. Ношение тяжёлых доспехов не снижает вашу скорость.',
      effects: [{ type: 'walkMovement', absolute: 25 }],
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
      effects: [{ type: 'darkVision', distance: 60 }],
    },
    {
      name: 'Дварфская устойчивость',
      description:
        'Вы совершаете с преимуществом спасброски от яда, и вы получаете сопротивление к урону ядом.',
      effects: [
        { type: 'defence', damages: { acid: 'resistance' } },
        { type: 'savingThrow', damages: { acid: 'advantage' } },
      ],
    },
    {
      name: 'Дварфская боевая тренировка',
      description:
        'Вы владеете боевым топором, ручным топором, лёгким и боевым молотами.',
      effects: [
        {
          type: 'equipmentPossession',
          weapon: ['battleaxe', 'handaxe', 'lightHammer', 'warhammer'],
        },
      ],
    },
    {
      name: 'Владение инструментами',
      description:
        'Вы владеете ремесленными инструментами на ваш выбор: инструменты кузнеца, пивовара или каменщика.',
      choices: [
        {
          type: 'select',
          label: 'Владение инструментом',
          options: [
            {
              name: ToolTypeDict.smith,
              effects: [{ type: 'equipmentPossession', tool: ['smith'] }],
            },
            {
              name: ToolTypeDict.brewer,
              effects: [{ type: 'equipmentPossession', tool: ['brewer'] }],
            },
            {
              name: ToolTypeDict.mason,
              effects: [{ type: 'equipmentPossession', tool: ['mason'] }],
            },
          ],
        },
      ],
    },
    {
      name: 'Знание камня',
      // todo: add effect
      description:
        'Если вы совершаете проверку Интеллекта (История), связанную с происхождением работы по камню, вы считаетесь владеющим навыком История, и добавляете к проверке удвоенный бонус мастерства вместо обычного.',
    },
    {
      name: 'Языки',
      description:
        'Вы разговариваете, читаете и пишете на Общем и Дварфском языках. Дварфский язык состоит из твёрдых согласных и гортанных звуков, и этот акцент будет присутствовать в любом языке, на котором дварф будет говорить.',
      effects: [
        {
          type: 'language',
          languages: ['common', 'dwarvish'],
        },
      ],
    },
  ],
})

export const MountainDwarf: CharacterRace = {
  ...CommonDwarf,
  type: 'MountainDwarf',
  image: mountainDwarfImg,
  name: 'Горный дварф',
  description:
    'Смелые и выносливые дварфы известны как опытные воины, шахтёры, камнетёсы и металлурги. Будучи горным дварфом, вы являетесь сильным и выносливым, приспособленным к жизни в суровой местности.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашего Телосложения увеличивается на 2, а значение вашей Силы увеличивается на 2',
      effects: [
        { type: 'ability', abilities: { constitution: 2, strength: 2 } },
      ],
    },
    ...CommonDwarf.features,
    {
      name: 'Владение доспехами дварфов',
      description: 'Вы владеете лёгкими и средними доспехами.',
      effects: [
        {
          type: 'equipmentPossession',
          armor: ['light', 'medium'],
        },
      ],
    },
  ],
}

export const HillDwarf: CharacterRace = {
  ...CommonDwarf,
  type: 'HillDwarf',
  image: hillDwarfImg,
  name: 'Холмовой дварф',
  description:
    'Смелые и выносливые дварфы известны как опытные воины, шахтёры, камнетёсы и металлурги. Будучи холмовым дварфом вы обладаете обострёнными чувствами, развитой интуицией и замечательной стойкостью.',
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашего Телосложения увеличивается на 2, а значение вашей Мудрости увеличивается на 1',
      effects: [{ type: 'ability', abilities: { constitution: 2, wisdom: 1 } }],
    },
    ...CommonDwarf.features,
    {
      name: 'Дварфская выдержка',
      // todo: add effect for this
      description:
        'Максимальное значение ваших хитов увеличивается на 1, и вы получаете 1 дополнительный хит с каждым новым уровнем.',
    },
  ],
}
