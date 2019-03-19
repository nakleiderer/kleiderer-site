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

function CategoryTemplate(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const articles = get(props, 'data.allContentfulArticle.edges')
  const name = get(props, 'data.contentfulCategory.name')

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <Typography variant="h4">{name} articles</Typography>
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
      name
    }
    allContentfulArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ArticlePreview
        }
      }
    }
  }
`
