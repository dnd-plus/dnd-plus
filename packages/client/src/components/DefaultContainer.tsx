import { Container, Grid, GridProps } from '@material-ui/core'
import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

const SGrid = styled(Grid as React.FC<GridProps & { relative?: boolean }>)`
  margin: auto;
  ${(p) =>
    p.relative &&
    css`
      position: relative;
    `}
`

export function DefaultContainer({
  children = null as ReactNode,
  relative = false,
}) {
  return (
    <Container>
      <SGrid relative={relative} item xs={12} sm={8} md={6} lg={6}>
        {children}
      </SGrid>
    </Container>
  )
}
