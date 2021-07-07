import { SyntheticEvent } from 'react'

export function stopPropagation(event: SyntheticEvent) {
  event.stopPropagation()
}
