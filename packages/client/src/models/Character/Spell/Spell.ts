import { MagicSchool } from 'common/types/base/spell/MagicSchool'
import { CastDuration, SpellDuration } from 'common/types/base/Duration'
import { CharacterClassName } from 'common/types/base/character/CharacterClassName'
import { RuleSource } from 'common/types/RuleSource'
import { Target } from 'common/types/base/character/Feature/Target'
import { Damage, Heal } from 'common/types/base/Damage'
import { AbilityType } from 'common/reference/AbilityType'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'
import { DeepReadonly } from 'ts-essentials'

type SpellNextLevel = OneOfOptionalRequired<
  Pick<Spell, 'heal' | 'damage' | 'spellRange'> & {
    target?: { count: number }
    duration?: { value: number }
  }
>

export type SpellArea = {
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

export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type Spell = DeepReadonly<{
  id: number
  name: string
  nameEn: string
  level: SpellLevel
  school: MagicSchool
  ritual: boolean
  concentration: boolean
  needModel?: true
  area?: SpellArea
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
  duration?: SpellDuration
  classes: CharacterClassName[]
  description: string
  source: RuleSource
  image?: string
  tags?: string[]
}>
