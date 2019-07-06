import {
  Theme,
} from '@material-ui/core/styles'
import React, { ReactNode } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      left: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      maxWidth: '100vw',
      position: 'relative',
      right: '50%',
      width: '100vw',
    },
  }))

interface Props {
  children: ReactNode
}

const FullWidth = ({ children }: Props) => {
  const classes = useStyles()
  return <div className={classes.fullWidth}>{children}</div>
}

export default FullWidth
