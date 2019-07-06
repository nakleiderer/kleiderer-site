import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import React, { ReactNode } from 'react'
import Footer from './Footer'
import Navigation from './navigation/Navigation'
import { Typography } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    main: {
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

interface Props extends WithStyles<typeof styles> {
  children: ReactNode
  title?: string
  subtitle?: string
  description?: string
  heroImage?: any
}

const Template = ({ children, classes }: Props) => {
  return (
    <>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <Navigation />
      <div className={classes.layout}>
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default withStyles(styles)(Template)
