import { AbilityName } from 'common/types/base/character/Ability'
import { CharacterLevel } from 'common/types/base/character/Level'
import { Cooldown } from 'common/types/base/character/Feature/Cooldown'

export type SpellPossessionEffect = {
  type: 'spellPossession'
  spell: string // todo: change to Spell type when created
  cooldown?: Cooldown
  baseAbility?: AbilityName
  fromLevel?: CharacterLevel
}
