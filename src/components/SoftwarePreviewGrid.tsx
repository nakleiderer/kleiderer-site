import { Grid } from '@material-ui/core'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import React from 'react'
import SoftwarePreview from './SoftwarePreview'

const styles = (theme: Theme) => createStyles({})

type Software = any

interface Props extends WithStyles<typeof styles> {
  softwares: Array<Software>
}

const SoftwarePreviewGrid = ({ softwares }: Props) => {
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
