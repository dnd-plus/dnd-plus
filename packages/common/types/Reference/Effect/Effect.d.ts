declare interface BaseEffect {
  type: string
}

/** map for declaring effects in separate files */
declare interface EffectMap {}

declare type Effect = Readonly<EffectMap[keyof EffectMap]>

// TYPE GUARD
type EffectCheck = CheckType<BaseEffect, Effect>
