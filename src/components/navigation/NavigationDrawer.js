import { List, SwipeableDrawer, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import navigationItems from './items'
import NavigationDrawerItem from './NavigationDrawerItem'

const styles = theme => ({
  list: {
    maxWidth: 250,
  },
})

function NavigationDrawer({ classes, onClose, onOpen, open }) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <div tabIndex={0} role="button" onClick={onClose} onKeyDown={onClose}>
        <div className={classes.list}>
          <List>
            {navigationItems.map(item => (
              <NavigationDrawerItem item={item} key={item.title} />
            ))}
          </List>
        </div>
      </div>
    </SwipeableDrawer>
  )
}

NavigationDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavigationDrawer)
