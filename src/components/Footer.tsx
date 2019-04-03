import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing.unit * 8,
      padding: `${theme.spacing.unit * 6}px 0`,
    },
  })

interface Props extends WithStyles<typeof styles> {}

const Footer = ({ classes }: Props) => {
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

export default withStyles(styles)(Footer)
