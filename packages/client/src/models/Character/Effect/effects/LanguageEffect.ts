import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { Memoize } from 'models/utils/Memoize'
import { LanguageType } from 'common/reference/LanguageType'

export type LanguageEffect = DeepReadonly<{
  type: 'language'
  languages: LanguageType[]
}>

export class LanguageEffectModel extends BaseEffectModel<LanguageEffect> {
  @Memoize()
  get emptyRef() {
    return {
      type: 'language',
      languages: [],
    } as const
  }

  @Memoize()
  get languages() {
    return [...(this.ref.languages || [])]
  }

  assign(effect: LanguageEffect) {
    this.ref.languages = [
      ...new Set([...this.languages, ...(effect.languages || [])]),
    ]
  }
}
