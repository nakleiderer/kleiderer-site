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
import { MDXProvider } from "@mdx-js/react";
import { Typography } from '@material-ui/core';
import Code from './Code';

const components = {
  p: (props: any) => <Typography variant="body1" paragraph={true} {...props} />,
  h1: (props: any) => <Typography variant="h1" gutterBottom={true}  {...props} />,
  h2: (props: any) => <Typography variant="h2" gutterBottom={true}  {...props} />,
  h3: (props: any) => <Typography variant="h3" gutterBottom={true}  {...props} />,
  h4: (props: any) => <Typography variant="h4" gutterBottom={true}  {...props} />,
  h5: (props: any) => <Typography variant="h5" gutterBottom={true}  {...props} />,
  h6: (props: any) => <Typography variant="h6" gutterBottom={true}  {...props} />,
  li: (props: any) => <Typography variant="body1" {...props} />,
  pre: Code,
}

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

const Template = ({
  children,
  classes,
}: Props) => {
  return (
    <MDXProvider components={components}>
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
    </MDXProvider>
  )
}

export default withStyles(styles)(Template)
