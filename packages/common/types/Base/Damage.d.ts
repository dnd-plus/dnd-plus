declare type DamageType =
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

type Rolls = Array<{
  dice: Dice
  damageType: DamageType
}>

declare type Damage =
  | {
      value: number
      rolls: Rolls
    }
  | {
      value?: number
      rolls: Rolls
    }
  | {
      value: number
      rolls?: Rolls
    }
