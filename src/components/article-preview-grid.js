import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import ArticlePreview from '../components/article-preview'

const styles = theme => ({})

function ArticlePreviewGrid({ articles, classes }) {
  return (
    <Grid container direction="row" justify="flex-start" spacing={24}>
      {articles.map(a => (
        <Grid item key={a.id} xs={12} md={6}>
          <ArticlePreview article={a} key={a.id} />
        </Grid>
      ))}
    </Grid>
  )
}

ArticlePreviewGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ArticlePreviewGrid)

export const articlePreviewGridComponentFragment = graphql`
  fragment ContentfulArticlePreviewGridComponent on ContentfulArticleConnection {
    edges {
      node {
        ...ContentfulArticlePreviewComponent
      }
    }
  }
  fragment PocketArticlePreviewGridComponent on PocketArticleConnection {
    edges {
      node {
        ...PocketArticlePreviewComponent
      }
    }
  }
`
