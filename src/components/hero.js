import {
  Button,
  Grid,
  Typography,
  withStyles,
  createMuiTheme,
} from '@material-ui/core'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

const darkTheme = createMuiTheme({ palette: { type: 'dark' } })

const styles = theme => ({
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
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 6}px ${theme.spacing.unit}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 593,
  },
  primaryText: {
    color: darkTheme.palette.text.primary,
  },
  secondaryText: {
    color: darkTheme.palette.text.secondary,
  },
})

const imgStyle = { objectFit: 'cover', height: 593 }

function Hero({ classes, title, subtitle, description, heroImage }) {
  const shouldRender = title || subtitle || description || heroImage
  const heroUnitClassName = heroImage
    ? classes.heroUnitImage
    : classes.heroUnitNoImage
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
                <Grid container spacing={16} justify="center">
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
  )
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Hero)
