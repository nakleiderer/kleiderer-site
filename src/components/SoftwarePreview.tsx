import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      maxHeight: 80,
      padding: 8,
    },
    cardDetails: {
      minWidth: 0,
      flex: 1,
    },
    cardMedia: {
      width: 64,
    },
    cardContent: {
      padding: 8,
    },
  })

type Software = any

interface Props extends WithStyles<typeof styles> {
  software: Software
}

const SoftwarePreview = ({ software, classes }: Props) => {
  const logo = !!software.logo ? software.logo : false

  return (
    <Card className={classes.card}>
      {logo && <Img className={classes.cardMedia} alt="" {...logo} />}
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="body1" noWrap>
            {software.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" noWrap>
            {software.description.description}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component="a"
          href={software.affiliateUrl}
          target="_blank"
        >
          Try
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(SoftwarePreview)

export const softwarePreviewComponentFragment = graphql`
  fragment ContentfulSoftwarePreviewComponent on ContentfulSoftware {
    id
    name
    description {
      description
    }
    affiliateUrl
    logo {
      fixed(width: 64, height: 64) {
        ...GatsbyContentfulFixed
      }
    }
  }
`
