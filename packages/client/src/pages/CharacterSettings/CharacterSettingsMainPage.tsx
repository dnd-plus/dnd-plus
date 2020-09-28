import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { MuiField } from 'components/MuiField'
import { useDispatch } from 'react-redux'
import { BaseAbilitiesStateType } from 'common/modules/character/redux'
import {
  AbilitiesMap,
  ABILITY_TYPES,
  AbilityTypeDict,
} from 'common/reference/AbilityType'
import { SBox } from 'components/SBox'

export function CharacterSettingsMainPage() {
  const characterModel = useCharacterModel()
  const characterName = characterModel.name.use()

  const dispatch = useDispatch()

  return (
    <Grid container direction={'column'} spacing={3}>
      <Grid item>
        <Form
          onSubmit={({ name }) => {
            dispatch.sync(characterModel.actions.setName({ name }))
          }}
          subscription={{}}
          initialValues={{ name: characterName }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction={'column'} spacing={2}>
                <Grid item>
                  <Field
                    name={'name'}
                    label={'Имя персонажа'}
                    component={MuiField}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Grid>
      <Grid item>
        <BaseAbilities />
      </Grid>
    </Grid>
  )
}

const standardValuesArray = [8, 10, 12, 13, 14, 15]

const maxPoints = 27
const pointBuyCost: Record<number, number | undefined> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
}
const pointBuyValuesArray = Object.keys(pointBuyCost).map(Number)

const manualValuesArray = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const valuesArrayMap: Record<BaseAbilitiesStateType, number[]> = {
  standardArray: standardValuesArray,
  pointBuy: pointBuyValuesArray,
  manual: manualValuesArray,
}

function BaseAbilities() {
  const characterModel = useCharacterModel()
  const { type, abilities = {} } = characterModel.baseAbilities.use() || {
    abilities: {} as Partial<AbilitiesMap>,
  }
  const dispatch = useDispatch()

  const abilityValues = Object.values(abilities as Record<string, number>)

  const valuesArray = type ? valuesArrayMap[type] : []

  const availablePoints =
    maxPoints -
    abilityValues.reduce(
      (sum, value) => (sum || 0) + (pointBuyCost[value] || 0),
      0,
    )

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <Typography variant={'h4'}>Значения характеристик</Typography>
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <FormLabel>Метод выбора значений</FormLabel>
          <RadioGroup
            name='type'
            value={type || ''}
            onChange={(e) =>
              dispatch.sync(
                characterModel.actions.setBaseAbilitiesType({
                  type: e.target.value as BaseAbilitiesStateType,
                }),
              )
            }
          >
            <SBox mt={2}>
              <FormControlLabel
                value='standardArray'
                control={<Radio />}
                label={
                  <>
                    <div>Стандартный набор</div>
                    <Typography variant={'caption'}>
                      Выбор из стандартного набора значений -{' '}
                      {standardValuesArray.join(', ')}
                    </Typography>
                  </>
                }
              />
            </SBox>
            <SBox mt={1}>
              <FormControlLabel
                value='pointBuy'
                control={<Radio />}
                label={
                  <>
                    <div>Покупка за поинты</div>
                    <Typography variant={'caption'}>
                      Покупка значений за поинты
                    </Typography>
                  </>
                }
              />
            </SBox>
            <SBox mt={1}>
              <FormControlLabel
                value='manual'
                control={<Radio />}
                label='Вручную'
              />
            </SBox>
          </RadioGroup>
        </FormControl>
      </Grid>
      {type === 'pointBuy' && (
        <>
          <Grid item>
            <Typography variant={'h6'}>
              Осталось поинтов: {availablePoints} / {maxPoints}
            </Typography>
          </Grid>
        </>
      )}
      {type && (
        <Grid item container spacing={1}>
          {ABILITY_TYPES.map((abilityType) => {
            const label = AbilityTypeDict[abilityType]
            const abilityValue = abilities[abilityType]
            const abilityCost =
              (abilityValue && pointBuyCost[abilityValue]) || 0

            return (
              <Grid item xs={4} lg={2}>
                <div>
                  <Typography variant={'caption'}>
                    <b>{label}</b>
                  </Typography>
                </div>
                <Select
                  variant={'outlined'}
                  fullWidth
                  value={abilityValue || ''}
                  onChange={(e) =>
                    dispatch.sync(
                      characterModel.actions.setBaseAbilities({
                        abilities: {
                          ...abilities,
                          [abilityType]: e.target.value,
                        },
                      }),
                    )
                  }
                >
                  {type === 'standardArray' && <MenuItem value={0}>-</MenuItem>}
                  {valuesArray.map((value) => {
                    const cost = Number(pointBuyCost[value]) - abilityCost
                    const selected = value === abilityValue
                    const disabled = selected
                      ? false
                      : type === 'standardArray'
                      ? abilityValues.includes(value)
                      : type === 'pointBuy'
                      ? cost > availablePoints
                      : false

                    return (
                      <MenuItem key={value} value={value} disabled={disabled}>
                        {value}
                        {type === 'pointBuy' && !selected && (
                          <Typography
                            variant={'caption'}
                            style={{ marginLeft: 'auto' }}
                          >
                            &nbsp;({cost < 0 ? '+' : ''}
                            {-cost} п.)
                          </Typography>
                        )}
                      </MenuItem>
                    )
                  })}
                </Select>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}
