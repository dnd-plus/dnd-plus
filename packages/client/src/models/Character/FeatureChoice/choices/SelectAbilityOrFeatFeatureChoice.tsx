import * as t from 'io-ts'
import React, { useState } from 'react'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { FeatureChoiceModel } from 'models/Character/FeatureChoice/FeatureChoice'
import { SelectFeatFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectFeatFeatureChoice'
import { SelectAbilityFeatureChoiceModel } from 'models/Character/FeatureChoice/choices/SelectAbilityFeatureChoice'
import { Button, Grid } from '@material-ui/core'
import { computed } from 'mobx'
import { SBox } from 'components/SBox'
import { observer } from 'mobx-react-lite'

export type SelectAbilityOrFeatFeatureChoice = DeepReadonly<{
  type: 'selectAbilityOrFeat'
}>
const SelectAbilityOrFeatFeatureChoiceState = t.readonly(
  t.partial({
    feat: t.readonly(t.unknown),
    ability1: t.readonly(t.unknown),
    ability2: t.readonly(t.unknown),
  }),
)

export class SelectAbilityOrFeatFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectAbilityOrFeatFeatureChoice,
  t.TypeOf<typeof SelectAbilityOrFeatFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectAbilityOrFeatFeatureChoiceState.is(this.state)
      ? this.state
      : null
  }

  @computed
  get featChoices() {
    return [
      new SelectFeatFeatureChoiceModel(
        this.characterModel,
        this.knownState?.feat,
        { type: 'selectFeat' },
        this.key,
        ({ key, value }) =>
          this.setChoiceAction({ key, value: { feat: value } }),
      ),
    ]
  }

  @computed
  get abilityChoices() {
    return (['ability1', 'ability2'] as const).map(
      (name) =>
        new SelectAbilityFeatureChoiceModel(
          this.characterModel,
          this.knownState?.[name],
          { type: 'selectAbility' },
          this.key,
          ({ key, value }) =>
            this.setChoiceAction({
              key,
              value: {
                ability1: this.knownState?.ability1,
                ability2: this.knownState?.ability2,
                [name]: value,
              },
            }),
        ),
    )
  }

  @computed
  get selectedVariant() {
    return this.knownState?.feat ? 'feat' : 'ability'
  }

  getActiveChoices(variant = this.selectedVariant): FeatureChoiceModel[] {
    return variant === 'feat' ? this.featChoices : this.abilityChoices
  }

  @computed
  get choicesCount() {
    return this.getActiveChoices().reduce(
      (sum, choice) => sum + choice.choicesCount,
      0,
    )
  }

  @computed
  protected get choiceEffects() {
    return this.getActiveChoices().flatMap((choice) => choice.effects)
  }

  @computed
  get node() {
    return <SelectAbilityOrFeat model={this} />
  }
}

const SelectAbilityOrFeat = observer(
  ({ model }: { model: SelectAbilityOrFeatFeatureChoiceModel }) => {
    const [variant, setVariant] = useState(model.selectedVariant)
    const activeChoices = model.getActiveChoices(variant)

    return (
      <>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => setVariant('ability')}
              color={variant === 'ability' ? 'primary' : 'default'}
            >
              Характеристики
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setVariant('feat')}
              color={variant === 'feat' ? 'primary' : 'default'}
            >
              Черта
            </Button>
          </Grid>
        </Grid>
        <SBox mt={2}>
          {activeChoices.map(({ node }, index) => (
            <React.Fragment key={index}>{node}</React.Fragment>
          ))}
        </SBox>
      </>
    )
  },
)
