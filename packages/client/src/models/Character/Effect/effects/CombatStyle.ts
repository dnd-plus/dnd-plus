import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { DeepReadonly } from 'ts-essentials'
import { uniq } from 'lodash-es'
import { computed } from 'mobx'

export const COMBAT_STYLE_TYPES = [
  'archery',
  'defense',
  'dueling',
  'greatWeaponFighting',
  'protection',
  'twoWeaponFighting',
] as const

export type CombatStyleType = typeof COMBAT_STYLE_TYPES[number]

export type CombatStyleEffect = DeepReadonly<{
  type: 'combatStyle'
  combatStyles: CombatStyleType[]
}>

export class CombatStyleEffectModel extends BaseEffectModel<CombatStyleEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'combatStyle',
      combatStyles: [],
    } as const
  }

  @computed
  get combatStyles() {
    return this.ref.combatStyles
  }

  unionRef(effect: CombatStyleEffect) {
    return {
      combatStyles: uniq([...this.ref.combatStyles, ...effect.combatStyles]),
    }
  }
}

export const CombatStyleTypeDict: Record<CombatStyleType, string> = {
  archery: 'Стрельба',
  defense: 'Оборона',
  dueling: 'Дуэлянт',
  greatWeaponFighting: 'Сражение большим оружием',
  protection: 'Защита',
  twoWeaponFighting: 'Сражение двумя оружиями',
}

export const CombatStyleTypeDescriptionDict: Record<CombatStyleType, string> = {
  archery:
    'Вы получаете бонус +2 к броску атаки, когда атакуете дальнобойным оружием.',
  defense: 'Пока вы носите доспехи, вы получаете бонус +1 к КД.',
  dueling:
    'Пока вы держите рукопашное оружие в одной руке, и не используете другого оружия, вы получаете бонус +2 к броскам урона этим оружием.',
  greatWeaponFighting:
    'Если у вас выпало «1» или «2» на кости урона оружия при атаке, которую вы совершали рукопашным оружием, удерживая его двумя руками, то вы можете перебросить эту кость, и должны использовать новый результат, даже если снова выпало «1» или «2». Чтобы воспользоваться этим преимуществом, ваше оружие должно иметь свойство «двуручное» или «универсальное».',
  protection:
    'Если существо, которое вы видите, атакует не вас, а другое существо, находящееся в пределах 5 футов от вас, вы можете реакцией создать помеху его броску атаки. Для этого вы должны использовать щит.',
  twoWeaponFighting:
    'Если вы сражаетесь двумя оружиями, вы можете добавить модификатор характеристики к урону от второй атаки.',
}
