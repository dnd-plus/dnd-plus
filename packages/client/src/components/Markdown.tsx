import React from 'react'
import MarkdownToJsx, { MarkdownProps } from 'markdown-to-jsx'

export function Markdown(props: MarkdownProps) {
  return <MarkdownToJsx {...props} />
}
