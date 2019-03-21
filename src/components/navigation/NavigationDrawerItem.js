import { ListItem, ListItemText, withStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

const NavigationDrawerItemText = ({ item }) => (
  <ListItem button>
    <ListItemText primary={item.title} />
  </ListItem>
)

function NavigationDrawerItem({ item, classes }) {
  if (!!item.link) {
    return (
      <Link to={item.link} className={classes.link}>
        <NavigationDrawerItemText item={item} />
      </Link>
    )
  } else if (!!item.externalLink) {
    return (
      <a href={item.externalLink} className={classes.link}>
        <NavigationDrawerItemText item={item} />
      </a>
    )
  }
  return <NavigationDrawerItemText item={item} />
}

NavigationDrawerItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationDrawerItem)
