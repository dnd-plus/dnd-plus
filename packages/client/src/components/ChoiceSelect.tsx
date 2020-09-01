import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core'
import React, { ReactNode } from 'react'

export function ChoiceSelect<T extends string | number | undefined>({
  label,
  value = '',
  options,
  onChange,
}: {
  label: string
  value?: T
  options: { text: ReactNode; value: T; disabled?: boolean }[]
  onChange: SelectProps['onChange']
}) {
  return (
    <Box mb={1}>
      <FormControl margin={'dense'} variant={'outlined'} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          fullWidth
          value={value}
          label={label}
          error={!options.find((option) => option.value === value)}
          onChange={onChange}
        >
          {options.map(({ text, value, disabled }) => (
            <MenuItem key={value} value={value} disabled={disabled}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
