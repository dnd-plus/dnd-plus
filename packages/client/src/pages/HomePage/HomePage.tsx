import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'

export function HomePage() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant={'h1'}>DnD+</Typography>
      </Box>
    </Container>
  )
}
