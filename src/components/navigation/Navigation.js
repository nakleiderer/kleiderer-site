import {
  AppBar,
  Avatar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { graphql, Link, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import navigationItems from './items'
import NavigationDrawer from './NavigationDrawer'
import NavigationItem from './NavigationItem'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    marginRight: 10,
    width: 36,
    height: 36,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

class Navigation extends React.Component {
  state = {
    isOpen: false,
  }

  toggleDrawer = open => () => {
    this.setState({
      isOpen: open,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <nav role="navigation" className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar className={classes.toolbarMain}>
            <Hidden mdUp implementation="css">
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Link to="/" className={classes.link}>
              <Avatar className={classes.avatar}>NK</Avatar>
            </Link>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
            >
              <Link to="/" className={classes.link}>
                <StaticQuery
                  query={graphql`
                    query {
                      site {
                        siteMetadata {
                          title
                        }
                      }
                    }
                  `}
                  render={data => data.site.siteMetadata.title}
                />
              </Link>
            </Typography>
            <Hidden smDown implementation="css">
              {navigationItems.map(item => (
                <NavigationItem item={item} key={item.title} />
              ))}
            </Hidden>
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          open={this.state.isOpen}
          onOpen={this.toggleDrawer(true)}
          onClose={this.toggleDrawer(false)}
        />
      </nav>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navigation)
