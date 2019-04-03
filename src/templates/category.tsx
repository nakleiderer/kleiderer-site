import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreviewGrid from '../components/ArticlePreviewGrid'
import BookPreviewGrid from '../components/BookPreviewGrid'
import Layout from '../components/Layout'
import Section from '../components/Section'
import SoftwarePreviewGrid from '../components/SoftwarePreviewGrid'
import withRoot from '../withRoot'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  location: string
}

const CategoryTemplate = (props: Props) => {
  const { classes } = props
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const category = get(props, 'data.contentfulCategory')
  const contentfulArticles = get(props, 'data.allContentfulArticle.edges').map(
    (a: any) => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    (a: any) => a.node
  )
  const articles = [...contentfulArticles, ...pocketArticles]
    .sort((a, b) => (a.sortableDate > b.sortableDate ? 1 : -1))
    .reverse()
  const books = get(props, 'data.allContentfulBook.edges').map(
    (b: any) => b.node
  )
  const softwares = get(props, 'data.allContentfulSoftware.edges').map(
    (s: any) => s.node
  )

  return (
    <Layout
      title={`${category.name} content`}
      description={category.description.description}
    >
      <div>
        <Helmet title={`${category.name} | ${siteTitle}`} />
        <Section title={`${category.name} software`} hideIf={!softwares.length}>
          <SoftwarePreviewGrid softwares={softwares} />
        </Section>
        <Section title={`${category.name} books`} hideIf={!books.length}>
          <BookPreviewGrid books={books} />
        </Section>
        <Section title={`${category.name} articles`} hideIf={!articles.length}>
          <ArticlePreviewGrid articles={articles} />
        </Section>
      </div>
    </Layout>
  )
}

CategoryTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(CategoryTemplate))

export const articleTemplateQuery = graphql`
  query ArticleByCategory($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: $slug }) {
      ...CategoryChipComponent
      description {
        description
      }
    }
    allContentfulArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      ...ContentfulArticlePreviewGridComponent
    }
    allPocketArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      ...PocketArticlePreviewGridComponent
    }
    allContentfulBook(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      ...ContentfulBookPreviewGridComponent
    }
    allContentfulSoftware(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      ...ContentfulSoftwareGridPreviewComponent
    }
  }
`
