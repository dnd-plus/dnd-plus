import * as t from 'io-ts'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { useDispatch } from 'react-redux'
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
  get knownState() {
    return SelectAbilityFeatureChoiceState.is(this.state) ? this.state : null
  }

  get options() {
    return this.ref.available ?? ABILITY_TYPES
  }

  get count() {
    return this.ref.count || 1
  }

  get items() {
    return Array(this.count)
      .fill('')
      .map((_, index) => this.knownState?.selected[index] || '')
  }

  get selected() {
    return this.items
  }

  get chosen() {
    return this.selected.every(Boolean)
  }

  get effectKey() {
    return createKey(this.key, this.knownState?.selected)
  }

  get effects() {
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
    const dispatch = useDispatch()

    return {
      node: this.items.map((value, index) => {
        return (
          <ChoiceSelect
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
              const selected = this.items.slice()
              selected.splice(index, 1, String(e.target.value))

              dispatch.sync(
                this.setChoiceAction({
                  key: this.key,
                  value: { selected },
                }),
              )
            }}
          />
        )
      }),
    }
  }
}
