import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Hidden from '@material-ui/core/Hidden'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      maxHeight: 193,
    },
    cardDetails: {
      minWidth: 0,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      width: 128,
    },
    cardContent: {
      flexGrow: 1,
    },
    actions: {
      display: 'flex',
    },
  })

type Book = any;

interface Props extends WithStyles<typeof styles> {
  book: Book
}

const BookPreview = ({ book, classes }: Props) => {
  const cover =
    !!book.frontmatter.cover && !!book.frontmatter.cover.childImageSharp
      ? book.frontmatter.cover.childImageSharp
      : false
  const byline = `by ${book.frontmatter.byLine}`
  // const categories = book.fields.categories || []
  const hasLink = !!book.frontmatter.affiliate_link
  const canBuy = hasLink

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        {cover && <Img className={classes.cardMedia} alt="" {...cover} />}
      </Hidden>
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="h5" noWrap>
            {book.frontmatter.title}
          </Typography>
          <Typography component="h3" variant="subtitle1" noWrap>
            {book.frontmatter.subtitle}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" noWrap gutterBottom>
            {byline}
          </Typography>
          <Typography variant="body2" component="span" noWrap>
            {book.frontmatter.description}
          </Typography>
        </CardContent>
        {canBuy && (
          <CardActions className={classes.actions}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              component="a"
              href={book.frontmatter.affiliate_link}
              target="_blank"
            >
              Buy
            </Button>
          </CardActions>
        )}
      </div>
    </Card>
  )
}

export default withStyles(styles)(BookPreview)

export const bookPreviewComponentFragment = graphql`
  fragment BookPreviewComponent on MarkdownRemark {
    id
    fields {
      categories {
        ...CategoryChipComponent
      }
    }
    frontmatter {
      affiliate_link
      byLine
      cover {
        childImageSharp {
          fluid(maxHeight: 193) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      description
      isCompleted
      subtitle
      title
    }
  }
`
