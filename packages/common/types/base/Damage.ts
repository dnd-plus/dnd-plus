import { DamageDice } from 'common/types/base/Dice'

export type DamageType =
  | 'slashing' // рубящий
  | 'piercing' // колющий
  | 'bludgeoning' // дробящий
  | 'poison' // ядом
  | 'acid' // кислотой
  | 'fire' // огнем
  | 'cold' // холодом
  | 'radiant' // излучением
  | 'necrotic' // некротическая энергия
  | 'lightning' // электрический
  | 'thunder' // звуком
  | 'force' // силовое поле
  | 'psychic' // психическая энергия

export type Damage = Array<
  {
    damageType: DamageType
  } & ({ dice: DamageDice } | { value: number })
>
