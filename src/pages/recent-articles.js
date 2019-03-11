import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import PocketArticlePreview from '../components/pocket-article-preview'

class RecentArticles extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allPocketArticle.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h2>Recently read articles</h2>
            <p className="section-headline">
              Here's a list of articles I've read recently. Though I have read
              these articles, I do not necessarily recommend or agree with their
              content.
            </p>
            <ul className="article-list">
              {posts.map(({ node }) => {
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

export default RecentArticles

export const pageQuery = graphql`
  query RecentArticlesQuery {
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
