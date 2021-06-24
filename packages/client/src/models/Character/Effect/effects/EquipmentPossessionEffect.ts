import { Memoize } from 'models/utils/Memoize'
import {
  MARTIAL_WEAPON_GROUP_TYPE,
  MARTIAL_WEAPON_TYPES,
  SIMPLE_WEAPON_GROUP_TYPE,
  SIMPLE_WEAPON_TYPES,
  WeaponTypeWithGroups,
} from 'common/reference/equipment/WeaponType'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { ToolType } from 'common/reference/equipment/ToolType'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { difference, uniq } from 'lodash-es'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

export type EquipmentPossessionEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'equipmentPossession'
    weapon?: WeaponTypeWithGroups[]
    armor?: ArmorType[]
    tool?: ToolType[]
  }>
>

export class EquipmentPossessionEffectModel extends BaseEffectModel<EquipmentPossessionEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'equipmentPossession',
      weapon: [],
      armor: [],
      tool: [],
    } as const
  }

  @Memoize()
  get weapon(): ReadonlyArray<WeaponTypeWithGroups> {
    let weapon = this.ref.weapon || []
    if (weapon.includes(SIMPLE_WEAPON_GROUP_TYPE)) {
      weapon = difference(weapon, SIMPLE_WEAPON_TYPES)
    }
    if (weapon.includes(MARTIAL_WEAPON_GROUP_TYPE)) {
      weapon = difference(weapon, MARTIAL_WEAPON_TYPES)
    }
    return weapon
  }
  @Memoize()
  get armor(): ReadonlyArray<ArmorType> {
    return this.ref.armor || []
  }

  @Memoize()
  get tool(): ReadonlyArray<ToolType> {
    return this.ref.tool || []
  }

  assign(effect: EquipmentPossessionEffect) {
    this.ref.weapon = uniq([
      ...(this.ref.weapon || []),
      ...(effect.weapon || []),
    ])
    this.ref.armor = uniq([...(this.ref.armor || []), ...(effect.armor || [])])
    this.ref.tool = uniq([...(this.ref.tool || []), ...(effect.tool || [])])
  }
}
