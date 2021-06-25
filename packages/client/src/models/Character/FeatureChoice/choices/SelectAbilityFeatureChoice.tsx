import * as t from 'io-ts'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { Typography } from '@material-ui/core'
import React from 'react'
import { createKey } from 'models/utils/createKey'
import {
  AbilitiesMap,
  ABILITY_TYPES,
  AbilityType,
  AbilityTypeDict,
} from 'common/reference/AbilityType'
import { DeepReadonly } from 'ts-essentials'
import { ChoiceSelect } from 'components/ChoiceSelect'
import { AbilityEffectModel } from 'models/Character/Effect/effects/AbilityEffect'
import { computed } from 'mobx'

export type SelectAbilityFeatureChoice = DeepReadonly<{
  type: 'selectAbility'
  count?: number
  available?: AbilityType[]
}>

const SelectAbilityFeatureChoiceState = t.readonly(
  t.type({
    selected: t.readonlyArray(t.string),
  }),
)

export class SelectAbilityFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectAbilityFeatureChoice,
  t.TypeOf<typeof SelectAbilityFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectAbilityFeatureChoiceState.is(this.state) ? this.state : null
  }

  @computed
  get options() {
    return this.ref.available ?? ABILITY_TYPES
  }

  @computed
  get count() {
    return this.ref.count || 1
  }

  @computed
  get items() {
    return Array(this.count)
      .fill('')
      .map((_, index) => this.knownState?.selected[index] || '')
  }

  @computed
  get selected() {
    return this.items
  }

  @computed
  get choicesCount() {
    return this.selected.reduce((sum, item) => sum + (item ? 0 : 1), 0)
  }

  @computed
  get chosen() {
    return this.selected.every(Boolean)
  }

  @computed
  get effectKey() {
    return createKey(this.key, this.knownState?.selected)
  }

  @computed
  protected get choiceEffects() {
    return [
      new AbilityEffectModel(
        this.characterModel,
        {
          type: 'ability',
          abilities: this.items.filter(Boolean).reduce((abilities, name) => {
            abilities[name as AbilityType] = 1
            return abilities
          }, {} as AbilitiesMap),
        },
        createKey(this.key, this.items.join()),
      ),
    ]
  }

  readonly hook = () => {
    const selected = this.items
    return {
      node: this.items.map((value, index) => {
        return (
          <ChoiceSelect
            key={index}
            label={'Выбор характеристики'}
            value={value}
            options={this.options.map((option) => {
              const isExist = this.items.includes(option) && value !== option

              return {
                value: option,
                disabled: isExist,
                text: (
                  <>
                    <span
                      style={
                        isExist ? { textDecoration: 'line-through' } : undefined
                      }
                    >
                      {AbilityTypeDict[option]}
                    </span>
                    {isExist && (
                      <Typography variant={'caption'}>
                        &nbsp; выбрано
                      </Typography>
                    )}
                  </>
                ),
              }
            })}
            onChange={(e) => {
              selected.splice(index, 1, String(e.target.value))

              this.setChoiceAction({
                key: this.key,
                value: { selected },
              })
            }}
          />
        )
      }),
    }
  }
}
