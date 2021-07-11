import { DeepReadonly } from 'ts-essentials'
import { SKILL_TYPES, SkillType } from 'common/reference/SkillType'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { computed } from 'mobx'

export type SkillPossessionLevel =
  | 'expertise'
  | 'proficient'
  | 'halfProficient'
  | null
  | undefined

export const SKILL_POSSESSION_LEVEL_PRIORITY = [
  undefined,
  'halfProficient',
  'proficient',
  'expertise',
  null,
] as const

export function isFirstSkillPossessionLevelStronger(
  first: SkillPossessionLevel,
  second: SkillPossessionLevel,
) {
  return (
    SKILL_POSSESSION_LEVEL_PRIORITY.indexOf(first) >
    SKILL_POSSESSION_LEVEL_PRIORITY.indexOf(second)
  )
}

export type SkillPossessionEffect = DeepReadonly<{
  type: 'skillPossession'
  skills: {
    [K in SkillType]?: SkillPossessionLevel
  }
}>

export class SkillPossessionEffectModel extends BaseEffectModel<SkillPossessionEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'skillPossession',
      skills: {},
    } as const
  }

  @computed
  get skills() {
    return this.ref.skills
  }

  unionRef(effect: SkillPossessionEffect) {
    const skills = { ...this.ref.skills }

    SKILL_TYPES.forEach((key) => {
      const value = effect.skills[key]
      if (isFirstSkillPossessionLevelStronger(value, skills[key])) {
        skills[key] = value
      }
    })

    return { skills }
  }
}
