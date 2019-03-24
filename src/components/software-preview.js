import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'
import CategoryChip from './category-chip'

const styles = theme => ({
  card: {
    height: 128,
    maxWidth: 500,
  },
  cardDetails: {
    display: 'flex',
  },
  cardMedia: {
    width: 128,
    height: 128,
  },
  actions: {
    display: 'flex',
    flex: 1,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    '&:last-child': {
      paddingBottom: 0,
    },
    paddingLeft: 4,
    paddingRight: 4,
  },
  grow: {
    flexGrow: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  description: {
    maxHeight: '2.9em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

function SoftwarePreview({ classes, software }) {
  const logo = !!software.logo ? software.logo : false
  const categories = software.categories || []

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        {logo && <Img className={classes.cardMedia} alt="" {...logo} />}
        <CardContent className={classes.cardContent}>
          <div className={classes.grow}>
            <Typography component="span" variant="body1">
              {software.name}
            </Typography>
            <Typography
              component="p"
              variant="caption"
              className={classes.description}
            >
              {software.description.description}
            </Typography>
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
            {categories.map((c, i) => (
              <CategoryChip category={c} key={c.id} index={i} />
            ))}
          </CardActions>
        </CardContent>
      </div>
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
    categories {
      ...CategoryChipComponent
    }
    logo {
      fixed(width: 128, height: 128) {
        ...GatsbyContentfulFixed
      }
    }
  }
`
