import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

let theme = createMuiTheme()
theme = responsiveFontSizes(theme)

export type Theme = typeof theme

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}

export default theme
