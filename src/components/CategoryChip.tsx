import Button from '@material-ui/core/Button'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql, Link } from 'gatsby'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    firstButton: {
      color: theme.palette.text.secondary,
      marginLeft: 'auto',
    },
    button: {
      color: theme.palette.text.secondary,
    },
  })

interface CategoryFields {
  slug: string
}

interface CategoryFrontmatter {
  name: string
}

interface Category {
  id: string
  fields: CategoryFields
  frontmatter: CategoryFrontmatter
}

interface Props extends WithStyles<typeof styles> {
  category: Category
  index: number
}

const CategoryChip = ({ classes, category, index }: Props) => {
  const className = index === 0 ? classes.firstButton : classes.button
  const buttonComponent = (props: any) => (
    <Link to={`/category/${category.fields.slug}`} {...props} />
  )

  return (
    <Button size="small" className={className} component={buttonComponent}>
      {category.frontmatter.name}
    </Button>
  )
}

export default withStyles(styles)(CategoryChip)

export const categoryChipComponentFragment = graphql`
  fragment CategoryChipComponent on MarkdownRemark {
    id
    fields {
      slug
    }
    frontmatter {
      name
    }
  }
`
