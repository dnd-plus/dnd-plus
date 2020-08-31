import { WeaponType } from 'common/reference/equipment/WeaponType'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { ToolType } from 'common/reference/equipment/ToolType'
import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type EquipmentPossessionEffect = DeepReadonly<
  | {
      type: 'equipmentPossession'
      weapon: WeaponType[]
      armor?: ArmorType[]
      tool?: ToolType[]
    }
  | {
      type: 'equipmentPossession'
      weapon?: WeaponType[]
      armor: ArmorType[]
      tool?: ToolType[]
    }
  | {
      type: 'equipmentPossession'
      weapon?: WeaponType[]
      armor?: ArmorType[]
      tool: ToolType[]
    }
>

export class EquipmentPossessionEffectModel extends BaseEffectModel<
  EquipmentPossessionEffect
> {
  get weapon(): WeaponType[] {
    return [...(this.ref.weapon || [])]
  }
  get armor(): ArmorType[] {
    return [...(this.ref.armor || [])]
  }
  get tool(): ToolType[] {
    return [...(this.ref.tool || [])]
  }

  assign(effect: EquipmentPossessionEffect) {
    this.ref.weapon = [...new Set([...this.weapon, ...(effect.weapon || [])])]
    this.ref.armor = [...new Set([...this.armor, ...(effect.armor || [])])]
    this.ref.tool = [...new Set([...this.tool, ...(effect.tool || [])])]
  }
}
