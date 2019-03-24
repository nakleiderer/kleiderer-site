import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  firstButton: {
    color: theme.palette.text.secondary,
    marginLeft: 'auto',
  },
  button: {
    color: theme.palette.text.secondary,
  },
})

function CategoryChip({ classes, category, index }) {
  const className = index === 0 ? classes.firstButton : classes.button

  return (
    <Button
      size="small"
      className={className}
      component={Link}
      to={`/categories/${category.slug}`}
    >
      {category.name}
    </Button>
  )
}

CategoryChip.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryChip)

export const categoryChipComponentFragment = graphql`
  fragment CategoryChipComponent on ContentfulCategory {
    id
    slug
    name
    pocketTags
  }
`
