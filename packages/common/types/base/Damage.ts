import { Dice } from 'common/types/base/Dice'

export type DamageType =
  | 'slashing'
  | 'piercing'
  | 'bludgeoning'
  | 'poison'
  | 'acid'
  | 'fire'
  | 'cold'
  | 'radiant'
  | 'necrotic'
  | 'lightning'
  | 'thunder'
  | 'force'
  | 'psychic'

export type Damage = Array<
  {
    damageType: DamageType
  } & ({ dice: Dice } | { value: number })
>
