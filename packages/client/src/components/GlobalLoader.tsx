import styled from 'styled-components'
import { LinearProgress } from '@material-ui/core'
import { useStore } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { status } from '@logux/client'

const SLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

export function GlobalLoader() {
  const { client } = useStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timeoutId: any
    const unbind = status(client, (status) => {
      clearTimeout(timeoutId)

      if (['connecting', 'sending'].includes(status)) {
        timeoutId = setTimeout(() => setIsLoading(true), 300)
      } else {
        setIsLoading(false)
      }
    })

    return unbind
  }, [client])

  return isLoading ? <SLinearProgress /> : null
}
