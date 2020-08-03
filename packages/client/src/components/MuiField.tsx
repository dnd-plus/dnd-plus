import { TextFieldProps } from '@material-ui/core/TextField/TextField'
import { FieldRenderProps } from 'react-final-form'
import { TextField } from '@material-ui/core'
import React from 'react'

export function MuiField({
  input,
  meta,
  ...rest
}: TextFieldProps & FieldRenderProps<string>) {
  const fieldError = meta.touched && meta.error
  const submitError = !meta.dirtySinceLastSubmit && meta.submitError
  const error = submitError || fieldError

  return (
    <TextField
      label={'Логин'}
      error={!!error}
      helperText={error}
      disabled={meta.submitting}
      fullWidth
      variant={'filled'}
      {...rest}
      {...input}
    />
  )
}
