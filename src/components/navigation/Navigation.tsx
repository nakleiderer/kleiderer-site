import {
  AppBar,
  Avatar,
  createStyles,
  Hidden,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'
import navigationItems from './items'
import NavigationDrawer from './NavigationDrawer'
import NavigationItem from './NavigationItem'

const styles = (theme: Theme) =>
  createStyles({
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

interface Props extends WithStyles<typeof styles> {}

interface State {
  isOpen: boolean
}

class Navigation extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  toggleDrawer = (open: boolean) => () => {
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

export default withStyles(styles)(Navigation)
