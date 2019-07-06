import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/ArticleLayout'
import withRoot from '../withRoot'
import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'

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

  const article = props.data.markdownRemark
  const title = article.frontmatter.title
  const subtitle = article.frontmatter.subtitle
  const author = article.frontmatter.author
  const excerpt = article.excerpt
  const publishedAt = article.frontmatter.publishedAt
  const byline = `by ${author} on ${article.frontmatter.publishedAt}`
  const coverImg = article.frontmatter.cover.childImageSharp
  const html = article.html

  return (
    <>
      <Layout>
        <Helmet title={`${title} | ${siteTitle}`} />
        <Helmet
          meta={[
            { name: 'author', content: author },
            { name: 'description', content: excerpt },
          ]}
        />

        <div className={classes.headingContainer}>
          <div className={classes.heading}>
            <Typography component="h1" variant="h3" gutterBottom={!subtitle}>
              {title}
            </Typography>
            {subtitle && (
              <Typography
                component="p"
                variant="h5"
                color="textSecondary"
                gutterBottom={!(author && publishedAt)}
              >
                {subtitle}
              </Typography>
            )}
            {author && publishedAt && (
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

        <div dangerouslySetInnerHTML={{ __html: html }} />
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt
      frontmatter {
        author
        cover {
          childImageSharp {
            fluid(maxHeight: 593) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        publishedAt: published_on(formatString: "MMMM D, YYYY")
        subtitle
        title
      }
      html
    }
  }
`
