import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { SBox } from 'components/SBox'

export function HomePage() {
  return (
    <Container>
      <SBox my={4}>
        <Typography variant={'h1'}>DnD+</Typography>
      </SBox>
    </Container>
  )
}
