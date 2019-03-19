import { Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import React from 'react'

export default ({ data }) => (
  <div>
    <Img alt={data.name} fluid={data.heroImage.fluid} />
    <div>
      <Typography variant="h4">{data.name}</Typography>
      <Typography variant="h5" component="p">
        {data.title}
      </Typography>
      <Typography variant="body1" component="p">
        {data.shortBio.shortBio}
      </Typography>
    </div>
  </div>
)
