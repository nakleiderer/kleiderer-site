import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { ReactNode } from 'react'

const styles = (theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing.unit * 6,
    },
  })

interface Props extends WithStyles<typeof styles> {
  title?: string
  children?: ReactNode
  hideIf?: boolean
}

const Section = ({ title, children, classes, hideIf }: Props) => {
  return (
    <div>
      {!hideIf && (
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          {children}
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(Section)
