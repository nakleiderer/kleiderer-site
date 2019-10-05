import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6, 0)}`,
    },
  }),
);

const Footer: React.SFC = () => {
  const classes = useStyles();
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
  );
};

export default Footer;
