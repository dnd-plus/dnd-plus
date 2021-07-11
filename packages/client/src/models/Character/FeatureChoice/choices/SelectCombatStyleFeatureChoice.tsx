import * as t from 'io-ts'
import React, { ReactNode } from 'react'
import { DeepReadonly } from 'ts-essentials'
import { BaseFeatureChoiceModel } from 'models/Character/FeatureChoice/BaseFeatureChoice'
import { computed } from 'mobx'
import {
  CombatStyleEffectModel,
  CombatStyleType,
  CombatStyleTypeDescriptionDict,
  CombatStyleTypeDict,
} from 'models/Character/Effect/effects/CombatStyle'
import { observer } from 'mobx-react-lite'
import { SBox } from 'components/SBox'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { useToggle } from 'react-use'

export type SelectCombatStyleFeatureChoice = DeepReadonly<{
  type: 'selectCombatStyle'
  available: CombatStyleType[]
}>

const SelectCombatStyleFeatureChoiceState = t.readonly(
  t.type({
    selected: t.string,
  }),
)

export class SelectCombatStyleFeatureChoiceModel extends BaseFeatureChoiceModel<
  SelectCombatStyleFeatureChoice,
  t.TypeOf<typeof SelectCombatStyleFeatureChoiceState>
> {
  @computed
  get knownState() {
    return SelectCombatStyleFeatureChoiceState.is(this.state)
      ? this.state
      : null
  }

  @computed
  get selected() {
    return this.knownState &&
      this.ref.available.includes(this.knownState?.selected as CombatStyleType)
      ? (this.knownState.selected as CombatStyleType)
      : null
  }

  @computed
  get choicesCount() {
    return this.selected ? 0 : 1
  }

  @computed
  protected get choiceEffects() {
    return this.selected
      ? [
          new CombatStyleEffectModel(
            this.characterModel,
            {
              type: 'combatStyle',
              combatStyles: [this.selected],
            },
            this.key,
          ),
        ]
      : []
  }

  @computed
  get node() {
    return <SelectCombatStyle model={this} />
  }
}

const SelectCombatStyle = observer(function SelectCombatStyle({
  model,
}: {
  model: SelectCombatStyleFeatureChoiceModel
}) {
  const [isChangeChoice, toggleIsChangeChoice] = useToggle(false)
  const renderCombatStyle = (
    combatStyle: CombatStyleType,
    actions?: ReactNode,
  ) => {
    const isDisabled =
      combatStyle !== model.selected &&
      model.characterModel.effects.combatStyle.combatStyles.includes(
        combatStyle,
      )

    return (
      <SBox mt={1} style={isDisabled ? { opacity: 0.7 } : undefined}>
        <Card>
          <CardContent>
            <Typography variant={'h6'}>
              <small>{CombatStyleTypeDict[combatStyle]}</small>
              {isDisabled && (
                <Typography component={'span'} variant={'body1'}>
                  {' '}
                  (есть)
                </Typography>
              )}
            </Typography>
            <Typography>
              {CombatStyleTypeDescriptionDict[combatStyle]}
            </Typography>
          </CardContent>
          {actions && !isDisabled && <CardActions>{actions}</CardActions>}
        </Card>
      </SBox>
    )
  }

  return (
    <SBox mb={1}>
      <SBox
        mb={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography
          variant={'h6'}
          color={model.selected ? 'textPrimary' : 'error'}
        >
          {isChangeChoice ? 'Смена боевого стиля' : 'Боевой стиль'}
        </Typography>
        {model.selected && (
          <SBox ml={1}>
            <Button onClick={toggleIsChangeChoice}>
              {isChangeChoice ? 'Отмена' : 'Сменить'}
            </Button>
          </SBox>
        )}
      </SBox>
      {model.selected && !isChangeChoice ? (
        renderCombatStyle(model.selected)
      ) : (
        <>
          {model.ref.available.map((combatStyle) =>
            renderCombatStyle(
              combatStyle,
              <Button
                color={'primary'}
                onClick={() => {
                  model.setState({ selected: combatStyle })
                  toggleIsChangeChoice(false)
                }}
              >
                Выбрать
              </Button>,
            ),
          )}
        </>
      )}
    </SBox>
  )
})
