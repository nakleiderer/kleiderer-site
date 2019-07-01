import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import React, { ReactNode } from 'react'

const styles = (theme: Theme) =>
  createStyles({
    fullWidth: {
      left: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      maxWidth: '100vw',
      position: 'relative',
      right: '50%',
      width: '100vw',
    },
  })

interface Props extends WithStyles<typeof styles> {
  children: ReactNode
}

const FullWidth = ({ children, classes }: Props) => {
  return <div className={classes.fullWidth}>{children}</div>
}

export default withStyles(styles)(FullWidth)
