import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'

export const DangerButton = styled(Button)(
  ({ theme }) => css`
    border-color: ${theme.palette.error.dark};

    &:hover {
      border-color: ${theme.palette.error.main};
    }
  `,
)
