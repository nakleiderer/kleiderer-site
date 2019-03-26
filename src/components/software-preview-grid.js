import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import SoftwarePreview from './software-preview'

const styles = theme => ({})

function SoftwarePreviewGrid({ softwares, classes }) {
  return (
    <Grid container direction="row" justify="flex-start" spacing={24}>
      {softwares.map(s => (
        <Grid item key={s.id} xs={12} sm={6} md={4}>
          <SoftwarePreview software={s} key={s.id} />
        </Grid>
      ))}
    </Grid>
  )
}

SoftwarePreviewGrid.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SoftwarePreviewGrid)

export const softwarePreviewGridComponentFragment = graphql`
  fragment ContentfulSoftwareGridPreviewComponent on ContentfulSoftwareConnection {
    edges {
      node {
        ...ContentfulSoftwarePreviewComponent
      }
    }
  }
`
