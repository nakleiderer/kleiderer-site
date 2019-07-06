import Button from '@material-ui/core/Button'
import {
  Theme,
} from '@material-ui/core/styles'
import { graphql, Link } from 'gatsby'
import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstButton: {
      color: theme.palette.text.secondary,
      marginLeft: 'auto',
    },
    button: {
      color: theme.palette.text.secondary,
    },
  }))

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

interface Props{
  category: Category
  index: number
}

const CategoryChip = ({ category, index }: Props) => {
  const classes = useStyles()
  const className = index === 0 ? classes.firstButton : classes.button
  const buttonComponent = React.forwardRef((props, ref) => (
    <Link innerRef={ref as any} to={`/category/${category.fields.slug}`} {...props} />
  ))

  return (
    <Button size="small" className={className} component={buttonComponent as any}>
      {category.frontmatter.name}
    </Button>
  )
}

export default CategoryChip

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
