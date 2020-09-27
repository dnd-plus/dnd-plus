import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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

const baseAbilitiesTypeMap: Record<BaseAbilitiesStateType, string> = {
  standardArray: 'Стандартный массив',
  pointBuy: 'Покупка за поинты',
  manual: 'Вручную',
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

  console.log(characterModel.baseAbilities.use())

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
        <FormControl variant={'outlined'} fullWidth>
          <InputLabel>Вариант значений характеристик</InputLabel>
          <Select
            fullWidth
            value={type || ''}
            label={'Вариант значений характеристик'}
            onChange={(e) =>
              dispatch.sync(
                characterModel.actions.setBaseAbilitiesType({
                  type: e.target.value as BaseAbilitiesStateType,
                }),
              )
            }
          >
            {Object.entries(baseAbilitiesTypeMap).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {type === 'pointBuy' && (
        <Grid item>
          <Typography variant={'subtitle1'}>
            Осталось поинтов: {availablePoints}/{maxPoints}
          </Typography>
        </Grid>
      )}
      {type && (
        <Grid item container spacing={1}>
          {ABILITY_TYPES.map((abilityType) => {
            const label = AbilityTypeDict[abilityType]
            const abilityValue = abilities[abilityType]
            const abilityCost =
              (abilityValue && pointBuyCost[abilityValue]) || 0
            console.log(abilityCost)

            return (
              <Grid item xs={4} md={2}>
                <div>
                  <Typography variant={'subtitle2'}>{label}</Typography>
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
                  <MenuItem value={0}>-</MenuItem>
                  {valuesArray.map((value) => {
                    const disabled =
                      value === abilityValue
                        ? false
                        : type === 'standardArray'
                        ? abilityValues.includes(value)
                        : type === 'pointBuy'
                        ? Number(pointBuyCost[value]) - abilityCost >
                          availablePoints
                        : false

                    return (
                      <MenuItem key={value} value={value} disabled={disabled}>
                        {value}
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
