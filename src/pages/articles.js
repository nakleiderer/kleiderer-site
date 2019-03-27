import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreviewGrid from '../components/article-preview-grid'
import Layout from '../components/layout'
import withRoot from '../withRoot'
import Section from '../components/section'

const styles = theme => ({})

function ArticlesIndex(props) {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const myArticles = get(props, 'data.allContentfulArticle.edges').map(
    a => a.node
  )
  const recommendedArticles = get(props, 'data.allPocketArticle.edges').map(
    a => a.node
  )

  return (
    <Layout
      location={props.location}
      title="Recent articles"
      heroImage={props.data.file.childImageSharp}
    >
      <Helmet title={siteTitle} />
      <Section title="Articles I Wrote" hideIf={!myArticles}>
        <ArticlePreviewGrid articles={myArticles} />
      </Section>
      <Section title="Articles I Recommend" hideIf={!recommendedArticles}>
        <ArticlePreviewGrid articles={recommendedArticles} />
      </Section>
    </Layout>
  )
}

ArticlesIndex.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(ArticlesIndex))

export const pageQuery = graphql`
  query ArticlesIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "typewriter.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 593) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulArticle(sort: { fields: [publishDate], order: DESC }) {
      ...ContentfulArticlePreviewGridComponent
    }
    allPocketArticle(sort: { fields: [timeRead], order: DESC }) {
      ...PocketArticlePreviewGridComponent
    }
  }
`
