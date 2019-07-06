import {
  Theme,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import ArticlePreviewGrid from '../components/ArticlePreviewGrid'
import BookPreviewGrid from '../components/BookPreviewGrid'
import Layout from '../components/Layout'
import Section from '../components/Section'
import SoftwarePreviewGrid from '../components/SoftwarePreviewGrid'
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({}))

interface Props {
  location: string
}

const CategoryTemplate = (props: Props) => {
  const classes = useStyles();
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const category = get(props, 'data.markdownRemark')
  const allMarkdownArticleEdges =
    get(props, 'data.allMarkdownArticle.edges') || []
  const allMarkdownArticle = allMarkdownArticleEdges.map(e => e.node)
  const allPocketArticleEdges = get(props, 'data.allPocketArticle.edges') || []
  const allPocketArticle = allPocketArticleEdges.map(e => e.node)
  const books = get(props, 'data.allMarkdownBook.edges').map((b: any) => b.node)
  const softwares = get(props, 'data.allMarkdownSoftware.edges').map(
    (s: any) => s.node
  )

  return (
    <Layout
      title={`${category.frontmatter.name} content`}
      description={category.frontmatter.description}
    >
      <div>
        <Helmet title={`${category.frontmatter.name} | ${siteTitle}`} />
        <Section
          title={`${category.frontmatter.name} software`}
          hideIf={!softwares.length}
        >
          <SoftwarePreviewGrid softwares={softwares} />
        </Section>
        <Section
          title={`${category.frontmatter.name} books`}
          hideIf={!books.length}
        >
          <BookPreviewGrid books={books} />
        </Section>
        <Section
          title={`${category.frontmatter.name} articles`}
          hideIf={!allMarkdownArticle.length}
        >
          <ArticlePreviewGrid articles={allMarkdownArticle} />
        </Section>
        <Section
          title={`Recommended ${
            category.frontmatter.name === 'Recommended'
              ? ''
              : category.frontmatter.name.toLowerCase()
          } articles`}
          hideIf={!allPocketArticle.length}
        >
          <ArticlePreviewGrid articles={allPocketArticle} />
        </Section>
      </div>
    </Layout>
  )
}

export default CategoryTemplate

export const articleTemplateQuery = graphql`
  query ArticleByCategory($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(
      frontmatter: { templateKey: { eq: "category" } }
      id: { eq: $id }
    ) {
      ...CategoryChipComponent
      frontmatter {
        description
      }
    }
    allMarkdownArticle: allMarkdownRemark(
      filter: {
        fields: { categories: { elemMatch: { id: { eq: $id } } } }
        frontmatter: { templateKey: { eq: "article" } }
      }
      sort: { fields: [frontmatter___published_on], order: DESC }
    ) {
      ...MarkdownArticlePreviewGridComponent
    }
    allPocketArticle(
      filter: { fields: { categories: { elemMatch: { id: { eq: $id } } } } }
      sort: { fields: [fields___publishedAt], order: DESC }
    ) {
      ...PocketArticlePreviewGridComponent
    }
    allMarkdownSoftware: allMarkdownRemark(
      filter: {
        fields: { categories: { elemMatch: { id: { eq: $id } } } }
        frontmatter: { templateKey: { eq: "software" } }
      }
    ) {
      ...SoftwarePreviewGridComponent
    }
    allMarkdownBook: allMarkdownRemark(
      filter: {
        fields: { categories: { elemMatch: { id: { eq: $id } } } }
        frontmatter: { templateKey: { eq: "book" } }
      }
    ) {
      ...BookPreviewGridComponent
    }
  }
`
