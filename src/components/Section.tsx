import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(6),
    },
  }),
);

interface Props {
  title?: string;
  children?: ReactNode;
  hideIf?: boolean;
}

const Section: React.SFC<Props> = ({ title, children, hideIf }) => {
  const classes = useStyles();
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
  );
};

export default Section;
