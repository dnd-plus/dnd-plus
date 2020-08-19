import { DeepReadonly } from 'ts-essentials'
import { SkillType } from 'common/reference/skills/SKILLS'

export type SkillPossessionEffect = DeepReadonly<{
  type: 'skillPossession'
  skill: SkillType[]
}>
