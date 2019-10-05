import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import BookPreviewGrid from '../../components/BookPreviewGrid';
import Layout from '../../components/Layout';
import Section from '../../components/Section';

interface Props {
  location: string;
  data: any;
}

const BooksIndex: React.SFC<Props> = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const recommendedBooks = get(props, 'data.recommendedBooks.edges').map(
    (b: any) => b.node,
  );
  const readBooks = get(props, 'data.readBooks.edges').map((b: any) => b.node);
  const unreadBooks = get(props, 'data.unreadBooks.edges').map(
    (b: any) => b.node,
  );

  return (
    <Layout
      title="Books"
      description="A collection of my current, future, and recommended reads."
      heroImage={props.data.file.childImageSharp}
    >
      <Helmet title={siteTitle} />
      <Section title="Books I Recommend" hideIf={!recommendedBooks.length}>
        <BookPreviewGrid books={recommendedBooks} />
      </Section>
      <Section title="Books I've Read" hideIf={!readBooks.length}>
        <BookPreviewGrid books={readBooks} />
      </Section>
      <Section title="Books I Plan to Read" hideIf={!unreadBooks.length}>
        <BookPreviewGrid books={unreadBooks} />
      </Section>
    </Layout>
  );
};

export default BooksIndex;

export const pageQuery = graphql`
  query BooksIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "bookshelf.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1180) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    recommendedBooks: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "book" }, isCompleted: { eq: true } }
        fields: {
          categories: {
            elemMatch: { frontmatter: { name: { eq: "Recommended" } } }
          }
        }
      }
      sort: { fields: [fields___slug], order: ASC }
    ) {
      ...BookPreviewGridComponent
    }
    readBooks: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "book" }, isCompleted: { eq: true } }
      }
      sort: { fields: [fields___slug], order: ASC }
    ) {
      ...BookPreviewGridComponent
    }
    unreadBooks: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "book" }, isCompleted: { eq: false } }
      }
      sort: { fields: [fields___slug], order: ASC }
    ) {
      ...BookPreviewGridComponent
    }
  }
`;
