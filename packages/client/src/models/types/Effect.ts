import { AbilityEffect } from 'models/types/effects/AbilityEffect'
import { MovementEffect } from 'models/types/effects/MovementEffect'
import { CheckType } from 'common/types/TypeGuard'
import { VisionEffect } from 'models/types/effects/VisionEffect'
import { EquipmentPossessionEffect } from 'models/types/effects/EquipmentPossessionEffect'
import { SpellPossessionEffect } from 'models/types/effects/SpellPossessionEffect'
import { DefenceEffect } from 'models/types/effects/DefenceEffect'
import { SavingThrowEffect } from 'models/types/effects/SavingThrowEffect'

export type Effect =
  | AbilityEffect
  | MovementEffect
  | VisionEffect
  | EquipmentPossessionEffect
  | SpellPossessionEffect
  | DefenceEffect
  | SavingThrowEffect

type EffectGuard = CheckType<{ from?: never; type: string }, Effect>
