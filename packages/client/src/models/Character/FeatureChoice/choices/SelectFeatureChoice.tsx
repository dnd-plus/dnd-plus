import { Effect, effectFactory } from 'models/Character/Effect/Effect'
import * as t from 'io-ts'
import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { createKey } from 'models/utils/createKey'

export type SelectFeatureChoice = DeepReadonly<{
  type: 'select'
  label: string
  options: Array<{
    name: string
    effects: Effect[]
  }>
}>
const SelectFeatureChoiceState = t.type({
  selected: t.number,
})

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

  get chosen() {
    return !!this.selected
  }

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
        <FormControl variant={'outlined'} fullWidth>
          <InputLabel>{this.ref.label}</InputLabel>
          <Select
            fullWidth
            value={this.knownState?.selected ?? ''}
            label={this.ref.label}
            error={!this.selected}
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
          >
            {this.ref.options.map(({ name }, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    }
  }
}
