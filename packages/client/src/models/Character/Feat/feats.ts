import { Feat } from 'models/Character/Feat/Feat'

export const feats: Feat[] = [
  {
    id: 1,
    nameEn: 'Actor',
    name: 'Артистичный',
    source: 'PHB',
    type: 'general',
    description: `
Научившись театральному искусству и подражанию, вы получаете следующие преимущества:

*   Увеличьте значение Харизмы на 1, при максимуме 20.
*   Вы совершаете с преимуществом проверки Харизмы (Выступление) и Харизма (Обман), когда пытаетесь выдать себя за кого-то другого.
*   Вы можете подражать речи кого-то другого, а также звукам, издаваемым другими существами. Перед этим вы должны как минимум в течение 1 минуты слышать чужую речь или звуки существа. Успешная проверка Мудрости (Проницательность), противопоставленная вашей проверке Харизмы (Обман), позволяет слушающему понять, что источник звука не настоящий.
`,
  },
  {
    id: 2,
    nameEn: 'Athlete',
    name: 'Атлетичный',
    source: 'PHB',
    type: 'general',
    description: `
Вы прошли интенсивную физическую подготовку и получаете следующие преимущества:

*   Увеличьте значение Силы или Ловкости на 1, при максимуме 20.
*   Если вы лежите ничком, вставание использует только 5 футов перемещения.
*   Лазание не заставляет вас тратить дополнительное перемещение.
*   Вы можете совершать прыжок в длину или высоту с разбега, переместившись только на 5 футов, а не на 10.
`,
  },
  {
    id: 3,
    nameEn: 'Alert',
    name: 'Бдительный',
    source: 'PHB',
    type: 'general',
    description: `
Вы всегда готовы к опасностям и получаете следующие преимущества:

*   Вы получаете бонус +5 к проверкам инициативы.
*   Вас не могут застать врасплох, пока вы в сознании.
*   Другие существа не получают преимущество для бросков атаки по вам за то, что они скрыты от вас.
`,
  },
  {
    id: 4,
    nameEn: 'Charger',
    name: 'Налётчик',
    source: 'PHB',
    type: 'general',
    description: `
Когда вы используете действие Рывок, вы можете бонусным действием совершить одну рукопашную атаку оружием или оттолкнуть другое существо.

Если вы перед совершением этого бонусного действия переместились минимум на 10 футов по прямой линии, вы либо получаете бонус +5 к броску урона этой атаки (если вы решили совершить рукопашную атаку и попали), либо толкаете цель на 10 футов от себя (если решили толкать и преуспели).
`,
  },
  {
    id: 5,
    nameEn: 'Defensive Duelist',
    name: 'Оборонительный дуэлянт',
    source: 'PHB',
    type: 'general',
    description:
      'Если вы используете оружие со свойством «фехтовальное», которым владеете, и другое существо попадает по вам рукопашной атакой, вы можете для этой атаки реакцией добавить бонус мастерства к КД, что потенциально может привести к промаху атаки.',
    demands: {
      text: 'Ловкость 13 или выше',
      conditions: [{ abilities: { dexterity: 13 } }],
    },
  },
  {
    id: 6,
    nameEn: 'Dual Wielder',
    name: 'Использование двух оружий',
    source: 'PHB',
    type: 'general',
    description: `
Вы знаете как использовать сразу два оружия, и получаете следующие преимущества:

*   Вы получаете бонус +1 к КД, когда держите в каждой руке по рукопашному оружию.
*   Вы можете использовать сражение с двумя оружиями даже если ни у одного из ваших одноручных оружий нет свойства «лёгкое».
*   Вы можете вынимать и убирать два одноручных оружия когда обычно позволяется вынуть или убрать только одно.
`,
  },
  {
    id: 7,
    nameEn: 'Dungeon Delver',
    name: 'Исследователь подземелий',
    source: 'PHB',
    type: 'general',
    description: `
Научившись искать скрытые ловушки и потайные двери в подземельях, вы получаете следующие преимущества:

*   Вы совершаете с преимуществом проверки Мудрости (Внимательность) и Интеллекта (Анализ), совершённые для обнаружения потайных дверей.
*   Вы совершаете с преимуществом спасброски для избегания ловушек и сопротивления их эффектам.
*   Вы получаете сопротивление к урону от ловушек.
*   Вы можете искать ловушки, идя с обычной скоростью, а не медленной.
`,
  },
  {
    id: 8,
    nameEn: 'Durable',
    name: 'Стойкий',
    source: 'PHB',
    type: 'general',
    description: `
Вы стойкий и живучий, и получаете следующие преимущества:

*   Увеличьте значение Телосложения на 1, при максимуме 20.
*   Когда вы бросаете Кость Хитов для восстановления хитов, минимум равен удвоенному модификатору Телосложения (минимум 2).
`,
  },
  {
    id: 9,
    nameEn: 'Elemental Adept',
    name: 'Стихийный адепт',
    source: 'PHB',
    type: 'general',
    description: `
Когда вы получаете эту черту, выберите один из видов урона: звук, кислота, огонь, холод или электричество.

Накладываемые вами заклинания игнорируют сопротивление к выбранному виду урона. Кроме того, когда вы определяете урон от наложенного вами заклинания, причиняющего урон этого вида, вы можете считать все выпавшие на костях «1» как «2».

Вы можете брать эту черту несколько раз. Каждый раз, когда вы это делаете, вы выбираете новый вид урона.
`,
    demands: {
      text: 'Способность накладывать хотя бы одно заклинание',
      conditions: [{ spellCasting: true }],
    },
  },
  {
    id: 10,
    nameEn: 'Grappler',
    name: 'Борец',
    source: 'PHB',
    type: 'general',
    description: `
Вы развили навыки, нужные для тесного захвата противников. Вы получаете следующие преимущества:

*   Вы совершаете с преимуществом броски атаки по существу, которое держите в захвате.
*   Вы можете действием попытаться скрутить захваченное вами существо. Для этого совершите ещё одну проверку захвата. В случае успеха и вы и это существо становитесь опутанными до окончания захвата.
`,
    demands: {
      text: 'Сила 13 или выше',
      conditions: [{ abilities: { strength: 13 } }],
    },
  },
  {
    id: 11,
    nameEn: 'Great Weapon Master',
    name: 'Мастер большого оружия',
    source: 'PHB',
    type: 'general',
    description: `
Вы научились использовать вес своего оружия, позволяя инерции усиливать ваши атаки. Вы получаете следующие преимущества:

*   В свой ход, когда вы совершаете критическое попадание рукопашным оружием или опускаете им хиты существа до 0, вы можете бонусным действием совершить одну атаку рукопашным оружием.
*   Перед совершением атаки рукопашным оружием со свойством «тяжёлое», которым вы владеете, вы можете принять штраф −5 к броску атаки. Если такая атака попадает, вы добавляете +10 к урону от этой атаки.
`,
  },
  {
    id: 12,
    nameEn: 'Healer',
    name: 'Лекарь',
    source: 'PHB',
    type: 'general',
    description: `
Вы способный медик, что позволяет быстро залечивать раны и возвращать союзников в строй. Вы получаете следующие преимущества:

*   Когда вы используете комплект целителя для стабилизации умирающего существа, это существо также восстанавливает 1 хит.
*   Вы можете действием потратить одно использование комплекта целителя, чтобы позаботиться о существе и восстановить ему 1к6 + 4 хита, плюс дополнительные хиты, равные максимальному значению его Кости Хитов. Это существо не сможет повторно восстанавливать хиты от этой черты, пока не закончит короткий или продолжительный отдых.
`,
  },
  {
    id: 13,
    nameEn: 'Inspiring Leader',
    name: 'Воодушевляющий лидер',
    source: 'PHB',
    type: 'general',
    description:
      'Вы можете потратить 10 минут на воодушевление спутников, укрепляя их решимость. Если вы делаете это, выберите до шести дружественных существ (можете включить себя) в пределах 30 футов от себя, которые могут видеть или слышать вас, и которые могут вас понять. Все эти существа получают временные хиты в количестве, равном вашему уровню + ваш модификатор Харизмы. Существа больше не могут получать временные хиты от этой черты, пока не окончат короткий или продолжительный отдых.',
    demands: {
      text: 'Харизма 13 или выше',
      conditions: [{ abilities: { charisma: 13 } }],
    },
  },
  {
    id: 14,
    nameEn: 'Keen Mind',
    name: 'Отличная память',
    source: 'PHB',
    type: 'general',
    description: `
Вы с невероятной точностью можете отслеживать время, направление и подробности. Вы получаете следующие преимущества:

*   Увеличьте значение Интеллекта на 1, при максимуме 20.
*   Вы всегда знаете, в какой стороне находится север.
*   Вы всегда знаете, через сколько часов наступит следующий закат или восход.
*   Вы можете с точностью вспомнить всё, что видели или слышали за последний месяц.
`,
  },
  {
    id: 15,
    nameEn: 'Linguist',
    name: 'Языковед',
    source: 'PHB',
    type: 'general',
    description: `
Вы изучали языки и способы кодирования текстов, и получаете следующие преимущества:

*   Увеличьте значение Интеллекта на 1, при максимуме 20.
*   Вы узнаёте три языка на свой выбор.
*   Вы можете писать шифрованные письма. Другие не могут расшифровать код, пока либо вы не научите их, либо они не преуспеют в проверке Интеллекта (Сл равна вашему значению Интеллекта + ваш бонус Мастерства), либо они не используют для расшифровки магию.
`,
  },
  {
    id: 16,
    nameEn: 'Lucky',
    name: 'Везунчик',
    source: 'PHB',
    type: 'general',
    description: `
Вам непонятным образом везёт как раз тогда, когда это нужно.

У вас есть 3 единицы удачи. Каждый раз, когда вы совершаете бросок атаки, проверку характеристики или спасбросок, вы можете потратить одну единицу удачи, чтобы бросить дополнительный к20. Вы можете решить потратить единицу удачи после обычного броска кости, но до определения последствий. После этого вы сами выбираете, какую к20 использовать для броска атаки, проверки характеристики или спасброска.

Вы также можете потратить одну единицу удачи, когда по вам совершается бросок атаки. Бросьте к20, а потом решите, какую из костей будет использовать атакующий, вашу или свою.

Если сразу несколько существ тратят единицы удачи для оказания влияния на один бросок, единицы отменяют друг друга и дополнительные кости никто не кидает.

Вы восстанавливаете потраченные единицы удачи в конце продолжительного отдыха.
`,
  },
  {
    id: 17,
    nameEn: 'Mage Slayer',
    name: 'Убийца магов',
    source: 'PHB',
    type: 'general',
    description: `
Вы разработали техники, полезные в рукопашном сражении с заклинателями, и получаете следующие преимущества:

*   Если существо в пределах 5 футов от вас использует заклинание, вы можете реакцией совершить атаку рукопашным оружием по этому существу.
*   Когда вы причиняете урон существу, концентрирующемуся на заклинании, это существо совершает с помехой спасбросок для поддержания концентрации.
*   Вы совершаете с преимуществом спасброски от заклинаний, наложенных существами, находящимися в пределах 5 футов от вас.
`,
  },
  {
    id: 18,
    nameEn: 'Magic Initiate',
    name: 'Посвящённый в магию',
    source: 'PHB',
    type: 'general',
    description: `
Выберите класс: бард, волшебник, друид, жрец, колдун или чародей. Вы узнаёте два заговора на свой выбор из списка заклинаний этого класса.

Кроме того, выберите одно заклинание 1 уровня из этого же списка. Вы узнаёте это заклинание и можете накладывать его на минимально возможном уровне. После использования заклинания вы должны закончить продолжительный отдых, прежде чем сможете снова использовать его этой чертой.

Базовая характеристика для этих заклинаний зависит от выбранного класса: Харизма для барда, колдуна и чародея; Интеллект для волшебника; Мудрость для друида и жреца.
`,
  },
  {
    id: 19,
    nameEn: 'Martial Adept',
    name: 'Воинский адепт',
    source: 'PHB',
    type: 'general',
    description: `
Вы прошли военную подготовку, позволяющую совершать особые боевые приёмы. Вы получаете следующие преимущества:

*   Вы узнаёте два приёма на свой выбор из списка архетипа воина Мастер боевых искусств. Если приём требует, чтобы цель совершила спасбросок для сопротивления эффекту приёма, Сл спасброска равна 8+ ваш бонус мастерства + модификатор Силы или Ловкости (на ваш выбор).
*   Если у вас уже есть кости превосходства, вы получаете ещё одну; в противном случае вы получаете одну кость превосходства: к6. Эта кость подпитывает ваши приёмы. Кость превосходства тратится, когда вы её используете, и восстанавливается после окончания короткого или продолжительного отдыха. Эта кость превосходства останется у вас даже если позже вы получите новые кости из другого источника.
`,
  },
  {
    id: 20,
    nameEn: 'Mobile',
    name: 'Подвижный',
    source: 'PHB',
    type: 'general',
    description: `
Вы невероятно быстры и ловки. Вы получаете следующее преимущество:

*   Ваша скорость увеличивается на 10 футов.
*   Когда вы используете действие Рывок, труднопроходимая местность в этом ходу не замедляет ваше перемещение.
*   Если вы совершаете рукопашную атак по существу, вы до конца этого хода не провоцируете от него атаки, вне зависимости от того, попадёте или нет.
`,
  },
  {
    id: 21,
    nameEn: 'Mounted Combatant',
    name: 'Верховой боец',
    source: 'PHB',
    type: 'general',
    description: `
Вы — опасный враг, когда вы верхом на скакуне. Если вы находитесь верхом и не выведены из строя, вы получаете следующие преимущества:

*   Вы совершаете с преимуществом броски рукопашных атак по существам, чей размер меньше вашего скакуна, и не находящимся при этом верхом.
*   Вы можете сделать так, что атака, нацеленная на вашего скакуна, будет перенацелена на вас.
*   Если ваш скакун попадает под эффект, позволяющий совершить спасбросок Ловкости для получения половины урона, то он не получает урон в случае успеха и получает всего половину урона при провале.
`,
  },
  {
    id: 22,
    nameEn: 'Observant',
    name: 'Внимательный',
    source: 'PHB',
    type: 'general',
    description: `
Вы быстро улавливаете мелкие подробности и получаете следующие преимущества:

*   Увеличьте значение Интеллекта или Мудрости на 1, при максимуме 20.
*   Если вы видите рот существа, когда оно говорит на языке, который вы понимаете, вы можете прочитать по его губам, что оно говорит.
*   Вы получаете бонус +5 к пассивной проверке Мудрости (Внимательность) и пассивной проверке Интеллекта (Анализ).
`,
  },
  {
    id: 23,
    nameEn: 'Resilient',
    name: 'Устойчивый',
    source: 'PHB',
    type: 'general',
    description: `
Выберите одну характеристику. Вы получаете следующие преимущества:

Увеличьте значение выбранной характеристики на 1, при максимуме 20.

Вы получаете владение спасбросками этой характеристики.
`,
  },
  {
    id: 24,
    nameEn: 'Ritual Caster',
    name: 'Ритуальный заклинатель',
    source: 'PHB',
    type: 'general',
    description: `
Вы узнали несколько заклинаний, которые можете накладывать как ритуалы. Эти заклинания записаны в ритуальной книге, которую вы должны держать в руке во время их использования.

Когда вы выбираете эту черту, вы получаете ритуальную книгу, содержащую два заклинания 1 уровня на ваш выбор. Выберите один из классов: бард, волшебник, друид, жрец, колдун или чародей. Вы должны выбирать заклинания из списков для этого класса, но у этих заклинаний должно быть ключевое слово «ритуал». Выбранный класс также определяет базовую характеристику для этих заклинаний: Харизма для барда, колдуна и чародея; Интеллект для волшебника; Мудрость для друида и жреца.
`,
    demands: {
      text: 'Интеллект или Мудрость 13 или выше',
      conditions: [
        { abilities: { intelligence: 13 } },
        { abilities: { wisdom: 13 } },
      ],
    },
  },
  {
    id: 25,
    nameEn: 'Savage Attacker',
    name: 'Дикий атакующий',
    source: 'PHB',
    type: 'general',
    description:
      'Один раз в ход, когда вы совершаете бросок урона для атаки рукопашным оружием, вы можете перебросить все кости урона оружия и использовать любой из вариантов.',
  },
  {
    id: 26,
    nameEn: 'Sentinel',
    name: 'Страж',
    source: 'PHB',
    type: 'general',
    description: `
Вы овладели техникой, позволяющей пользоваться всеми брешами в обороне противника, и получаете следующие преимущества:

*   Если вы попадаете по существу провоцированной атакой, скорость этого существа падает до 0 до конца текущего хода.
*   Существа перед выходом из вашей досягаемости провоцируют от вас атаки, даже если совершают действие Отход.
*   Если существо, находящееся в пределах 5 футов от вас, совершает атаку не по вам (и у цели нет этой черты), вы можете реакцией совершить атаку рукопашным оружием по атакующему.
`,
  },
  {
    id: 27,
    nameEn: 'Sharpshooter',
    name: 'Меткий стрелок',
    source: 'PHB',
    type: 'general',
    description: `
Вы овладели дальнобойным оружием и можете совершать выстрелы, которые другие считали невозможными. Вы получаете следующие преимущества:

*   Совершение атаки в пределах максимальной дистанции не вызывает помеху к броску атаки дальнобойным оружием.
*   Ваши атаки дальнобойным оружием игнорируют укрытие на половину и укрытие на три четверти.
*   Перед совершением атаки дальнобойным оружием, которым вы владеете, вы можете принять штраф −5 к броску атаки. Если такая атака попадает, вы добавляете +10 к урону от этой атаки.
`,
  },
  {
    id: 28,
    nameEn: 'Skilled',
    name: 'Одарённый',
    source: 'PHB',
    type: 'general',
    description:
      'Вы получаете владение любой комбинацией из трёх навыков и инструментов на ваш выбор.',
  },
  {
    id: 29,
    nameEn: 'Skulker',
    name: 'Проныра',
    source: 'PHB',
    type: 'general',
    description: `
Вы знаете, как сливаться с тенями. Вы получаете следующие преимущества:

*   Вы можете попытаться спрятаться даже если слабо заслонены от существа, от которого прячетесь.
*   Если вы прячетесь от существа и промахиваетесь по нему атакой дальнобойным оружием, эта атака не выдаёт вашу позицию.
*   Тусклый свет не причиняет помеху вашим проверкам Мудрости (Внимательность), полагающимся на зрение.
`,
    demands: {
      text: 'Ловкость 13 или выше',
      conditions: [{ abilities: { dexterity: 13 } }],
    },
  },
  {
    id: 30,
    nameEn: 'Spell Sniper',
    name: 'Меткие заклинания',
    source: 'PHB',
    type: 'general',
    description: `
Вы узнали технику, улучшающую атаку некоторыми видами заклинаний, и получаете следующие преимущества:

*   Если вы накладываете заклинание, требующее совершение броска атаки, дистанция заклинания удваивается.
*   Ваши дальнобойные атаки заклинаниями игнорируют укрытие на половину и укрытие на три четверти.
*   Вы узнаёте один заговор, требующий броска атаки. Выберите заговор из списка заклинаний барда, волшебника, друида, жреца, колдуна или чародея. Базовая характеристика для этого заговора зависит от выбранного класса: Харизма для барда, колдуна и чародея; Интеллект для волшебника; Мудрость для друида и жреца.
`,
    demands: {
      text: 'Способность накладывать хотя бы одно заклинание',
      conditions: [{ spellCasting: true }],
    },
  },
  {
    id: 31,
    nameEn: 'Tough',
    name: 'Крепкий',
    source: 'PHB',
    type: 'general',
    description:
      'Максимум ваших хитов увеличивается на количество, равное удвоенному уровню, на котором берётся эта черта. Каждый раз, когда вы впоследствии будете получать уровень, максимум ваших хитов будет дополнительно увеличиваться на 2.',
  },
  {
    id: 32,
    nameEn: 'War Caster',
    name: 'Боевой заклинатель',
    source: 'PHB',
    type: 'weapon',
    description: `
Вы научились накладывать заклинания в пылу сражения и узнали техники, дающие следующие преимущества:

*   Вы совершаете с преимуществом спасброски Телосложения для поддержания концентрации на заклинании при получении урона.
*   Вы можете выполнять телесный компонент заклинаний даже если используете оружие или щит в одной или обеих руках.
*   Если перемещение враждебного существа провоцирует от вас атаку, вы можете вместо совершения провоцированной атаки реакцией наложить на это существо заклинание. Время накладывания этого заклинания должно быть «1 действие» и оно должно нацеливаться только на это существо.
`,
    demands: {
      text: 'Способность накладывать хотя бы одно заклинание',
      conditions: [{ spellCasting: true }],
    },
  },
  {
    id: 33,
    nameEn: 'Crossbow Expert',
    name: 'Эксперт в арбалетах',
    source: 'PHB',
    type: 'weapon',
    description: `
Благодаря обширной практике с арбалетом вы получаете следующие преимущества:

*   Вы игнорируете свойство «перезарядка» у арбалетов, которыми владеете.
*   Нахождение в пределах 5 футов от враждебного существа не накладывает помеху к вашим броскам дальнобойной атаки.
*   Когда вы используете действие Атака и атакуете одноручным оружием, вы можете бонусным действием атаковать заряженным ручным арбалетом, находящимся в руке.
`,
  },
  {
    id: 34,
    nameEn: 'Polearm Master',
    name: 'Мастер древкового оружия',
    source: 'PHB',
    type: 'weapon',
    description: `
Вы можете сдерживать врагов оружием со свойством «досягаемость». Вы получаете следующие преимущества:

*   Если вы совершаете действие Атака и атакуете только алебардой, боевым посохом или глефой, вы можете бонусным действием совершить рукопашную атаку противоположным концом оружия. Кость урона для этой атаки равна к4, и атака причиняет дробящий урон. Бонусная атака использует модификатор той же характеристики, что и основная.
*   Если вы используете алебарду, боевой посох, глефу или пику, другие существа провоцируют от вас атаку, когда входят в пределы вашей досягаемости.
`,
  },
  {
    id: 35,
    nameEn: 'Shield Master',
    name: 'Мастер щитов',
    source: 'PHB',
    type: 'weapon',
    description: `
Вы используете щиты не только для обороны, но и для нападения. Вы получаете следующие преимущества, когда используете щит:

*   Если вы в свой ход совершаете действие Атака, вы можете бонусным действием попытаться оттолкнуть щитом существо, находящееся в пределах 5 футов от вас.
*   Если вы не выведены из строя, вы можете добавлять бонус к КД от щита ко всем спасброскам Ловкости, совершённым от заклинаний и прочих вредоносных эффектов, нацеленных только на вас.
*   Если вы подвергаетесь действию эффекта, позволяющего совершить спасбросок Ловкости для получения половины урона, вы можете реакцией вообще не получить урон в случае успешного спасброска, выставив щит между собой и источником эффекта.
`,
  },
  {
    id: 36,
    nameEn: 'Tavern Brawler',
    name: 'Драчун',
    source: 'PHB',
    type: 'weapon',
    description: `
Привыкнув к мордобою с использованием подручных предметов, вы получаете следующие преимущества:

*   Увеличьте значение Силы или Телосложения на 1, при максимуме 20.
*   Вы получаете владение импровизированным оружием.
*   Ваш безоружный удар использует для урона к4.
*   Если вы в свой ход попадаете по существу безоружным ударом или импровизированным оружием, вы можете бонусным действием попытаться захватить цель.
`,
  },
  {
    id: 37,
    nameEn: 'Weapon Master',
    name: 'Мастер оружия',
    source: 'PHB',
    type: 'weapon',
    description: `
Вы знаете как пользоваться множеством видов оружия и получаете следующие преимущества:

*   Увеличьте значение Силы или Ловкости на 1, при максимуме 20.
*   Вы получаете владение четырьмя выбранными видами оружия. Выбранное оружие должно быть или простым или воинским.
`,
  },
  {
    id: 38,
    nameEn: 'Lightly Armored',
    name: 'Знаток лёгких доспехов',
    source: 'PHB',
    type: 'armor',
    description: `
Вы обучились ношению лёгких доспехов и получаете следующие преимущества:

*   Увеличьте значение Силы или Ловкости на 1, при максимуме 20.
*   Вы получаете владение лёгкими доспехами.
`,
  },
  {
    id: 39,
    nameEn: 'Moderately Armored',
    name: 'Знаток средних доспехов',
    source: 'PHB',
    type: 'armor',
    description: `
Вы обучились ношению средних доспехов и щитов, и получаете следующие преимущества:

*   Увеличьте значение Силы или Ловкости на 1, при максимуме 20.
*   Вы получаете владение средними доспехами и щитами.
`,
    demands: {
      text: 'Владение лёгкими доспехами',
      conditions: [{ armorPossession: 'light' }],
    },
  },
  {
    id: 40,
    nameEn: 'Medium Armor Master',
    name: 'Мастер средних доспехов',
    source: 'PHB',
    type: 'armor',
    description: `
Вы привыкли к перемещению в средних доспехах и получаете следующие преимущества:

*   Ношение среднего доспеха не накладывает помеху к проверкам Ловкости (Скрытность).
*   Когда вы носите средний доспех, вы можете добавлять к КД 3, а 2, если ваша Ловкость 16 или выше.
`,
    demands: {
      text: 'Владение средними доспехами',
      conditions: [{ armorPossession: 'medium' }],
    },
  },
  {
    id: 41,
    nameEn: 'Heavily Armored',
    name: 'Знаток тяжёлых доспехов',
    source: 'PHB',
    type: 'armor',
    description: `
Вы обучились ношению тяжёлых доспехов и получаете следующие преимущества:

*   Увеличьте значение Силы на 1, при максимуме 20.
*   Вы получаете владение тяжёлыми доспехами.
`,
    demands: {
      text: 'Владение средними доспехами',
      conditions: [{ armorPossession: 'medium' }],
    },
  },
  {
    id: 42,
    nameEn: 'Heavy Armor Master',
    name: 'Мастер тяжёлых доспехов',
    source: 'PHB',
    type: 'armor',
    description: `
Вы можете своим доспехом отклонять удары, которые других убили бы. Вы получаете следующие преимущества:

*   Увеличьте значение Силы на 1, при максимуме 20.
*   Если вы носите тяжёлый доспех, дробящий, колющий и рубящий урон, получаемый вами от немагического оружия, уменьшается на 3.
`,
    demands: {
      text: 'Владение тяжёлыми доспехами',
      conditions: [{ armorPossession: 'heavy' }],
    },
  },
  {
    id: 43,
    nameEn: 'Bountiful Luck',
    name: 'Бездонная удача',
    source: 'XGTE',
    type: 'racial',
    description: `
Ваш народ обладает исключительной удачей, которой вы научились мистическим образом делиться со своими компаньонами, когда вы видите, что они не справляются. Вы не понимаете, как это работает, вы просто хотите, и это происходит. Определенно это знак покровительства удачи!

Когда союзник, которого вы видите в пределах 30 футов от вас, выбрасывает 1 на к20 для броска атаки, проверки способности или спасброска, вы можете использовать реакцию и позволить союзнику перебросить кубик. Союзник обязан использовать новый результат.

После использования этой способности вы не можете использовать вашу расовую черту Удачливый до конца вашего следующего хода.
`,
    demands: {
      text: 'Полурослик',
      conditions: [{ race: 'Halfling' }],
    },
  },
  {
    id: 44,
    nameEn: 'Dragon Fear',
    name: 'Драконий страх',
    source: 'XGTE',
    type: 'racial',
    description: `
Когда вы злитесь, то излучаете угрозу. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Силы, Телосложения или Харизмы на 1 при максимуме 20.
*   Вместо выдоха разрушительной энергии, вы можете использовать вашу черту Оружие Дыхания, чтобы издать рык, заставляя всех выбранных вами существ в пределах 30 футов от вас сделать спасбросок Мудрости (Сл 8 + бонус мастерства + модификатор Харизмы). Цель автоматически проходит спасбросок, если она не может слышать или видеть вас. При провале броска цель становится напуганной вами на 1 минуту. Если напуганная цель получает урон, то она может повторить спасбросок, оканчивая эффект на себе при успехе.
`,
    demands: {
      text: 'Драконорожденный',
      conditions: [{ race: 'Dragonborn' }],
    },
  },
  {
    id: 45,
    nameEn: 'Dragon Hide',
    name: 'Драконья шкура',
    source: 'XGTE',
    type: 'racial',
    description: `
У вас появляются чешуя и когти, напоминающие таковые у вашего драконьего предка. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Силы, Телосложения или Харизмы на 1 при максимуме 20.
*   Ваша чешуя становится твёрже. Пока вы не носите броню, ваш КД равен 13 + модификатор Ловкости. Вы можете использовать щит продолжая получать это преимущество.
*   Вы отращиваете втягивающиеся когти на кончиках ваших пальцев. Вытягивание или втягивание их не требует траты каких-либо действий. Эти когти являются естественным оружием, которым вы можете совершать безоружные удары. Если вы попадете такой атакой, то наносите 1к4 + модификатор Силы рубящего урона вместо обычного дробящего урона для безоружного удара.
`,
    demands: {
      text: 'Драконорожденный',
      conditions: [{ race: 'Dragonborn' }],
    },
  },
  {
    id: 46,
    nameEn: 'Drow High Magic',
    name: 'Высшая магия дроу',
    source: 'XGTE',
    type: 'racial',
    description: `
Вы изучаете магию, присущую тёмным эльфам.

Вы изучаете заклинание обнаружение магии и можете свободно сотворять его без затрат ячеек заклинаний. Вы также изучаете заклинания левитация и рассеивание магии , каждое из которых вы можете сотворить один раз без затрат ячеей заклинаний. Вы восстанавливаете возможность сотворять эти два заклинания таким способом после продолжительного отдыха. Харизма – базовая характеристика для этих трёх заклинаний.
`,
    demands: {
      text: 'Эльф (дроу)',
      conditions: [{ race: 'EladrinElf' }],
    },
  },
  {
    id: 47,
    nameEn: 'Dwarven Fortitude',
    name: 'Дварфийская стойкость',
    source: 'XGTE',
    type: 'racial',
    description: `
p>В ваших венах течет кровь героев дварфов. Вы получаете следующие преимущества:

*   Увеличьте значение вашего Телосложения на 1 при максимуме 20.
*   Когда в битве вы применяете действие Уклонение, вы можете потратить Кость Хитов чтобы вылечить себя. Бросьте кость, добавьте модификатор Телосложения и восстановите хиты в количестве, равном полученному значению (минимум 1).
`,
    demands: {
      text: 'Дварф',
      conditions: [{ race: 'Dwarf' }],
    },
  },
  {
    id: 48,
    nameEn: 'Elven Accuracy',
    name: 'Эльфийская точность',
    source: 'XGTE',
    type: 'racial',
    description: `
Точность эльфов легендарна, особенно это касается эльфийских лучников и заклинателей. Вы обладаете сверхъестественной меткостью, когда дело касается атак, требующих меткости, а не грубой силы. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Ловкости, Интеллекта, Мудрости или Харизмы на 1 при максимуме 20.
*   Когда у вас есть преимущество на бросок атаки, использующей Ловкость, Интеллект, Мудрость или Харизму, вы можете перебросить один из кубов один раз.
`,
    demands: {
      text: 'Эльф или полуэльф',
      conditions: [{ race: 'Elf' }, { race: 'HalfElf' }],
    },
  },
  {
    id: 49,
    nameEn: 'Fade Away',
    name: 'Исчезновение',
    source: 'XGTE',
    type: 'racial',
    description: `
Ваш народ искусно владеет магией иллюзий. Вы выучили магический трюк, чтобы исчезать, когда вам наносят урон. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Ловкости или Интеллекта на 1 при максимуме 20.
*   Сразу же после получения урона вы можете использовать реакцию, чтобы стать невидимым до конца своего следующего хода, либо пока не совершите атаку, не нанесете урон или не заставите кого-нибудь совершать спасбросок. Использовав эту способность, вы не сможете использовать её вновь, пока не совершите короткий или продолжительный отдых.
`,
    demands: {
      text: 'Гном',
      conditions: [{ race: 'Gnome' }],
    },
  },
  {
    id: 50,
    nameEn: 'Fey Teleportation',
    name: 'Телепортация фей',
    source: 'XGTE',
    type: 'racial',
    description: `
Изучение знаний высших эльфов открыло вам силу фей, которой владеют немногие эльфы, за исключением ваших собратьев эладринов. Опираясь на свое родство с феями, вы можете на мгновение пройти через Страну Фей, сократив свой путь. Вы получаете следующие преимущества:

*   Увеличьте значение вашего Интеллекта или Харизмы на 1 при максимуме 20.
*   Вы изучаете как читать, говорить и писать на Сильване.
*   Вы изучаете заклинание туманный шаг и можете сотворить его один раз без использования ячейки заклинания. Вы восстанавливаете способность сотворять его таким образом, когда завершаете короткий или продолжительный отдых. Интеллект – базовая характеристика для этого Заклинания.
`,
    demands: {
      text: 'Эльф (высший)',
      conditions: [{ race: 'HighElf' }],
    },
  },
  {
    id: 51,
    nameEn: 'Flames of Phlegethos',
    name: 'Пламя Флегетоса',
    source: 'XGTE',
    type: 'racial',
    description: `
Вы научились призывать адский огонь, и он вас слушается. Вы получаете следующие преимущества:

*   Увеличьте значение вашего Интеллекта или Харизмы на 1 при максимуме 20.
*   Когда вы делаете бросок урона огнём, который наносит ваше заклинание, вы можете перебросить любые 1 на костях урона огнём, но должны использовать новые результаты, даже если они тоже будут 1.
*   Когда вы колдуете заклинание, которое наносит урон огнём, вы можете заставить пламя окутать вас до конца вашего следующего хода. Огонь не причиняет урон вам и вашим вещам, а также излучает яркий свет на 30 футов и тусклый свет еще на 30 футов. Пока пламя существует, все существа в радиусе 5 футов получают 1д4 урона огнём, если попадают по вам рукопашной атакой.
`,
    demands: {
      text: 'Тифлинг',
      conditions: [{ race: 'Tiefling' }],
    },
  },
  {
    id: 52,
    nameEn: 'Infernal Constitution',
    name: 'Инфернальное телосложение',
    source: 'XGTE',
    type: 'racial',
    description: `
Кровь исчадий сильна в вас и даёт вам сопротивления, которыми обладают некоторые исчадия. Вы получаете следующие преимущества:

*   Увеличьте значение вашего Телосложения на 1 при максимуме 20.
*   Вы получаете сопротивление к урону холодом и ядом.
*   Вы получаете преимущество на спасброски против эффектов, делающих вас отравленным.
`,
    demands: {
      text: 'Тифлинг',
      conditions: [{ race: 'Tiefling' }],
    },
  },
  {
    id: 53,
    nameEn: 'Orcish Fury',
    name: 'Орочье буйство',
    source: 'XGTE',
    type: 'racial',
    description: `
Ваша ярость неутомимо горит внутри вас. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Силы или Телосложения на 1 при максимуме 20.
*   Когда вы попадаете атакой простым или воинским оружием, вы можете кинуть одну кость оружия ещё раз и добавить результат в качестве дополнительного урона того же типа, что и у оружия. Использовав эту способность, вы не можете использовать её вновь, пока не завершите короткий или продолжительный отдых.
*   Сразу же после использования черты Непоколебимая Стойкость вы можете использовать реакцию для нанесения одной атаки оружием.
`,
    demands: {
      text: 'Полуорк',
      conditions: [{ race: 'HalfOrc' }],
    },
  },
  {
    id: 54,
    nameEn: 'Prodigy',
    name: 'Вундеркинд',
    source: 'XGTE',
    type: 'racial',
    description: `
У вас дар к освоению новых знаний. Вы получаете следующие преимущества:

*   Вы получаете владение одним навыком на выбор, владение одним набором инструментов на выбор и обучаетесь бегло говорить на одном языке по выбору.
*   Выберете один навык, которым уже владеете. Вы получаете компетентность в этом навыке, что удваивает ваш бонус мастерства для любой проверки характеристик с использованием этого навыка. Навык, который вы выбираете, не может быть уже удвоен от другой черты, такой как Компетентность.
`,
    demands: {
      text: 'Полуэльф, Полуорк или Человек',
      conditions: [{ race: 'HalfElf' }, { race: 'HalfOrc' }, { race: 'Human' }],
    },
  },
  {
    id: 55,
    nameEn: 'Second Chance',
    name: 'Второй шанс',
    source: 'XGTE',
    type: 'racial',
    description: `
Удача улыбается вам, когда кто-то пытается ударить вас. Вы получаете следующие преимущества:

*   Увеличьте значение вашей Ловкости, Телосложения или Харизмы на 1 при максимуме 20.
*   Когда существо, которое вы видите, попадает по вам броском атаки, вы можете использовать реакцию, чтобы заставить врага перебросить этот бросок. После применения этой способности вы не сможете использовать её вновь до броска инициативы в начале боя либо пока не завершите короткий или продолжительный отдых.
`,
    demands: {
      text: 'Полурослик',
      conditions: [{ race: 'Halfling' }],
    },
  },
  {
    id: 56,
    nameEn: 'Squat Nimbleness',
    name: 'Низкорослое проворство',
    source: 'XGTE',
    type: 'racial',
    description: `
Вы необычайно проворны для вашей расы. Вы получаете следующие выгоды:

*   Увеличьте значение вашей Силы или Ловкости на 1 при максимуме 20.
*   Ваша скорость увеличивается на 5 футов.
*   Вы получаете владение Акробатикой или Атлетикой (на ваш выбор).
*   Вы получаете преимущество на броски Силы (Атлетика) или Ловкости (Акробатика), которые делаете, чтобы выбраться из захвата.
`,
    demands: {
      text: 'Дварф или Маленькая раса',
      conditions: [{ race: 'Dwarf' }, { size: 'small' }],
    },
  },
  {
    id: 57,
    nameEn: 'Wood Elf Magic',
    name: 'Магия лесных эльфов',
    source: 'XGTE',
    type: 'racial',
    description:
      'Вы изучаете магию первобытных лесов, которые почитаются и защищаются вашим народом. Вы изучаете один заговор друидов на ваш выбор. Вы также изучаете заклинания скороход и бесследное передвижение, каждое из которых вы можете сотворить один раз не тратя ячейку заклинаний. Вы восстанавливаете способность сотворять их таким образом в конце продолжительного отдыха. Мудрость – базовая характеристика для этих трёх заклинаний.',
    demands: {
      text: 'Эльф (лесной)',
      conditions: [{ race: 'WoodElf' }],
    },
  },
]
