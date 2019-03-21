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

const styles = theme => ({})

function RootIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const [authorEdge] = get(props, 'data.allContentfulPerson.edges')
  const { node: author } = authorEdge
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
      title={author.name}
      subtitle={author.title}
      description={author.shortBio.shortBio}
      heroImage={author.heroImage}
    >
      <Helmet title={siteTitle} />
      <Typography variant="h5">Recent articles</Typography>
      <div>
        {articles.map(a => {
          return <ArticlePreview article={a} key={a.id} />
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
          ...ContentfulArticlePreviewComponent
        }
      }
    }
    allPocketArticle(sort: { fields: [time_read], order: DESC }) {
      edges {
        node {
          ...PocketArticlePreviewComponent
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
