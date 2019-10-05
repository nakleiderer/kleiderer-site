import { Theme, Typography } from '@material-ui/core';
import Img from 'gatsby-image';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroUnitImage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.60)',
      width: '100%',
      height: '100%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
    },
    heroUnitNoImage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.60)',
      width: '100%',
      height: '100%',
    },
    image: {
      height: 593,
    },
    heroContent: {
      padding: theme.spacing(6, 1, 6, 1),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    container: {
      position: 'relative',
      width: '100%',
      height: 593,
    },
    primaryText: {
      color: theme.palette.grey[50],
    },
    secondaryText: {
      color: theme.palette.grey[100],
    },
  }),
);

const imgStyle = { objectFit: 'cover', height: 593 };

interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: any;
}

const Hero: React.SFC<Props> = ({
  title,
  subtitle,
  description,
  heroImage,
}) => {
  const classes = useStyles();
  const shouldRender = title || subtitle || description || heroImage;
  const heroUnitClassName = heroImage
    ? classes.heroUnitImage
    : classes.heroUnitNoImage;
  return (
    <div>
      {shouldRender && (
        <div className={classes.container}>
          {heroImage && (
            <Img
              alt={title}
              className={classes.image}
              imgStyle={imgStyle}
              {...heroImage}
            />
          )}
          <div className={heroUnitClassName}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                className={classes.primaryText}
                gutterBottom={!subtitle}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  component="p"
                  variant="h5"
                  align="center"
                  className={classes.primaryText}
                  gutterBottom
                >
                  {subtitle}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="h6"
                  align="center"
                  className={classes.secondaryText}
                  paragraph
                >
                  {description}
                </Typography>
              )}
              {/* <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
