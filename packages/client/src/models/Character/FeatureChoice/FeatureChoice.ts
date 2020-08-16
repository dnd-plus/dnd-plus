import { SelectFeatureChoice } from 'models/Character/FeatureChoice/choices/SelectFeatureChoice'
import { BaseModel } from 'models/Character/BaseModel'
import { ReactNode } from 'react'
import { CharacterModel } from 'models/Character/CharacterModel'
import { AnyAction } from '@logux/core'

export type FeatureChoice = SelectFeatureChoice

export type FeatureChoiceAction<V = unknown> = (payload: {
  _id: string
  key: string
  value: V
}) => AnyAction

export abstract class BaseFeatureChoiceModel<ST> implements BaseModel {
  constructor(
    protected readonly characterModel: CharacterModel,
    public readonly state: unknown,
    public readonly ref: SelectFeatureChoice,
    public readonly key: string,
    protected readonly setChoiceAction: FeatureChoiceAction<ST>,
  ) {}

  abstract get knownState(): ST | null

  // abstract effects: () => Effect
  abstract get chosen(): string | null

  abstract get hook(): () => {
    node: ReactNode
  }
}
