import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Footer from './footer'
import Navigation from './navigation/Navigation'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

function Template({ location, children, classes }) {
  let header

  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <div>
        <Navigation />
        <main className={classes.layout}>{children}</main>
      </div>
      <Footer />
    </React.Fragment>
  )
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Template)
