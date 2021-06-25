import { AbilitiesMap, ABILITY_TYPES } from 'common/reference/AbilityType'
import { DeepReadonly } from 'ts-essentials'

export function getMulticlassUnmetClaims(
  abilityMap: Partial<AbilitiesMap>,
  ...requirementsList: DeepReadonly<Partial<AbilitiesMap>[]>[]
) {
  for (const requirements of requirementsList) {
    let unmet: Partial<AbilitiesMap> | undefined

    const isSatisfied =
      !requirements.length ||
      requirements.some((requirement) => {
        let currentUnmet: Partial<AbilitiesMap> | undefined

        ABILITY_TYPES.forEach((ability) => {
          if (Number(requirement[ability]) > Number(abilityMap[ability])) {
            currentUnmet = {
              ...currentUnmet,
              [ability]: Number(requirement[ability]),
            }
          }
        })

        if (currentUnmet) {
          unmet = currentUnmet
          return false
        }
        return true
      })

    if (!isSatisfied) {
      return unmet
    }
  }
}
