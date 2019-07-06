import {
  Theme,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreviewGrid from '../components/ArticlePreviewGrid'
import Layout from '../components/Layout'
import Section from '../components/Section'
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface Props {
  location: string
}

const RootIndex = (props: Props) => {
  const classes = useStyles()
  const { title, subtitle, description } = get(props, 'data.site.siteMetadata')
  const heroImage = get(props, 'data.file.childImageSharp')
  const markdownArticles = get(props, 'data.allMarkdownArticle.edges').map(
    (a: any) => a.node
  )
  const pocketArticles = get(props, 'data.allPocketArticle.edges').map(
    (a: any) => a.node
  )

  return (
    <Layout
      title={title}
      subtitle={subtitle}
      description={description}
      heroImage={heroImage}
    >
      <Helmet title={title} />
      <Section title="Recent Articles" hideIf={!markdownArticles.length}>
        <ArticlePreviewGrid articles={markdownArticles} />
      </Section>
      <Section
        title="Recent Recommended Articles"
        hideIf={!pocketArticles.length}
      >
        <ArticlePreviewGrid articles={pocketArticles} />
      </Section>
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
        subtitle
        description
      }
    }
    file(relativePath: { eq: "siteHero.jpg" }) {
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
