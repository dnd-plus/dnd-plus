import React from 'react'
import MarkdownToJsx, { MarkdownOptions, MarkdownProps } from 'markdown-to-jsx'
import {
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
import { SBox } from 'components/SBox'

const SMarkdownToJsx = styled(MarkdownToJsx)`
  ${({ theme }) => theme.typography.body1 as any}
  *:first-child {
    margin-top: 0;
  }
  *:last-child {
    margin-bottom: 0;
  }
  ul,
  ol {
    padding-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

const overrides: MarkdownOptions['overrides'] = {
  p: (props: any) => (
    <SBox my={2}>
      <Typography component={'div'} variant={'body1'} {...props} />
    </SBox>
  ),
  li: (props: any) => (
    <li {...props}>
      <Typography component={'div'} variant={'body1'} {...props} />
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

export const Markdown = React.memo(function Markdown({
  children,
  options,
}: MarkdownProps) {
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
})
