import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const navigationItems = [
  {
    title: 'Articles',
    link: '/articles',
  },
  {
    title: 'Recommended Articles',
    link: '/recommended-articles',
  },
  {
    title: 'Recommended Software',
  },
]

const styles = theme => ({
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
})

function NavigationItemTypography({ item }) {
  return (
    <Typography color="inherit" noWrap>
      {item.title}
    </Typography>
  )
}

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

function Navigation({ classes }) {
  return (
    <nav role="navigation">
      <Toolbar className={classes.toolbarMain}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
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
        </Typography>
      </Toolbar>
      <Toolbar variant="dense" className={classes.toolbarSecondary}>
        {navigationItems.map(item => (
          <NavigationItem classes={classes} item={item} key={item.title} />
        ))}
      </Toolbar>
    </nav>
  )
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navigation)
