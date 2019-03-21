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

function CategoryTemplate(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const category = get(props, 'data.contentfulCategory')
  const contentfulArticles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    a => a.node
  )
  const articles = [...contentfulArticles, ...pocketArticles]

  return (
    <Layout
      location={props.location}
      title={`${category.name} articles`}
      description={category.description.description}
    >
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <div>
            {articles.map(a => {
              return <ArticlePreview article={a} key={a.id} />
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
      ...CategoryChipComponent
      description {
        description
      }
    }
    allContentfulArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ContentfulArticlePreviewComponent
        }
      }
    }
    allPocketArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: [time_read], order: DESC }
    ) {
      edges {
        node {
          ...PocketArticlePreviewComponent
        }
      }
    }
  }
`
