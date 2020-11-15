import { MagicSchool } from 'common/types/base/spell/MagicSchool'
import { CastDuration, Duration } from 'common/types/base/Duration'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { RuleSource } from 'common/types/RuleSource'
import { Target } from 'common/types/base/character/Feature/Target'
import { Damage, Heal } from 'common/types/base/Damage'
import { AbilityType } from 'common/reference/AbilityType'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

type SpellNextLevel = OneOfOptionalRequired<
  Pick<Spell, 'heal' | 'damage' | 'spellRange'> & {
    target?: { count: number }
    duration?: { value: number }
  }
>

export type Spell = {
  id: number
  name: string
  nameEn: string
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  school: MagicSchool
  ritual: boolean
  concentration: boolean
  needModel?: true
  area?: {
    type:
      | 'line'
      | 'cone'
      | 'cube'
      | 'sphere'
      | 'cylinder'
      | 'square'
      | 'squareFeet'
    size: number
  }
  target?: Target
  saveThrow?: AbilityType
  attackRoll: boolean
  castTime: CastDuration
  spellRange?: number
  heal?: Heal
  damage?: Damage
  nextLevel?:
    | (SpellNextLevel & { everyLevel?: number })
    | [{ level: Spell['level'] } & SpellNextLevel]
  cantripByCharacterLevel?: SpellNextLevel
  verbal: boolean
  somatic: boolean
  material: boolean
  components?: string
  needComponents: boolean
  consumeComponents: boolean
  duration?: Duration | { type: 'special'; text?: string }
  classes: CharacterClassName[]
  description: string
  source: RuleSource
  tags?: string[]
}
