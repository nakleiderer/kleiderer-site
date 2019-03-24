import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import withRoot from '../withRoot'

const styles = theme => ({})

function ArticlesIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
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
    <Layout location={props.location} title="Recent articles">
      <Helmet title={siteTitle} />
      <Grid container direction="row" justify="flex-start" spacing={24}>
        {articles.map(a => (
          <Grid item key={a.id} xs={12} md={6}>
            <ArticlePreview article={a} key={a.id} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

ArticlesIndex.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(ArticlesIndex))

export const pageQuery = graphql`
  query ArticlesIndexQuery {
    site {
      siteMetadata {
        title
      }
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
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulArticle(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          ...ContentfulArticlePreviewComponent
        }
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }) {
      edges {
        node {
          ...PocketArticlePreviewComponent
        }
      }
    }
  }
`
