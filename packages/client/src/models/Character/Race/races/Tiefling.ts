import { CharacterRace } from 'models/Character/Race/Race'
import tieflingImg from 'models/Character/Race/races/assets/tiefling.jpeg'

export const Tiefling: CharacterRace = {
  type: 'Tiefling',
  name: 'Тифлинг',
  description:
    'Быть тифлингом — значит постоянно натыкаться на пристальные взгляды и перешёптывания, терпеть страдания и оскорбления, видеть страх и недоверие в глазах каждого встречного.',
  size: 'medium',
  image: tieflingImg,
  features: [
    {
      name: 'Увеличение характеристик',
      description:
        'Значение вашего Интеллекта увеличивается на 1, а значение Харизмы увеличивается на 2.',
      effects: [
        { type: 'ability', abilities: { intelligence: 1, charisma: 2 } },
      ],
    },
    {
      name: 'Размер',
      description:
        'Тифлинги по росту и телосложению схожи с людьми. Ваш размер — средний.',
    },
    {
      name: 'Скорость',
      description: 'Ваша базовая скорость передвижения составляет 30 фт.',
      effects: [{ type: 'walkMovement', absolute: 30 }],
    },
    {
      name: 'Тёмное зрение',
      description:
        'Благодаря вашему дьявольскому наследию, вы отлично видите при тускломсвете и в темноте. На расстоянии в 60 фт. вы при тусклом освещении можете видеть так, как будто это яркое освещение, и в темноте так, как будто это тусклое освещение. В темноте вы не можете различать цвета, только оттенки серого.',
      effects: [{ type: 'vision', dark: 60 }],
    },
    {
      name: 'Адское сопротивление',
      description: 'Вы получаете сопротивление к урону огнём.',
      effects: [{ type: 'defence', damages: { fire: 'resistance' } }],
    },
    {
      name: 'Дьявольское наследие',
      // todo: add effect
      description:
        'Вы знаете заклинание чудотворство. При достижении 3 уровня вы можете один раз в день активировать адское возмездие как заклинание 2 уровня. При достижении 5 уровня вы также можете один раз в день активировать заклинание тьма. «Раз в день» означает, что вы должны окончить продолжительный отдых, прежде чем сможете наложить это заклинание ещё раз посредством данного умения. Базовой характеристикой для этих заклинаний является Харизма.',
    },
    {
      name: 'Языки',
      description:
        'Вы можете говорить, читать и писать на Общем и Инфернальном.',
      effects: [{ type: 'language', languages: ['common', 'infernal'] }],
    },
  ],
}
