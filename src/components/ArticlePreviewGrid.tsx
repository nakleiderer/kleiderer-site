import { Grid } from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import MarkdownArticlePreview from '../wrappers/MarkdownArticlePreview';
import PocketArticlePreview from '../wrappers/PocketArticlePreview';

const styles = (theme: Theme) => createStyles({})

type Article = any

interface Props extends WithStyles<typeof styles> {
  articles: Array<Article>
}

const ArticlePreviewGrid = ({ articles }: Props) => {
  return (
    <Grid container direction="row" justify="flex-start" spacing={24}>
      {articles.map(a => (
        <Grid item key={a.id} xs={12} md={6}>
          {a.__typename === "MarkdownRemark" ? <MarkdownArticlePreview article={a} key={a.id} /> : <></>}
          {a.__typename === "PocketArticle" ? <PocketArticlePreview article={a} key={a.id} /> : <></>}
        </Grid>
      ))}
    </Grid>
  )
}

export default withStyles(styles)(ArticlePreviewGrid)

export const articlePreviewGridComponentFragment = graphql`
  fragment MarkdownArticlePreviewGridComponent on MarkdownRemarkConnection {
    edges {
      node {
        __typename
        ...MarkdownArticlePreviewComponent
      }
    }
  }
  fragment PocketArticlePreviewGridComponent on PocketArticleConnection {
    edges {
      node {
        __typename
        ...PocketArticlePreviewComponent
      }
    }
  }
`
