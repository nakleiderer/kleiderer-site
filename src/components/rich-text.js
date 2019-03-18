import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'

const styles = {}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Typography variant="body1" paragraph={true}>
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <Typography variant="h1">{children}</Typography>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Typography variant="h2">{children}</Typography>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Typography variant="h3">{children}</Typography>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Typography variant="h4">{children}</Typography>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Typography variant="h5">{children}</Typography>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Typography variant="h6">{children}</Typography>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri}>{children}</a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const file = node.data.target.fields.file['en-US']
      const url = `https:${file.url}`
      const { width, height } = file.details.image
      const aspectRatio = width / height
      console.log(node, url)
      return url && <Img fluid={{ src: url, aspectRatio }} />
    },
  },
  // renderMark: {
  //   [MARKS.CODE]: text => <Typography variant="body1">{text}</Typography>,
  // },
}

function RichText({ content }) {
  return documentToReactComponents(content, options)
}

RichText.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RichText)
