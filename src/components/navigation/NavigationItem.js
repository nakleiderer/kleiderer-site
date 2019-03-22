import { Button, withStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({})

function NavigationItem({ item, classes }) {
  if (!!item.link) {
    return (
      <Button size="small" color="inherit" component={Link} to={item.link}>
        {item.title}
      </Button>
    )
  } else if (!!item.externalLink) {
    return (
      <Button
        size="small"
        color="inherit"
        component="a"
        href={item.externalLink}
      >
        {item.title}
      </Button>
    )
  }
  return (
    <Button size="small" color="inherit">
      {item.title}
    </Button>
  )
}

NavigationItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationItem)
