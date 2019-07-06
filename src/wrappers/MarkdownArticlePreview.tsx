import { graphql, Link } from 'gatsby'
import React from 'react'
import ArticlePreview from '../components/ArticlePreview'

type Article = any

interface Props {
  article: Article
}

const MarkdownArticlePreview = ({ article }: Props) => {
  const newArticle = {
    avatar: null,
    byline: `by ${article.frontmatter.author} on ${
      article.frontmatter.publishedAt
    }`,
    categories: article.fields.categories || [],
    excerpt: article.excerpt,
    featuredImage: article.frontmatter.cover,
    title: article.frontmatter.title,
    readButtonComponent: React.forwardRef((props, ref) => (
      <Link innerRef={ref as any} to={`/article/${article.fields.slug}`} {...props} />
    ))
  }
  return <ArticlePreview article={newArticle} />
}

export default MarkdownArticlePreview

export const articlePreviewComponentFragment = graphql`
  fragment MarkdownArticlePreviewComponent on MarkdownRemark {
    id
    excerpt
    fields {
      slug
      categories {
        ...CategoryChipComponent
      }
    }
    frontmatter {
      author
      cover {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      publishedAt: published_on(formatString: "MMMM D, YYYY")
      title
    }
  }
`
