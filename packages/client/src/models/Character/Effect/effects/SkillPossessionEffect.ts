import { DeepReadonly } from 'ts-essentials'
import { SkillType } from 'common/reference/SkillType'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'

export type SkillPossessionEffect = DeepReadonly<{
  type: 'skillPossession'
  skills: SkillType[]
}>

export class SkillPossessionEffectModel extends BaseEffectModel<
  SkillPossessionEffect
> {
  get skills() {
    return this.ref.skills || []
  }
  assign(effect: SkillPossessionEffect) {
    this.ref.skills = [...new Set([...this.skills, ...(effect.skills || [])])]
  }
}
