import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Img from 'gatsby-image'
import CategoryChip from './category-chip'
import { Link } from 'gatsby'

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

function ArticlePreview(props) {
  const { classes, article } = props
  return (
    <Card className={classes.card}>
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
              component="p"
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
      slug
      name
    }
    publishDate(formatString: "MMMM Do, YYYY")
  }
`
