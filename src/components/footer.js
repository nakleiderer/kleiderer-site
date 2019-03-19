import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
})

function Footer({ classes }) {
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom />
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        &copy; {new Date().getFullYear()} Nicolas Kleiderer. All rights
        reserved.
      </Typography>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Footer)
