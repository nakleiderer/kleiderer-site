import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import RichText from '../components/rich-text'
import withRoot from '../withRoot'

const styles = theme => {}

function ArticleTemplate(props) {
  const article = get(props, 'data.contentfulArticle')
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={`${article.title} | ${siteTitle}`} />
        <Helmet
          meta={[
            { name: 'author', content: article.author.name },
            { name: 'description', content: article.description.description },
          ]}
        />
        <div>
          <Img alt={article.title} fluid={article.heroImage.fluid} />
        </div>
        <div className="wrapper">
          <Typography variant="h1">{article.title}</Typography>
          <Typography variant="subtitle1">
            by {article.author.name} on {article.publishDate}
          </Typography>
          <div>
            <RichText content={article.body.json} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

ArticleTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(ArticleTemplate))

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
        json
      }
    }
  }
`
