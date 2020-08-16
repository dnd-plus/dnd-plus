import { AbilitiesMap } from 'common/types/base/character/Ability'

export type AbilityEffect = {
  type: 'ability'
  abilities: Partial<AbilitiesMap>
}
