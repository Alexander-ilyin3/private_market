import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import classes from './Preloader.styles'

function Preloader(props) {
  const { classes } = props
  return (
    <div className={classes.preloader}>
      <div className={classes.cssloadloader}>
        <div className={classNames(classes.cssloadInner, classes.one)} />
        <div className={classNames(classes.cssloadInner, classes.two)} />
        <div className={classNames(classes.cssloadInner, classes.three)} />
      </div>
    </div>
  )
}


export default withStyles(classes)(Preloader)
