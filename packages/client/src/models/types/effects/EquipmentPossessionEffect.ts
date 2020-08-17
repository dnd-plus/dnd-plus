import { WeaponType } from 'common/reference/equipment/WeaponType'
import { ArmorType } from 'common/reference/equipment/ArmorType'
import { ToolType } from 'common/reference/equipment/ToolType'
import { DeepReadonly } from 'ts-essentials'

export type EquipmentPossessionEffect = DeepReadonly<{
  type: 'equipmentPossession'
  weapon?: WeaponType[]
  armor?: ArmorType[]
  tool?: ToolType[]
}>
