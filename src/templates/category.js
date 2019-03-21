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
import PocketArticlePreview from '../components/pocket-article-preview'
import hydratePocketArticleWithCategories from '../utils/hydratePocketArticleWithCategories'

const styles = theme => {}

function CategoryTemplate(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const category = get(props, 'data.contentfulCategory')
  const allCategories = get(props, 'data.allContentfulCategory.edges').map(
    c => c.node
  )

  const articles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges')
    .map(a => a.node)
    .map(hydratePocketArticleWithCategories(allCategories))
    .filter(a =>
      a.categories
        .reduce((acc, current) => {
          acc.push(current.id)
          return acc
        }, [])
        .includes(category.id)
    )

  return (
    <Layout location={props.location}>
      <div>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <Typography variant="h4">{category.name} articles</Typography>
          <div>
            {articles.map(a => {
              return <ArticlePreview article={a} key={a.id} />
            })}
            {pocketArticles.map(a => {
              return <PocketArticlePreview article={a} key={a.id} />
            })}
          </div>
        </div>
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
    }
    allContentfulCategory {
      edges {
        node {
          ...CategoryChipComponent
        }
      }
    }
    allContentfulArticle(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          ...ArticlePreview
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
  }
`
