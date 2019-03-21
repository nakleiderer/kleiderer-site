import { Button, withStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

const NavigationItemText = ({ item }) => (
  <Button size="small" color="inherit">
    {item.title}
  </Button>
)

function NavigationItem({ item, classes }) {
  if (!!item.link) {
    return (
      <Link to={item.link} className={classes.link}>
        <NavigationItemText item={item} />
      </Link>
    )
  } else if (!!item.externalLink) {
    return (
      <a href={item.externalLink} className={classes.link}>
        <NavigationItemText item={item} />
      </a>
    )
  }
  return <NavigationItemText item={item} />
}

NavigationItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationItem)
