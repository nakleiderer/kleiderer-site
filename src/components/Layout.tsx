import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Hero from './Hero';
import Navigation from './navigation/Navigation';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    main: {
      width: 'auto',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
        width: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  }),
);

interface Props {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: any;
}

const Template: React.SFC<Props> = ({
  children,
  title,
  subtitle,
  description,
  heroImage,
}) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <Navigation />
      <Hero
        title={title}
        subtitle={subtitle}
        description={description}
        heroImage={heroImage}
      />
      <div className={classes.layout}>
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Template;
