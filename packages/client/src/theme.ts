import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

export type Theme = typeof theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export default theme
