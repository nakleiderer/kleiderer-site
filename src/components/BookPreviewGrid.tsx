import { Grid } from '@material-ui/core';
import { graphql } from 'gatsby';
import React from 'react';
import BookPreview from './BookPreview';

type Book = any;

interface Props {
  books: Array<Book>;
}

const BookPreviewGrid: React.SFC<Props> = ({ books }) => {
  return (
    <Grid container direction="row" justify="flex-start" spacing={3}>
      {books.map(a => (
        <Grid item key={a.id} xs={12} md={6}>
          <BookPreview book={a} key={a.id} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookPreviewGrid;

export const bookPreviewGridComponentFragment = graphql`
  fragment BookPreviewGridComponent on MarkdownRemarkConnection {
    edges {
      node {
        ...BookPreviewComponent
      }
    }
  }
`;
