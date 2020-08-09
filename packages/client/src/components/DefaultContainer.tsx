import { Container, Grid } from '@material-ui/core'
import React, { ReactNode } from 'react'

export function DefaultContainer({ children = null as ReactNode }) {
  return (
    <Container>
      <Grid item xs={12} sm={8} md={6} lg={5} style={{ margin: 'auto' }}>
        {children}
      </Grid>
    </Container>
  )
}
