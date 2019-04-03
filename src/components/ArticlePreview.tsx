import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import CategoryChip from './CategoryChip'

const styles = (theme: Theme) =>
  createStyles({
    card: {},
    media: {
      height: 0,
      paddingTop: `${(9 / 16) * 100}%`,
    },
    actions: {
      display: 'flex',
    },
    avatar: {},
  })

type Article = any

interface Props extends WithStyles<typeof styles> {
  article: Article
}

const ArticlePreview = ({ article, classes }: Props) => {
  const isContentfulArticle = article.internal.type === 'ContentfulArticle'
  const elevation = isContentfulArticle ? 1 : 1
  const avatar = isContentfulArticle
    ? article.author.image
    : article.domainFaviconImage && article.domainFaviconImage.childImageSharp
    ? article.domainFaviconImage.childImageSharp
    : false
  const title = article.title
  const subheader = isContentfulArticle
    ? `by ${article.author.name}, published ${article.humanReadablePublishDate}`
    : `from ${article.articleDomain}, read ${article.humanReadablePublishDate}`
  const description = isContentfulArticle
    ? article.description.description
    : article.excerpt
  const image = isContentfulArticle
    ? article.heroImage
    : article.heroImage && article.heroImage.childImageSharp
    ? article.heroImage.childImageSharp
    : false
  const readButtonComponent = isContentfulArticle
    ? (props: any) => <Link to={`/articles/${article.slug}`} {...props} />
    : (props: any) => <a href={article.url} target="_blank" {...props} />

  return (
    <Card className={classes.card} elevation={elevation}>
      <CardHeader
        avatar={
          <Avatar aria-label="Author" className={classes.avatar}>
            <Img alt="" {...avatar} />
          </Avatar>
        }
        title={title}
        subheader={subheader}
      />
      {image && <Img alt="" {...image} />}
      <CardContent>
        <Typography component="p">{description}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component={readButtonComponent}
        >
          Read
        </Button>
        {article.categories.map((c: { id: string }, i: number) => (
          <CategoryChip category={c} key={c.id} index={i} />
        ))}
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(ArticlePreview)

export const articlePreviewComponentFragment = graphql`
  fragment ContentfulArticlePreviewComponent on ContentfulArticle {
    id
    author {
      name
      image {
        fixed(width: 40, height: 40) {
          ...GatsbyContentfulFixed
        }
      }
    }
    title
    slug
    description {
      childMarkdownRemark {
        html
      }
      description
    }
    heroImage {
      fluid(maxWidth: 500) {
        ...GatsbyContentfulFluid
      }
    }
    internal {
      type
    }
    categories {
      ...CategoryChipComponent
    }
    sortableDate: publishDate
    humanReadablePublishDate: publishDate(fromNow: true)
  }

  fragment PocketArticlePreviewComponent on PocketArticle {
    id
    title
    excerpt
    url
    articleDomain
    sortableDate: timeRead
    humanReadablePublishDate: timeRead(fromNow: true)
    heroImage {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    internal {
      type
    }
    categories {
      ...CategoryChipComponent
    }
    domainFaviconImage {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
