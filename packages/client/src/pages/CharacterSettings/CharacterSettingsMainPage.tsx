import { useCharacterModel } from 'models/Character/CharacterModelContext'
import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { MuiField } from 'components/MuiField'
import { useDispatch } from 'react-redux'

export function CharacterSettingsMainPage() {
  const characterModel = useCharacterModel()
  const characterName = characterModel.name.use()

  const dispatch = useDispatch()

  return (
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
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  )
}
