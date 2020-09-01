import { Writable } from 'ts-essentials'
import { CharacterModel } from 'models/Character/CharacterModel'
import { AppState } from 'redux/configureStore'

export type EffectFrom = {
  race?: string
  feature?: string
  choice?: string
  class?: string
}

export abstract class BaseEffectModel<
  R extends Readonly<{ from?: never; type: string }>
> {
  constructor(
    protected characterModel: CharacterModel,
    ref: R,
    public readonly key: string,
    public from: EffectFrom = {},
  ) {
    this.ref = { ...ref }
    this.type = this.ref.type
  }

  protected ref: Writable<R>
  readonly type: R['type']

  get data(): R {
    return this.ref
  }

  withFrom(from: EffectFrom): this {
    Object.assign(this.from, from)
    return this
  }

  abstract assign(effect: R): void

  assignModel(effectModel: this) {
    this.assign(effectModel.ref)
  }

  fromState?: (state: AppState) => BaseEffectModel<any>[]
}
