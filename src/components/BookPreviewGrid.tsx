import { Grid } from '@material-ui/core'
import {
  Theme,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import BookPreview from './BookPreview'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}))

type Book = any

interface Props {
  books: Array<Book>
}

const BookPreviewGrid = ({ books }: Props) => {
  const classes = useStyles()
  return (
    <Grid container direction="row" justify="flex-start" spacing={3}>
      {books.map(a => (
        <Grid item key={a.id} xs={12} md={6}>
          <BookPreview book={a} key={a.id} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BookPreviewGrid

export const bookPreviewGridComponentFragment = graphql`
  fragment BookPreviewGridComponent on MarkdownRemarkConnection {
    edges {
      node {
        ...BookPreviewComponent
      }
    }
  }
`
