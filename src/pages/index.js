import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Hero from '../components/hero'
import Layout from '../components/layout'
import withRoot from '../withRoot'
import Content from '../components/content'

const styles = theme => {}

function RootIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const articles = get(props, 'data.allContentfulArticle.edges')
  const [authorEdge] = get(props, 'data.allContentfulPerson.edges')
  const { node: author } = authorEdge

  return (
    <Layout
      location={props.location}
      title={author.name}
      subtitle={author.title}
      description={author.shortBio.shortBio}
      heroImage={author.heroImage}
    >
      <Helmet title={siteTitle} />
      <Typography variant="h5">Recent articles</Typography>
      <div>
        {articles.map(({ node }) => {
          return <ArticlePreview article={node} key={node.slug} />
        })}
      </div>
    </Layout>
  )
}

RootIndex.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(RootIndex))

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
