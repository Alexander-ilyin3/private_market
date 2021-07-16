import React, { Component } from 'react'
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


const StyledPreloader = withStyles(classes)(Preloader)


export default class PreloaderSingletone extends Component {
  static show() {
    if (PreloaderSingletone.__ref) {
      PreloaderSingletone.__ref.__show()
    }
  }

  static hide() {
    if (PreloaderSingletone.__ref) {
      PreloaderSingletone.__ref.__hide()
    }
  }

  constructor(props) {
    super(props)
    PreloaderSingletone.__ref = this
    this.state = {
      display: false,
    }
  }

  __show() {
    this.setState({ display: true })
  }

  __hide() {
    this.setState({ display: false })
  }

  render() {
    const { display } = this.state
    return display ? <StyledPreloader /> : <></>
  }
}
