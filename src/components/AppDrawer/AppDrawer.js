import React, { Component } from 'react'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

import Menu from 'components/parts/Menu'
import Preloader from 'components/assets/preloader'
import CartIndicator from 'components/parts/CartIndicator'

import AuthRouter from './AuthRouter'

class AppDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      max: true,
    }
  }

  handleDrawerMin = () => {
    this.setState(state => ({ max: !state.max }))
  };

  handleDrawerToggle = status => () => {
    if (status !== undefined) {
      this.setState(() => ({ mobileOpen: status }))
    } else {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
  };

  render() {
    const { classes } = this.props
    const { max, mobileOpen } = this.state
    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          // className={classes.appBar}
          className={classNames(classes.appBar, {
            [classes.appBarShift]: max,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerMin}
              className={classes.miniButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            <CartIndicator />
            <Typography variant='h6' color='inherit' noWrap />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>

          <Hidden smUp implementation='css'>
            <SwipeableDrawer
              // container={this.props.container}
              // variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle(false)}
              onOpen={this.handleDrawerToggle(true)}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClick={this.handleDrawerToggle(false)}
            >
              <Menu />
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              variant='permanent'
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: max,
                [classes.drawerClose]: !max,
              })}
              classes={{
                paper: classNames(classes.drawerPaper, {
                  [classes.drawerOpen]: max,
                  [classes.drawerClose]: !max,
                }),
              }}
              open={max}
            >
              <Menu />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Preloader />
          <AuthRouter />
        </main>
      </div>
    )
  }
}

export default AppDrawer
