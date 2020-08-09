import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Field, Form } from 'react-final-form'
import { useDispatch, useStore } from 'react-redux'
import { characterActions } from 'common/modules/character/redux'
import { parseId } from '@logux/core'
import { MuiField } from 'components/MuiField'
import { characterNameValidator } from 'common/modules/character/validators'
import styled from 'styled-components'

const SDialogInner = styled.div`
  width: 450px;
  max-width: 100%;
`

export function CreateCharacterForm(props: {
  onClose: () => void
  open: boolean
}) {
  const dispatch = useDispatch()
  const { userId } = parseId(useStore().client.nodeId)

  return (
    <Dialog {...props}>
      <Form
        onSubmit={({ name }: { name: string }) => {
          dispatch.sync(characterActions.create({ name: name.trim(), userId }))
          props.onClose()
        }}
        subscription={{}}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <SDialogInner>
              <DialogTitle>Создание персонажа</DialogTitle>
              <DialogContent>
                <Field
                  name={'name'}
                  label={'Имя персонажа'}
                  validate={characterNameValidator}
                  autoComplete={'off'}
                  component={MuiField}
                />
              </DialogContent>
              <DialogActions>
                <Button type={'button'} onClick={props.onClose}>
                  Отмена
                </Button>
                <Button type={'submit'} color={'primary'}>
                  Создать
                </Button>
              </DialogActions>
            </SDialogInner>
          </form>
        )}
      </Form>
    </Dialog>
  )
}
