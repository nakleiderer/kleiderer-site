import { Theme } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/ArticleLayout'
import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import Markdown from '../components/Markdown';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingContainer: {
      padding: theme.spacing(4,0),
    },
    heading: {
      paddingBottom: theme.spacing(4)
    },
    image: {
      width: '100%',
      height: 593,
      borderRadius: 16,
    },
  }))

const imgStyle = { objectFit: 'cover', height: 593 }

interface Props {
  location: string
  data: any
}

const ArticleTemplate = (props: Props) => {
  const classes = useStyles();
  const siteTitle = props.data.site.siteMetadata.title

  const article = props.data.markdownRemark
  const title = article.frontmatter.title
  const subtitle = article.frontmatter.subtitle
  const author = article.frontmatter.author
  const excerpt = article.excerpt
  const publishedAt = article.frontmatter.publishedAt
  const byline = `by ${author} on ${article.frontmatter.publishedAt}`
  const coverImg = article.frontmatter.cover.childImageSharp

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

        <div><Markdown ast={article.htmlAst}/></div>
      </Layout>
    </>
  )
}

export default ArticleTemplate

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
      htmlAst
    }
  }
`
