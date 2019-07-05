import { graphql } from 'gatsby'
import React from 'react'
import ArticlePreview from '../components/ArticlePreview';

type Article = any

interface Props {
  article: Article
}

const PocketArticlePreview = ({ article }: Props) => {
    const newArticle = {
        avatar: article.fields.domainFavicon,
        byline: `from ${article.articleDomain}, read ${article.fields.publishedAt}`,
        categories: article.fields.categories || [],
        excerpt: article.excerpt,
        featuredImage: article.fields.featuredImage,
        title: article.title,
        readButtonComponent: (props: any) => <a href={article.url} {...props} />
    }
    return <ArticlePreview article={newArticle}></ArticlePreview>
}

export default PocketArticlePreview

export const articlePreviewComponentFragment = graphql`
  fragment PocketArticlePreviewComponent on PocketArticle {
    id
    articleDomain
    excerpt
    fields {
        categories {
            ...CategoryChipComponent
        }
        domainFavicon {
            childImageSharp {
                fixed(width: 16, height: 16) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        featuredImage {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        publishedAt(fromNow: true)
    }
    title
    url
  }
`
