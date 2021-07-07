import {
  // borders,
  display,
  flexbox,
  // grid,
  palette,
  // positions,
  // shadows,
  // sizing,
  spacing,
  // typography,
  PropsFor,
  ComposedStyleFunction,
} from '@material-ui/system'
import styled, { css } from 'styled-components'

// Borrowed from Box.d.ts
type BoxStyleFunction = ComposedStyleFunction<
  [
    // typeof borders,
    typeof display,
    typeof flexbox,
    // typeof grid,
    typeof palette,
    // typeof positions,
    // typeof shadows,
    // typeof sizing,
    typeof spacing,
    // typeof typography,
  ]
>
type SystemProps = PropsFor<BoxStyleFunction> & { gap?: number }

export type SBoxProps = SystemProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const SBox = styled.div<SystemProps>`
  ${/* borders */ ''}
  ${display}
  ${flexbox}
  ${/* grid */ ''}
  ${palette}
  ${/* positions */ ''}
  ${/* shadows */ ''}
  ${/* sizing */ ''}
  ${spacing}
  ${/* typography */ ''}
  ${({ gap, theme }) =>
    gap
      ? css`
          gap: ${theme.spacing(gap)}px;
        `
      : ''}
`
