import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import { Typography } from '@material-ui/core'

class ArticlesIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const articles = get(this, 'props.data.allContentfulArticle.edges')

    return (
      <Layout location={this.props.location}>
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
}

export default ArticlesIndex

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
