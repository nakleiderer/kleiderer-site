import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import BookPreviewGrid from '../components/BookPreviewGrid'
import Layout from '../components/Layout'
import Section from '../components/Section'
import withRoot from '../withRoot'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  location: string
  data: any
}

const BooksIndex = (props: Props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const currentBooks = get(props, 'data.currentlyReading.edges').map(
    (b: any) => b.node
  )
  const recommendedBooks = get(props, 'data.recommendedBooks.edges').map(
    (b: any) => b.node
  )
  const readBooks = get(props, 'data.readBooks.edges').map((b: any) => b.node)
  const unreadBooks = get(props, 'data.unreadBooks.edges').map(
    (b: any) => b.node
  )

  return (
    <Layout
      title="Books"
      description="A collection of my current, future, and recommended reads."
      heroImage={props.data.file.childImageSharp}
    >
      <Helmet title={siteTitle} />
      <Section
        title="Books I'm Currently Reading"
        hideIf={!currentBooks.length}
      >
        <BookPreviewGrid books={currentBooks} />
      </Section>
      <Section title="Books I Recommend" hideIf={!recommendedBooks.length}>
        <BookPreviewGrid books={recommendedBooks} />
      </Section>
      <Section title="Books I've Read" hideIf={!readBooks.length}>
        <BookPreviewGrid books={readBooks} />
      </Section>
      <Section title="Books I Plan to Read" hideIf={!unreadBooks.length}>
        <BookPreviewGrid books={unreadBooks} />
      </Section>
    </Layout>
  )
}

export default withRoot(withStyles(styles)(BooksIndex))

export const pageQuery = graphql`
  query BooksIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "bookshelf.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1180) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    currentlyReading: allContentfulBook(
      filter: { isInProgress: { eq: true } }
    ) {
      ...ContentfulBookPreviewGridComponent
    }
    recommendedBooks: allContentfulBook(
      filter: { categories: { elemMatch: { slug: { eq: "recommended" } } } }
    ) {
      ...ContentfulBookPreviewGridComponent
    }
    readBooks: allContentfulBook(
      filter: { isCompleted: { eq: true }, isInProgress: { eq: false } }
    ) {
      ...ContentfulBookPreviewGridComponent
    }
    unreadBooks: allContentfulBook(
      filter: { isCompleted: { eq: false }, isInProgress: { eq: false } }
    ) {
      ...ContentfulBookPreviewGridComponent
    }
  }
`