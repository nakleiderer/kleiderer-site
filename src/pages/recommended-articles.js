import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import PocketArticlePreview from '../components/pocket-article-preview'
import { Grid, Typography } from '@material-ui/core'

class RecommendedArticles extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const articles = get(this, 'props.data.allPocketArticle.edges')

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={`Recommended Articles | ${siteTitle}`} />
          <div className="wrapper">
            <Typography variant="h2">Recommended Articles</Typography>
            <Typography variant="body1">
              A list of articles that have helped me grow personally and
              professionally.
            </Typography>
            <Grid container spacing={40}>
              {articles.map(({ node }) => {
                return (
                  <Grid item key={node.id} xs={12} md={6}>
                    <PocketArticlePreview article={node} key={node.id} />
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RecommendedArticles

export const pageQuery = graphql`
  query RecommendedArticlesQuery {
    site {
      siteMetadata {
        title
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }, limit: 12) {
      edges {
        node {
          ...PocketArticlePreviewComponent
        }
      }
    }
  }
`
