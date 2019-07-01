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
import Layout from '../components/ArticleLayout'
import withRoot from '../withRoot'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Section from '../components/Section'
import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import classnames from 'classnames'
import FullWidth from '../components/layout/FullWidth'

const styles = (theme: Theme) =>
  createStyles({
    headingContainer: {
      padding: `${theme.spacing.unit * 4}px 0`,
    },
    heading: {
      paddingBottom: `${theme.spacing.unit * 4}px`,
    },
    image: {
      width: '100%',
      height: 593,
      borderRadius: 16,
    },
  })

const imgStyle = { objectFit: 'cover', height: 593 }

interface Props extends WithStyles<typeof styles> {
  location: string
  data: any
}

const ArticleTemplate = (props: Props) => {
  const classes = props.classes
  const siteTitle = props.data.site.siteMetadata.title

  const article = props.data.mdx
  const {
    author,
    cover,
    excerpt,
    publishDate,
    subtitle,
    title,
  } = article.frontmatter
  const byline = `by ${author} on ${publishDate}`
  const coverImg = cover.childImageSharp

  return (
    <>
      <Layout>
        <Helmet title={`${article.frontmatter.title} | ${siteTitle}`} />
        <Helmet
          meta={[
            { name: 'author', content: author },
            { name: 'description', content: excerpt },
          ]}
        />

        <div className={classes.headingContainer}>
          <div className={classes.heading}>
            <Typography component="h1" variant="h3" gutterBottom={!subtitle}>
              {article.frontmatter.title}
            </Typography>
            {subtitle && (
              <Typography
                component="p"
                variant="h5"
                color="textSecondary"
                gutterBottom={!(author && publishDate)}
              >
                {subtitle}
              </Typography>
            )}
            {author && publishDate && (
              <Typography
                component="p"
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {byline}
              </Typography>
            )}
          </div>

          <Img
            alt={title}
            className={classes.image}
            imgStyle={imgStyle}
            {...coverImg}
          />
        </div>

        <MDXRenderer>{article.code.body}</MDXRenderer>
      </Layout>
    </>
  )
}

export default withRoot(withStyles(styles)(ArticleTemplate))

export const articleTemplateQuery = graphql`
  query ArticleById($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        subtitle
        author
        excerpt
        publishDate: published_on(formatString: "MMMM Do, YYYY")
        cover {
          childImageSharp {
            fluid(maxHeight: 593) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`
