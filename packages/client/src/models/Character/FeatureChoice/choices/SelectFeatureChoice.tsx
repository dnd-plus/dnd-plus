import { Effect } from 'models/types/Effect'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/FeatureChoice'
import * as t from 'io-ts'
import { rightOrValue } from 'utils/rightOrValue'
import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { useDispatch } from 'react-redux'

type SelectFeatureChoiceOption = {
  name: string
  effects: Effect[]
}

export type SelectFeatureChoice = {
  type: 'select'
  label: string
  options: SelectFeatureChoiceOption[]
}
const SelectFeatureChoiceState = t.type({
  selected: t.number,
})

export class SelectFeatureChoiceModel extends BaseFeatureChoiceModel<
  t.TypeOf<typeof SelectFeatureChoiceState>
> {
  get knownState() {
    return rightOrValue(SelectFeatureChoiceState.decode(this.state), null)
  }

  get selected() {
    return (
      (this.knownState && this.ref.options[this.knownState.selected]) || null
    )
  }

  get chosen() {
    return this.selected ? this.selected.name : null
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
                  _id: this.characterModel.id,
                  key: this.key,
                  value: {
                    selected: Number(e.target.value),
                  },
                }),
              )
            }
          >
            {this.ref.options.map(({ name }, index) => (
              <MenuItem value={index}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    }
  }
}
