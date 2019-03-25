import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import withRoot from '../withRoot'
import BookPreview from '../components/book-preview'
import { Grid, Typography } from '@material-ui/core'
import SoftwarePreview from '../components/software-preview'

const styles = theme => ({
  section: {
    marginTop: theme.spacing.unit * 6,
  },
})

function CategoryTemplate(props) {
  const { classes } = props
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const category = get(props, 'data.contentfulCategory')
  const contentfulArticles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    a => a.node
  )
  const articles = [...contentfulArticles, ...pocketArticles]
    .sort((a, b) => (a.sortableDate > b.sortableDate ? 1 : -1))
    .reverse()
  const books = get(props, 'data.allContentfulBook.edges').map(b => b.node)
  const softwares = get(props, 'data.allContentfulSoftware.edges').map(
    s => s.node
  )

  return (
    <Layout
      location={props.location}
      title={`${category.name} content`}
      description={category.description.description}
    >
      <div>
        <Helmet title={`${category.name} | ${siteTitle}`} />
        {!!softwares.length && (
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom>
              {category.name} software
            </Typography>
            <Grid container direction="row" justify="flex-start" spacing={24}>
              {softwares.map(a => (
                <Grid item key={a.id} xs={12} sm={6} md={4}>
                  <SoftwarePreview software={a} key={a.id} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {!!books.length && (
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom>
              {category.name} books
            </Typography>
            <Grid container direction="row" justify="flex-start" spacing={24}>
              {books.map(a => (
                <Grid item key={a.id} xs={12} md={6}>
                  <BookPreview book={a} key={a.id} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {!!articles.length && (
          <div className={classes.section}>
            <Typography variant="h5" gutterBottom>
              {category.name} articles
            </Typography>
            <Grid container direction="row" justify="flex-start" spacing={24}>
              {articles.map(a => (
                <Grid item key={a.id} xs={12} md={6}>
                  <ArticlePreview article={a} key={a.id} />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </Layout>
  )
}

CategoryTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(CategoryTemplate))

export const articleTemplateQuery = graphql`
  query ArticleByCategory($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCategory(slug: { eq: $slug }) {
      ...CategoryChipComponent
      description {
        description
      }
    }
    allContentfulArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ContentfulArticlePreviewComponent
        }
      }
    }
    allPocketArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...PocketArticlePreviewComponent
        }
      }
    }
    allContentfulBook(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ContentfulBookPreviewComponent
        }
      }
    }
    allContentfulSoftware(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ContentfulSoftwarePreviewComponent
        }
      }
    }
  }
`
