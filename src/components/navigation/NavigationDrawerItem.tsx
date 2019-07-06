import {
  ListItem,
  ListItemText,
  Theme,
} from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'
import { NavigationItem } from './items'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }))

interface Props {
  item: NavigationItem
}

const NavigationDrawerItemText = ({ item }: { item: NavigationItem }) => (
  <ListItem button>
    <ListItemText primary={item.title} />
  </ListItem>
)

function NavigationDrawerItem({ item }: Props) {
  const classes = useStyles()
  if ('link' in item) {
    return (
      <Link to={item.link} className={classes.link}>
        <NavigationDrawerItemText item={item} />
      </Link>
    )
  } else if ('externalLink' in item) {
    return (
      <a href={item.externalLink} className={classes.link}>
        <NavigationDrawerItemText item={item} />
      </a>
    )
  }
  return <NavigationDrawerItemText item={item} />
}

export default NavigationDrawerItem
