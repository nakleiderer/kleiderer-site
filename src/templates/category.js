import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import { Typography } from '@material-ui/core'
import ArticlePreview from '../components/article-preview'

class ArticleTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const articles = get(this.props, 'data.allContentfulArticle.edges')
    const name = get(this.props, 'data.contentfulCategory.name')

    return (
      <Layout location={this.props.location}>
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
}

export default ArticleTemplate

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
