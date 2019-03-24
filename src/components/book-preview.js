import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Hidden,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Img from 'gatsby-image'
import CategoryChip from './category-chip'

const styles = theme => ({
  card: {
    // display: 'flex',
    // flexDirection: 'column',
    height: 193,
    maxWidth: 500,
  },
  cardDetails: {
    display: 'flex',
    // flexDirection: 'column',
    // flex: 1,
    // padding: 0,
  },
  cardMedia: {
    width: 128,
    height: 193,
  },
  actions: {
    display: 'flex',
    flex: 1,
    // padding: 0,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    '&:last-child': {
      paddingBottom: 0,
    },
    paddingLeft: 4,
    paddingRight: 4,
  },
  grow: {
    flexGrow: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  description: {
    maxHeight: '2.9em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
})

function BookPreview({ classes, book }) {
  const cover =
    !!book.cover && !!book.cover.childImageSharp
      ? book.cover.childImageSharp
      : false
  const authors = (book.authors || []).join(', ')
  const categories = book.categories || []
  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        {cover && <Img className={classes.cardMedia} alt="" {...cover} />}
        <CardContent className={classes.cardContent}>
          <div className={classes.grow}>
            <Typography component="span" variant="h6">
              {book.title}
            </Typography>
            {!!authors && (
              <Typography
                component="span"
                variant="body1"
                color="textSecondary"
                gutterBottom
              >
                by {authors}
              </Typography>
            )}
            <Typography
              component="p"
              variant="body2"
              className={classes.description}
            >
              {book.description}
            </Typography>
          </div>
          <CardActions className={classes.actions}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              component="a"
              href={book.amazonAffiliateUrl}
              target="_blank"
            >
              Buy
            </Button>
            {categories.map((c, i) => (
              <CategoryChip category={c} key={c.id} index={i} />
            ))}
          </CardActions>
        </CardContent>
      </div>
    </Card>
  )
}

BookPreview.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BookPreview)

export const bookPreviewComponentFragment = graphql`
  fragment ContentfulBookPreviewComponent on ContentfulBook {
    id
    title
    authors
    description
    amazonAffiliateUrl
    categories {
      ...CategoryChipComponent
    }
    cover {
      childImageSharp {
        fluid(maxWidth: 128) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
