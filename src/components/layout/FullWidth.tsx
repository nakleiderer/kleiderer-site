import React, { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
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
  }),
);

interface Props {
  children: ReactNode;
}

const FullWidth: React.SFC<Props> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.fullWidth}>{children}</div>;
};

export default FullWidth;
