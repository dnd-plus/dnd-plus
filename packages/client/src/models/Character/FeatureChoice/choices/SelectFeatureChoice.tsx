import { Effect, effectFactory } from 'models/Character/Effect/Effect'
import * as t from 'io-ts'
import React from 'react'
import { useDispatch } from 'react-redux'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'
import { ChoiceSelect } from 'components/ChoiceSelect'

export type SelectFeatureChoice = DeepReadonly<{
  type: 'select'
  label: string
  options: Array<{
    group?: string
    name: string
    effects: Effect[]
  }>
}>
const SelectFeatureChoiceState = t.readonly(
  t.type({
    selected: t.number,
  }),
)

export class SelectFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectFeatureChoice,
  t.TypeOf<typeof SelectFeatureChoiceState>
> {
  get knownState() {
    return SelectFeatureChoiceState.is(this.state) ? this.state : null
  }

  get selected() {
    return (
      (this.knownState && this.ref.options[this.knownState.selected]) || null
    )
  }

  choicesCountSelector = () => (this.selected ? 0 : 1)

  get effects() {
    return (this.selected?.effects || []).flatMap(
      (effect, index) =>
        effectFactory(
          this.characterModel,
          effect,
          createKey(this.key, this.knownState?.selected, index),
        ) || [],
    )
  }

  readonly hook = () => {
    const dispatch = useDispatch()

    return {
      node: (
        <ChoiceSelect
          label={this.ref.label}
          value={this.knownState?.selected}
          options={this.ref.options.map(({ name, group }, index) => ({
            group,
            text: name,
            value: index,
          }))}
          onChange={(e) =>
            dispatch.sync(
              this.setChoiceAction({
                key: this.key,
                value: {
                  selected: Number(e.target.value),
                },
              }),
            )
          }
        />
      ),
    }
  }
}
