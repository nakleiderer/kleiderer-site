import {
  Avatar,
  List,
  SwipeableDrawer,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { graphql, Link, StaticQuery } from 'gatsby'
import React, { SyntheticEvent } from 'react'
import navigationItems from './items'
import NavigationDrawerItem from './NavigationDrawerItem'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarMain: {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
    list: {
      width: 300,
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
  }))

interface Props {
  onClose: (event: SyntheticEvent<{}, Event>) => void
  onOpen: (event: SyntheticEvent<{}, Event>) => void
  open: boolean
}

const NavigationDrawer = ({ onClose, onOpen, open }: Props) => {
  const classes = useStyles()
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
        <Toolbar className={classes.toolbarMain}>
          <Link to="/" className={classes.link}>
            <Avatar className={classes.avatar}>NK</Avatar>
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
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
        </Toolbar>
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

export default NavigationDrawer
