import { graphql } from 'gatsby';
import React from 'react';
import ArticlePreview from '../components/ArticlePreview';

interface ArticleFields {
  publishedAt: string;
  domainFavicon: any;
  categories: [];
  featuredImage: any;
}

interface Article {
  articleDomain: string;
  excerpt: string;
  url: string;
  fields: ArticleFields;
  title: string;
}

interface Props {
  article: Article;
}

const PocketArticlePreview: React.SFC<Props> = ({ article }: Props) => {
  const newArticle = {
    avatar: article.fields.domainFavicon,
    byline: `from ${article.articleDomain}, read ${article.fields.publishedAt}`,
    categories: article.fields.categories || [],
    excerpt: article.excerpt,
    featuredImage: article.fields.featuredImage,
    title: article.title,
    readButtonComponent: React.forwardRef((props, ref) => (
      <a
        ref={ref as any}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )),
  };
  return <ArticlePreview article={newArticle} />;
};

export default PocketArticlePreview;

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
`;
