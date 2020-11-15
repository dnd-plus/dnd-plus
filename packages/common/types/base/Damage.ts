import { DamageDice } from 'common/types/base/Dice'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

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

export type Heal = OneOfOptionalRequired<{
  dice?: DamageDice
  value?: number
}>

export type Damage = Array<{ damageType: DamageType } & Heal>
