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
import ArticlePreviewGrid from '../components/ArticlePreviewGrid'
import Layout from '../components/Layout'
import Section from '../components/Section'
import withRoot from '../withRoot'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  location: string
}

const RootIndex = (props: Props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const [authorEdge] = get(props, 'data.allContentfulPerson.edges')
  const { node: author } = authorEdge
  const contentfulArticles = get(props, 'data.allContentfulArticle.edges').map(
    (a: any) => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    (a: any) => a.node
  )
  const articles = [...contentfulArticles, ...pocketArticles]
    .sort((a, b) => (a.sortableDate > b.sortableDate ? 1 : -1))
    .reverse()

  return (
    <Layout
      title={author.name}
      subtitle={author.title}
      description={author.shortBio.shortBio}
      heroImage={author.heroImage}
    >
      <Helmet title={siteTitle} />
      <Section title="Recent Articles" hideIf={!articles.length}>
        <ArticlePreviewGrid articles={articles} />
      </Section>
    </Layout>
  )
}

export default withRoot(withStyles(styles)(RootIndex))

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle {
      ...ContentfulArticlePreviewGridComponent
    }
    allPocketArticle {
      ...PocketArticlePreviewGridComponent
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(maxHeight: 593) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
