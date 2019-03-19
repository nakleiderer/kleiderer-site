import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import CategoryChip from './category-chip'

const styles = {
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
}

function ArticlePreview({ classes, article }) {
  return (
    <Card className={classes.card} elevation={0}>
      <Link className={classes.link} to={`/articles/${article.slug}`}>
        <CardActionArea>
          <Img alt="" fluid={article.heroImage.fluid} />
          <CardContent>
            <Typography variant="h5" component="h2">
              {article.title}
            </Typography>
            <Typography gutterBottom variant="caption">
              by {article.author.name} on {article.publishDate}
            </Typography>
            <Typography
              component="div"
              gutterBottom
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: article.description.childMarkdownRemark.html,
              }}
            />
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.actions}>
        {article.categories.map(category => (
          <CategoryChip category={category} key={category.slug} />
        ))}
      </CardActions>
    </Card>
  )
}

ArticlePreview.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ArticlePreview)

export const articlePreviewQuery = graphql`
  fragment ArticlePreview on ContentfulArticle {
    author {
      name
    }
    title
    slug
    description {
      childMarkdownRemark {
        html
      }
    }
    heroImage {
      fluid(maxWidth: 1180, background: "rgb:000000") {
        ...GatsbyContentfulFluid
      }
    }
    categories {
      ...CategoryChipComponent
    }
    publishDate(formatString: "MMMM Do, YYYY")
  }
`
