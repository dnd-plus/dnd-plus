import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { CharacterClass } from 'models/Character/Class/Class'
import { Artificer } from 'models/Character/Class/classes/Artificer/Artificer'
import { Druid } from 'models/Character/Class/classes/Druid/Druid'
import { Cleric } from 'models/Character/Class/classes/Cleric/Cleric'
import { Barbarian } from 'models/Character/Class/classes/Barbarian/Barbarian'
import { Fighter } from 'models/Character/Class/classes/Fighter/Fighter'
import { Bard } from 'models/Character/Class/classes/Bard/Bard'
import { Monk } from 'models/Character/Class/classes/Monk/Monk'
import { Paladin } from 'models/Character/Class/classes/Paladin/Paladin'
import { Ranger } from 'models/Character/Class/classes/Ranger/Ranger'
import { Rogue } from 'models/Character/Class/classes/Rogue/Rogue'
import { Sorcerer } from 'models/Character/Class/classes/Sorcerer/Sorcerer'
import { Warlock } from 'models/Character/Class/classes/Warlock/Warlock'
import { Wizard } from 'models/Character/Class/classes/Wizard/Wizard'

export const classesMap: Record<CharacterClassName, CharacterClass> = {
  artificer: Artificer,
  barbarian: Barbarian,
  bard: Bard,
  cleric: Cleric,
  druid: Druid,
  fighter: Fighter,
  monk: Monk,
  paladin: Paladin,
  ranger: Ranger,
  rogue: Rogue,
  sorcerer: Sorcerer,
  warlock: Warlock,
  wizard: Wizard,
}

export const classesList = Object.values(classesMap)
