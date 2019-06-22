import {
  documentToReactComponents,
  Options,
  CommonNode,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, Block, Inline } from '@contentful/rich-text-types'
import { Typography } from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Img from 'gatsby-image'
import React from 'react'

const styles = (theme: Theme) => createStyles({})

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="body1" paragraph={true}>
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_1]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h1">{children}</Typography>
    ),
    [BLOCKS.HEADING_2]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h2">{children}</Typography>
    ),
    [BLOCKS.HEADING_3]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h3">{children}</Typography>
    ),
    [BLOCKS.HEADING_4]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h4">{children}</Typography>
    ),
    [BLOCKS.HEADING_5]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h5">{children}</Typography>
    ),
    [BLOCKS.HEADING_6]: (_node: CommonNode, children: React.ReactNode) => (
      <Typography variant="h6">{children}</Typography>
    ),
    [BLOCKS.LIST_ITEM]: (_node: CommonNode, children: React.ReactNode) => (
      <li>{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: CommonNode, children: React.ReactNode) => (
      <a href={node.data.uri}>{children}</a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: CommonNode, _children: React.ReactNode) => {
      const file = node.data.target.fields.file['en-US']
      const url = `https:${file.url}`
      const { width, height } = file.details.image
      const aspectRatio = width / height
      return url && <Img fluid={{ src: url, aspectRatio } as any} />
    },
  },
  // renderMark: {
  //   [MARKS.CODE]: text => <Typography variant="body1">{text}</Typography>,
  // },
}

interface Props extends WithStyles<typeof styles> {
  content: any
}

const RichText = ({ content }: Props) => {
  return <div>{documentToReactComponents(content, options)}</div>
}

export default withStyles(styles)(RichText)
