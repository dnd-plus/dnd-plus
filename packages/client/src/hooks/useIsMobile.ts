import { useMediaQuery } from '@material-ui/core'
import { useTheme } from 'styled-components'

export function useIsMobile() {
  return useMediaQuery(useTheme().breakpoints.down('sm'))
}
