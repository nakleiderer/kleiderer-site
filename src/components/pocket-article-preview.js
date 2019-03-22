import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import CategoryChip from './category-chip'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: 'none',
  },
  actions: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
})

function PocketArticlePreview({ classes, article }) {
  return (
    <Card className={classes.card} elevation={0}>
      <a className={classes.link} href={article.url}>
        <CardActionArea>
          {article.heroImage && article.heroImage.childImageSharp && (
            <Img alt="" fluid={article.heroImage.childImageSharp.fluid} />
          )}
          <CardContent>
            <Typography variant="h5" component="h2">
              {article.title}
            </Typography>

            <Typography gutterBottom variant="caption">
              {`from ${article.articleDomain}, read on ${
                article.humanReadablePublishDate
              }`}
            </Typography>

            <Typography component="p" gutterBottom variant="body1">
              {article.excerpt}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
      <CardActions className={classes.actions}>
        {article.categories.map(category => (
          <CategoryChip category={category} key={category.id} />
        ))}
      </CardActions>
    </Card>
  )
}

PocketArticlePreview.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PocketArticlePreview)

export const pocketArticlePreviewComponentFragment = graphql`
  fragment PocketArticlePreviewComponent on PocketArticle {
    id
    title
    excerpt
    url
    articleDomain
    sortableDate: timeRead
    humanReadablePublishDate: timeRead(formatString: "MMMM Do, YYYY")
    heroImage {
      childImageSharp {
        fluid(maxWidth: 300) {
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
  }
`
