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
import styled from 'styled-components'

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
type SystemProps = PropsFor<BoxStyleFunction>

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
`
