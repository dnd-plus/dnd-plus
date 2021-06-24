import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectProps,
} from '@material-ui/core'
import React, { ReactNode } from 'react'
import { SBox } from './SBox'
import { groupBy } from 'lodash-es'

export function ChoiceSelect<T extends string | number | undefined>({
  label,
  value = '',
  options,
  onChange,
}: {
  label: string
  value?: T
  options: { text: ReactNode; value: T; group?: string; disabled?: boolean }[]
  onChange: SelectProps['onChange']
}) {
  const groupOptions = groupBy(options, 'group')

  return (
    <SBox mb={1}>
      <FormControl margin={'dense'} variant={'outlined'} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          fullWidth
          value={value}
          label={label}
          error={!options.find((option) => option.value === value)}
          onChange={onChange}
        >
          {Object.entries(groupOptions).map(([label, options]) =>
            [
              label && label !== 'undefined' && (
                <ListSubheader key={label}>{label}</ListSubheader>
              ),
              options.map(({ text, value, disabled }) => (
                <MenuItem key={value} value={value} disabled={disabled}>
                  {text}
                </MenuItem>
              )),
            ].filter(Boolean),
          )}
          {!options.length && (
            <MenuItem disabled>Нет доступных вариантов</MenuItem>
          )}
        </Select>
      </FormControl>
    </SBox>
  )
}
