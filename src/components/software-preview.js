import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import CategoryChip from './category-chip'

const styles = theme => ({
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

function SoftwarePreview({ software, classes }) {
  const logo = !!software.logo ? software.logo : false

  return (
    <Card className={classes.card}>
      {/* <Hidden xsDown> */}
      {logo && <Img className={classes.cardMedia} alt="" {...logo} />}
      {/* </Hidden> */}
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="body1" noWrap>
            {software.name}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            color="textSecondary"
            noWrap
          >
            {software.description.description}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={classes.actions}>
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

SoftwarePreview.propTypes = {
  classes: PropTypes.object.isRequired,
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
