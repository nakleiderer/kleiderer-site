import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  card: {
    display: 'flex',
    maxHeight: 193,
  },
  cardDetails: {
    minWidth: 0,
    flex: 1,
  },
  cardMedia: {
    width: 128,
  },
})

function BookPreview({ book, classes }) {
  const cover =
    !!book.cover && !!book.cover.childImageSharp
      ? book.cover.childImageSharp
      : false
  const authors = `by ${(book.authors || []).join(', ')}`
  const categories = book.categories || []
  const isRecommended = !!categories.filter(c => c.slug === 'recommended')
    .length
  const hasLink = !!book.amazonAffiliateUrl
  const canBuy = isRecommended && hasLink

  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        {cover && <Img className={classes.cardMedia} alt="" {...cover} />}
      </Hidden>
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="h5">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {authors}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            className={classes.description}
            noWrap
          >
            {book.description}
          </Typography>
        </CardContent>
      </div>
      {canBuy && (
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
        </CardActions>
      )}
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
        fluid(maxHeight: 193) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
