import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import ContentfulArticlePreview from './contentful-article-preview'
import PocketArticlePreview from './pocket-article-preview'

const styles = theme => ({})

function ArticlePreview({ article }) {
  const isContentfulArticle = article.internal.type === 'ContentfulArticle'
  if (isContentfulArticle) return <ContentfulArticlePreview article={article} />

  const isPocketArticle = article.internal.type === 'PocketArticle'
  if (isPocketArticle) return <PocketArticlePreview article={article} />
}

ArticlePreview.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ArticlePreview)
