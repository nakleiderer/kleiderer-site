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
import { arch } from 'os';

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

interface CategoryFields {
  slug: string
}

interface CategoryFrontmatter {
  name: string
}

interface Category {
  id: string,
  fields: CategoryFields,
  frontmatter: CategoryFrontmatter
}

interface Article {
  avatar: any,
  title: string,
  byline: string,
  excerpt: string,
  featuredImage: any,
  readButtonComponent: any,
  categories: Category[]
}

interface Props extends WithStyles<typeof styles> {
  article: Article
}

const ArticlePreview = ({ article, classes }: Props) => {
  const Header = article.avatar && article.avatar.childImageSharp ? <CardHeader
    avatar={<Avatar aria-label="Author" className={classes.avatar}>
      <Img alt="" {...article.avatar.childImageSharp} />
    </Avatar>}
    title={article.title}
    subheader={article.byline}
  /> : <CardHeader
      title={article.title}
      subheader={article.byline}
    />

  return (
    <Card className={classes.card} elevation={1}>
      {Header}
      {article.featuredImage && article.featuredImage.childImageSharp && <Img alt="" {...article.featuredImage.childImageSharp} />}
      <CardContent>
        <Typography component="p">{article.excerpt}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component={article.readButtonComponent}
        >
          Read
        </Button>
        {article.categories.map((c, i: number) => (
          <CategoryChip category={c} key={c.id} index={i} />
        ))}
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(ArticlePreview)
