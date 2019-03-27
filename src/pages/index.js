import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreviewGrid from '../components/article-preview-grid'
import Layout from '../components/layout'
import withRoot from '../withRoot'
import Section from '../components/section'

const styles = theme => ({})

function RootIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const [authorEdge] = get(props, 'data.allContentfulPerson.edges')
  const { node: author } = authorEdge
  const contentfulArticles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    a => a.node
  )
  const articles = [...contentfulArticles, ...pocketArticles]
    .sort((a, b) => (a.sortableDate > b.sortableDate ? 1 : -1))
    .reverse()

  return (
    <Layout
      location={props.location}
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

RootIndex.propTypes = {
  classes: PropTypes.object.isRequired,
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
