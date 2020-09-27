import React from 'react'
import MarkdownToJsx, { MarkdownOptions, MarkdownProps } from 'markdown-to-jsx'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'

const SMarkdownToJsx = styled(MarkdownToJsx)`
  *:first-child {
    margin-top: 0;
  }
  *:last-child {
    margin-bottom: 0;
  }
  li {
    font-size: inherit;
  }
`

const overrides: MarkdownOptions['overrides'] = {
  p: (props: any) => (
    <Box my={2}>
      <Typography variant={'body1'} {...props} />
    </Box>
  ),
  li: (props: any) => (
    <li {...props}>
      <Typography variant={'body1'} {...props} />
    </li>
  ),
  button: Button,
  table: (props: any) => (
    <TableContainer component={Paper}>
      <Table {...props} />
    </TableContainer>
  ),
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableCell,
  td: TableCell,
}

export function Markdown({ children, options }: MarkdownProps) {
  return (
    <SMarkdownToJsx
      options={{
        ...options,
        overrides,
      }}
    >
      {children}
    </SMarkdownToJsx>
  )
}
