import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CategoryChip from './category-chip'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  category: {
    marginLeft: 'auto',
  },
  avatar: {},
})

function ArticlePreview({ article, classes }) {
  const isContenfulArticle = article.internal.type === 'ContentfulArticle'
  const elevation = isContenfulArticle ? 1 : 0
  const avatar = isContenfulArticle
    ? article.author.image
    : article.domainFaviconImage && article.domainFaviconImage.childImageSharp
    ? article.domainFaviconImage.childImageSharp
    : false
  const title = article.title
  const subheader = isContenfulArticle
    ? `by ${article.author.name}, published ${article.humanReadablePublishDate}`
    : `from ${article.articleDomain}, read ${article.humanReadablePublishDate}`
  const description = isContenfulArticle
    ? article.description.description
    : article.excerpt
  const image = isContenfulArticle
    ? article.heroImage
    : article.heroImage && article.heroImage.childImageSharp
    ? article.heroImage.childImageSharp
    : false
  const readButtonComponent = isContenfulArticle ? Link : 'a'
  const readButtonComponentParams = isContenfulArticle
    ? { to: `/articles/${article.slug}` }
    : { href: article.url, target: '_blank' }

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
          {...readButtonComponentParams}
        >
          Read
        </Button>
        {article.categories.map(c => (
          <CategoryChip category={c} key={c.id} className={classes.category} />
        ))}
      </CardActions>
    </Card>
  )
}

ArticlePreview.propTypes = {
  classes: PropTypes.object.isRequired,
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
