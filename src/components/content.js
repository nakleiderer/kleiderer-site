import { Button, Grid, Typography, withStyles } from '@material-ui/core'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

function Content({ children, classes }) {
  return <div className={classes.layout}>{children}</div>
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Content)
