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
import { computed } from 'mobx'

export type EquipmentPossessionEffect = DeepReadonly<
  OneOfOptionalRequired<{
    type: 'equipmentPossession'
    weapon?: WeaponTypeWithGroups[]
    armor?: ArmorType[]
    tool?: ToolType[]
  }>
>

export class EquipmentPossessionEffectModel extends BaseEffectModel<EquipmentPossessionEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'equipmentPossession',
      weapon: [],
      armor: [],
      tool: [],
    } as const
  }

  @computed
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

  @computed
  get armor(): ReadonlyArray<ArmorType> {
    return this.ref.armor || []
  }

  @computed
  get tool(): ReadonlyArray<ToolType> {
    return this.ref.tool || []
  }

  unionRef(effect: EquipmentPossessionEffect) {
    return {
      weapon: uniq([...this.weapon, ...(effect.weapon || [])]),
      armor: uniq([...this.armor, ...(effect.armor || [])]),
      tool: uniq([...this.tool, ...(effect.tool || [])]),
    }
  }
}
