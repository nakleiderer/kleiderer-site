import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import PocketArticlePreview from '../components/pocket-article-preview'
import withRoot from '../withRoot'

const styles = theme => {}

function ArticlesIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const articles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const allCategories = get(props, 'data.allContentfulCategory.edges').map(
    c => c.node
  )
  const recommendedArticles = get(props, 'data.allPocketArticle.edges')
    .map(a => a.node)
    .map(a => {
      const tagsOnArticle = a.tags || []
      const categories = allCategories.filter(c => {
        const tagsInCategory = c.pocketTags || []
        return tagsOnArticle.reduce((acc, tagOnArticle) => {
          return tagsInCategory.includes(tagOnArticle) || acc
        }, false)
      })
      return { ...a, categories }
    })

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <Typography variant="h4">Recent articles</Typography>
          <Grid container spacing={40}>
            {articles.map(a => (
              <Grid item key={a.id} xs={12} md={6}>
                <ArticlePreview article={a} key={a.slug} />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="wrapper">
          <Typography variant="h2">Recommended Articles</Typography>
          <Typography variant="body1">
            A list of articles that have helped me grow personally and
            professionally.
          </Typography>
          <Grid container spacing={40}>
            {recommendedArticles.map(a => {
              return (
                <Grid item key={a.id} xs={12} md={6}>
                  <PocketArticlePreview article={a} key={a.id} />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
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
    allContentfulArticle(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          id
          ...ArticlePreview
        }
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }, limit: 12) {
      edges {
        node {
          id
          ...PocketArticlePreviewComponent
          tags
        }
      }
    }
    allContentfulCategory {
      edges {
        node {
          id
          ...CategoryChipComponent
          pocketTags
        }
      }
    }
  }
`
