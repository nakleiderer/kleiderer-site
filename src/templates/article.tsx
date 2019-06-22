import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import RichText from '../components/RichText'
import withRoot from '../withRoot'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  location: string
}

const ArticleTemplate = (props: Props) => {
  const article = get(props, 'data.contentfulArticle')
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout
      title={article.title}
      subtitle={`by ${article.author.name} on ${article.publishDate}`}
      description={article.description.description}
      heroImage={article.heroImage}
    >
      <div>
        <Helmet title={`${article.title} | ${siteTitle}`} />
        <Helmet
          meta={[
            { name: 'author', content: article.author.name },
            { name: 'description', content: article.description.description },
          ]}
        />
        <div>
          <RichText content={article.body.json} />
        </div>
      </div>
    </Layout>
  )
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
