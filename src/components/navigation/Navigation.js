import {
  AppBar,
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
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

function Navigation({ classes }) {
  return (
    <nav role="navigation" className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolbarMain}>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
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
          {navigationItems.map(item => (
            <NavigationItem item={item} key={item.title} />
          ))}
        </Toolbar>
      </AppBar>
    </nav>
  )
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navigation)
