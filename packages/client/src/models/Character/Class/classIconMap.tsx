import {
  ClassesBarbarian,
  ClassesBeastMaster,
  ClassesEngineer,
  ClassesMonk,
  ClassesPriest,
  ClassesSwordsman,
  ClassesThief,
  ClassesWizard,
  GameUiBookSkill,
  SkillBeastBear,
  SkillBellShake,
  SkillMagicFireball,
  WeaponShield,
} from 'components/DndIcons'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import React, { ReactElement } from 'react'

export const classIconMap: Record<
  CharacterClassName,
  (props: SvgIconProps) => ReactElement
> = {
  artificer: ClassesEngineer,
  barbarian: ClassesBarbarian,
  bard: SkillBellShake,
  cleric: ClassesPriest,
  druid: SkillBeastBear,
  fighter: ClassesSwordsman,
  monk: ClassesMonk,
  paladin: WeaponShield,
  ranger: ClassesBeastMaster,
  rogue: ClassesThief,
  warlock: ClassesWizard,
  sorcerer: SkillMagicFireball,
  wizard: GameUiBookSkill,
}

export function ClassIcon({
  type,
  ...svgProps
}: { type: CharacterClassName } & SvgIconProps) {
  const Icon = classIconMap[type]
  return <Icon {...svgProps} />
}
