import { Button, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => {}

function NavigationItemTypography({ item }) {
  return (
    <Button size="small" color="inherit">
      {item.title}
    </Button>
  )
}

NavigationItemTypography.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationItemTypography)
