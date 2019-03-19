import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },
})

function CategoryChip({ classes, category }) {
  return (
    <Link className={classes.link} to={`/categories/${category.slug}`}>
      <Button size="small" variant="outlined" className={classes.margin}>
        {category.name}
      </Button>
    </Link>
  )
}

CategoryChip.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryChip)

export const categoryChipComponentFragment = graphql`
  fragment CategoryChipComponent on ContentfulCategory {
    slug
    name
  }
`
