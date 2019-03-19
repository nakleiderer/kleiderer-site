import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import withRoot from '../withRoot'

const styles = theme => {}

function ArticlesIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const articles = get(props, 'data.allContentfulArticle.edges')

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <Typography variant="h4">Recent articles</Typography>
          <div>
            {articles.map(({ node: article }) => {
              return <ArticlePreview article={article} key={article.slug} />
            })}
          </div>
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
          ...ArticlePreview
        }
      }
    }
  }
`
