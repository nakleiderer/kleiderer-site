import { Grid } from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import BookPreview from './BookPreview'

const styles = (theme: Theme) => createStyles({})

type Book = any

interface Props extends WithStyles<typeof styles> {
  books: Array<Book>
}

const BookPreviewGrid = ({ books }: Props) => {
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

export default withStyles(styles)(BookPreviewGrid)

export const bookPreviewGridComponentFragment = graphql`
  fragment BookPreviewGridComponent on MarkdownRemarkConnection {
    edges {
      node {
        ...BookPreviewComponent
      }
    }
  }
`
