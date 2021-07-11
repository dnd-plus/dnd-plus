import { DeepReadonly } from 'ts-essentials'
import { BaseEffectModel } from 'models/Character/Effect/BaseEffect'
import { LanguageType } from 'common/reference/LanguageType'
import { uniq } from 'lodash-es'
import { computed } from 'mobx'

export type LanguageEffect = DeepReadonly<{
  type: 'language'
  languages: LanguageType[]
}>

export class LanguageEffectModel extends BaseEffectModel<LanguageEffect> {
  @computed
  get emptyRef() {
    return {
      type: 'language',
      languages: [],
    } as const
  }

  @computed
  get languages() {
    return [...(this.ref.languages || [])]
  }

  unionRef(effect: LanguageEffect) {
    return {
      languages: uniq([...this.languages, ...(effect.languages || [])]),
    }
  }
}
