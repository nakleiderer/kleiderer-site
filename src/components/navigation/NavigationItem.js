import { withStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import NavigationItemTypography from './NavigationItemTypography'

const styles = theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

function NavigationItem({ item, classes }) {
  if (!!item.link) {
    return (
      <Link to={item.link} className={classes.link}>
        <NavigationItemTypography item={item} />
      </Link>
    )
  } else if (!!item.externalLink) {
    return (
      <a href={item.externalLink} className={classes.link}>
        <NavigationItemTypography item={item} />
      </a>
    )
  }
  return <NavigationItemTypography item={item} />
}

NavigationItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationItem)
