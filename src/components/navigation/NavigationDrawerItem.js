import { withStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import NavigationDrawerItemTypography from './NavigationItemTypography'

const styles = theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

function NavigationDrawerItem({ item, classes }) {
  if (!!item.link) {
    return (
      <Link to={item.link} className={classes.link}>
        <NavigationDrawerItemTypography item={item} />
      </Link>
    )
  } else if (!!item.externalLink) {
    return (
      <a href={item.externalLink} className={classes.link}>
        <NavigationDrawerItemTypography item={item} />
      </a>
    )
  }
  return <NavigationDrawerItemTypography item={item} />
}

NavigationDrawerItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationDrawerItem)
