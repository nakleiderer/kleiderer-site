import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Footer from './footer'
import Navigation from './navigation/Navigation'
import Content from './content'
import Hero from './hero'

const styles = theme => ({})

function Template({
  location,
  children,
  classes,
  title,
  subtitle,
  description,
  heroImage,
}) {
  let header

  let rootPath = `/`
  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <div>
        <Navigation />
        <Hero
          title={title}
          subtitle={subtitle}
          description={description}
          heroImage={heroImage}
        />
        <Content>{children}</Content>
      </div>
      <Footer />
    </React.Fragment>
  )
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Template)
