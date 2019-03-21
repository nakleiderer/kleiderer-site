import { ListItem, ListItemText, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => {}

function NavigationItemTypography({ item }) {
  return (
    <li>
      <ListItem button>
        <ListItemText primary={item.title} />
      </ListItem>
    </li>
  )
}

NavigationItemTypography.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationItemTypography)
