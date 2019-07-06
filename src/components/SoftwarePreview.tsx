import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {
  Theme,
} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
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
  }))

type Software = any

interface Props {
  software: Software
}

const SoftwarePreview = ({ software }: Props) => {
  const classes = useStyles();
  const logo = software.frontmatter.logo.childImageSharp

  return (
    <Card className={classes.card}>
      {logo && <Img className={classes.cardMedia} alt="" {...logo} />}
      <div className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Typography component="h2" variant="body1" noWrap>
            {software.frontmatter.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" noWrap>
            {software.frontmatter.description}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          component="a"
          href={software.frontmatter.affiliate_link}
          target="_blank"
        >
          Try
        </Button>
      </CardActions>
    </Card>
  )
}

export default SoftwarePreview

export const softwarePreviewComponentFragment = graphql`
  fragment SoftwarePreviewComponent on MarkdownRemark {
    id
    frontmatter {
      affiliate_link
      description
      logo {
        childImageSharp {
          fixed(width: 64, height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      name
    }
  }
`
