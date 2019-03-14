import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
    textDecoration: 'none',
  },
})

function OutlinedChips(props) {
  const { classes, category } = props
  return (
    <Link className={classes.link} to={`/categories/${category.slug}`}>
      <Button size="small" variant="outlined" className={classes.margin}>
        {category.name}
      </Button>
    </Link>
  )
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(OutlinedChips)
