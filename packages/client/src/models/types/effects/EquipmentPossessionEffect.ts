import { WeaponType } from 'common/reference/equipment/WeaponType'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { ToolType } from 'common/reference/equipment/ToolType'

export type EquipmentPossessionEffect = {
  type: 'equipmentPossession'
  weapon?: WeaponType[]
  armor?: ArmorType[]
  tool?: ToolType[]
}
