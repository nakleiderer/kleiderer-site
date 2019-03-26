import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import BookPreviewGrid from '../components/book-preview-grid'
import Layout from '../components/layout'
import withRoot from '../withRoot'
import Section from '../components/section'

const styles = theme => ({})

function BooksIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const currentBooks = get(props, 'data.currentlyReading.edges').map(
    b => b.node
  )
  const recommendedBooks = get(props, 'data.recommendedBooks.edges').map(
    b => b.node
  )
  const readBooks = get(props, 'data.readBooks.edges').map(b => b.node)
  const unreadBooks = get(props, 'data.unreadBooks.edges').map(b => b.node)

  return (
    <Layout
      location={props.location}
      title="Books"
      description="A collection of my current, future, and recommended reads."
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

BooksIndex.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(BooksIndex))

export const pageQuery = graphql`
  query BooksIndexQuery {
    site {
      siteMetadata {
        title
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
