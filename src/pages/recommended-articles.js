import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import PocketArticlePreview from '../components/pocket-article-preview'

class RecommendedArticles extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const articles = get(this, 'props.data.allPocketArticle.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`Recommended Articles | ${siteTitle}`} />
          <div className="wrapper">
            <h2>Recommended Articles</h2>
            <p className="section-headline">
              A list of articles that have helped me grow personally and
              professionally.
            </p>
            <ul className="article-list">
              {articles.map(({ node }) => {
                return (
                  <li key={node.id}>
                    <PocketArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
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
    allPocketArticle(
      filter: { title: { regex: "/.+/" }, image: { src: { regex: "/.+/" } } }
      sort: { fields: [time_read], order: DESC }
      limit: 12
    ) {
      edges {
        node {
          id
          title
          excerpt
          url
          image {
            src
          }
        }
      }
    }
  }
`
