import { Container, Grid, GridProps } from '@material-ui/core'
import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'

const SGrid = styled(
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  ({ relative, ...p }: GridProps & { relative?: boolean }) => <Grid {...p} />,
)`
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
      <SGrid relative={relative} item xs={12} sm={8} md={8} lg={7}>
        {children}
      </SGrid>
    </Container>
  )
}
