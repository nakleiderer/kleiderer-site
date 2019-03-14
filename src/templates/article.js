import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class ArticleTemplate extends React.Component {
  render() {
    const article = get(this.props, 'data.contentfulArticle')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${article.title} | ${siteTitle}`} />
          <Helmet
            meta={[
              { name: 'author', content: article.author.name },
              { name: 'description', content: article.description.description },
            ]}
          />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={article.title}
              fluid={article.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{article.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              by {article.author.name} on {article.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: article.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default ArticleTemplate

export const articleTemplateQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulArticle(slug: { eq: $slug }) {
      author {
        name
      }
      title
      description {
        description
      }
      categories {
        slug
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
