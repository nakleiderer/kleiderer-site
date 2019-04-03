import {
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'
import { NavigationItem as NavigationItemType } from './items'

const styles = (theme: Theme) => createStyles({})

interface Props extends WithStyles<typeof styles> {
  item: NavigationItemType
}

const NavigationItem = ({ item }: Props) => {
  if ('link' in item) {
    const buttonComponent = (props: any) => <Link to={item.link} {...props} />
    return (
      <Button size="small" color="inherit" component={buttonComponent}>
        {item.title}
      </Button>
    )
  } else if ('externalLink' in item) {
    return (
      <Button
        size="small"
        color="inherit"
        component="a"
        href={item.externalLink}
      >
        {item.title}
      </Button>
    )
  } else {
    return <span />
  }
}

export default withStyles(styles)(NavigationItem)
