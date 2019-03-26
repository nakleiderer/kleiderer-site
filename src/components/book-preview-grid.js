import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import BookPreview from '../components/book-preview'

const styles = theme => ({})

function BookPreviewGrid({ books, classes }) {
  return (
    <Grid container direction="row" justify="flex-start" spacing={24}>
      {books.map(a => (
        <Grid item key={a.id} xs={12} md={6}>
          <BookPreview book={a} key={a.id} />
        </Grid>
      ))}
    </Grid>
  )
}

BookPreviewGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BookPreviewGrid)

export const bookPreviewGridComponentFragment = graphql`
  fragment ContentfulBookPreviewGridComponent on ContentfulBookConnection {
    edges {
      node {
        ...ContentfulBookPreviewComponent
      }
    }
  }
`
