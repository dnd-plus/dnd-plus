import { DeepReadonly } from 'ts-essentials'
import { SkillType } from 'common/reference/SkillType'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type SkillPossessionEffect = DeepReadonly<{
  type: 'skillPossession'
  skills: {
    [K in SkillType]?: 'expertise' | 'proficient' | 'halfProficient' | null
  }
}>

// noinspection JSConstantReassignment
export class SkillPossessionEffectModel extends BaseEffectModel<
  SkillPossessionEffect
> {
  assign(effect: SkillPossessionEffect) {
    const priority = [
      undefined,
      'halfProficient',
      'proficient',
      'expertise',
      null,
    ] as const

    type Skills = SkillPossessionEffect['skills']
    const skills = { ...this.ref.skills }

    ;(Object.entries(effect.skills) as Array<
      [keyof Skills, Skills[keyof Skills]]
    >).forEach(([key, value]) => {
      if (priority.indexOf(skills[key]) < priority.indexOf(value)) {
        skills[key] = value
      }
    })

    this.ref.skills = skills
  }
}
