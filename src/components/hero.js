import { Button, Grid, Typography, withStyles } from '@material-ui/core'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 6}px ${theme.spacing.unit}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  image: {
    height: 593,
  },
})

const imgStyle = { objectFit: 'cover', height: 593 }

function Hero({ classes, title, subtitle, description, heroImage }) {
  const shouldRender = title || subtitle || description || heroImage
  return (
    <div>
      {shouldRender && (
        <div>
          {heroImage && (
            <Img
              className={classes.image}
              alt={title}
              imgStyle={imgStyle}
              {...heroImage}
            />
          )}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom={!subtitle}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography
                  component="p"
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {subtitle}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
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
