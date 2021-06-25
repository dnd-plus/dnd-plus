import { Effect, effectFactory } from 'models/Character/Effect/Effect'
import * as t from 'io-ts'
import React from 'react'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'
import { ChoiceSelect } from 'components/ChoiceSelect'
import { computed } from 'mobx'

type SelectFeatureChoiceOption = {
  group?: string
  name: string
  effects: Effect[]
}

export type SelectFeatureChoice<
  Option extends SelectFeatureChoiceOption = SelectFeatureChoiceOption,
> = DeepReadonly<{
  type: 'select'
  label: string
  options: Array<Option>
}>
const SelectFeatureChoiceState = t.readonly(
  t.type({
    selected: t.number,
  }),
)

export class SelectFeatureChoiceModel<
  Option extends SelectFeatureChoiceOption = SelectFeatureChoiceOption,
> extends BaseFeatureChoiceModel<
  SelectFeatureChoice<Option>,
  t.TypeOf<typeof SelectFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectFeatureChoiceState.is(this.state) ? this.state : null
  }

  @computed
  get selected() {
    return (
      (this.knownState && this.ref.options[this.knownState.selected]) || null
    )
  }

  @computed
  get choicesCount() {
    return this.selected ? 0 : 1
  }

  @computed
  protected get choiceEffects() {
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
            this.setChoiceAction({
              key: this.key,
              value: {
                selected: Number(e.target.value),
              },
            })
          }
        />
      ),
    }
  }
}
