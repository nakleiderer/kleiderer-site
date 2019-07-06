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
import ArticlePreviewGrid from '../../components/ArticlePreviewGrid'
import Layout from '../../components/Layout'
import Section from '../../components/Section'
import withRoot from '../../withRoot'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  location: string
  data: any
}

const ArticlesIndex = (props: Props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const myArticles = get(props, 'data.allMarkdownArticle.edges').map(
    (a: any) => a.node
  )
  const recommendedArticles = get(props, 'data.allPocketArticle.edges').map(
    (a: any) => a.node
  )

  return (
    <Layout title="Recent articles" heroImage={props.data.file.childImageSharp}>
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
    allMarkdownArticle: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "article" } } }
      sort: { fields: [frontmatter___published_on], order: DESC }
    ) {
      ...MarkdownArticlePreviewGridComponent
    }
    allPocketArticle(sort: { fields: [fields___publishedAt], order: DESC }) {
      ...PocketArticlePreviewGridComponent
    }
  }
`
