import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  section: {
    marginTop: theme.spacing.unit * 6,
  },
})

function Section({ title, children, classes, hideIf }) {
  return (
    !hideIf && (
      <div className={classes.section}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </div>
    )
  )
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Section)
