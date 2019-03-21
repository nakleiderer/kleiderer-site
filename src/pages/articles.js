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
import hydratePocketArticleWithCategories from '../utils/hydratePocketArticleWithCategories'
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
    .map(hydratePocketArticleWithCategories(allCategories))

  return (
    <Layout location={props.location} title="Recent articles">
      <Helmet title={siteTitle} />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={24}
      >
        {articles.map(a => (
          <Grid item key={a.id} xs={12} md={6}>
            <ArticlePreview article={a} key={a.slug} />
          </Grid>
        ))}
        {recommendedArticles.map(a => {
          return (
            <Grid item key={a.id} xs={12} md={6}>
              <PocketArticlePreview article={a} key={a.id} />
            </Grid>
          )
        })}
      </Grid>
      {
        // <Typography variant="h2">Recommended Articles</Typography>
        // <Typography variant="body1">
        //   A list of articles that have helped me grow personally and
        //   professionally.
        // </Typography>
        // <Grid container spacing={40}>
        // {recommendedArticles.map(a => {
        //     return (
        //       <Grid item key={a.id} xs={12} md={6}>
        //         <PocketArticlePreview article={a} key={a.id} />
        //       </Grid>
        //     )
        //   })}
        // </Grid>
      }
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
