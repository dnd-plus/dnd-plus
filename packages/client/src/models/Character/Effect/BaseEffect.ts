import { Writable } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { AppState } from 'redux/configureStore'
import { OneOfOptionalRequired } from 'common/types/utils/OneOfOptionalRequired'

export type EffectFrom = {
  race?: string
  feature?: string
  class?: string
}

export abstract class BaseEffectModel<
  R extends Readonly<{ from?: never; type: string }>
> {
  constructor(
    protected characterModel: CharacterModel,
    ref: R,
    public readonly key: string,
    public from?: EffectFrom,
  ) {
    this.ref = { ...ref }
    this.type = this.ref.type
  }

  abstract get emptyRef(): R

  static get emptyRef() {
    return this.prototype.emptyRef
  }

  protected ref: Writable<R>
  readonly type: R['type']

  withFrom(from: OneOfOptionalRequired<EffectFrom>): this {
    this.from = { ...this.from, ...from }
    return this
  }

  abstract assign(effect: R): void

  assignModel(effectModel: this) {
    this.assign(effectModel.ref)
  }

  readonly fromState?: (state: AppState) => BaseEffectModel<any>[]

  readonly computed?: () => BaseEffectModel<any>[]
}
