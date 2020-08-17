import { AbilitiesMap } from 'common/types/base/character/Ability'
import { DeepReadonly } from 'ts-essentials'

export type AbilityEffect = DeepReadonly<{
  type: 'ability'
  abilities: Partial<AbilitiesMap>
}>
