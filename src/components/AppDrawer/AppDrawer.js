import React, { Component } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

import Menu from 'components/parts/Menu';
import AuthRouter from './AuthRouter';
import Preloader from 'components/assets/preloader';

import { logout } from 'services/api';

class AppDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      max: true,
    };
  }

  handleDrawerMin = () => {
    this.setState(state => ({ max: !state.max }));
  };

  handleDrawerToggle = (status) => () => {
    if (status !== undefined) {
      this.setState(() => ({ mobileOpen: status }));
    } else {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }
  };

  render() {
    const { classes, isLoading } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed"
          // className={classes.appBar}
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.max,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerMin}
              className={classes.miniButton}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow}></div>
            <Button
              size='small'
              color="inherit"
              variant='text'
              onClick={logout}
            >Выход</Button>
            <Typography variant="h6" color="inherit" noWrap>

            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>

          <Hidden mdUp implementation="css">
            <SwipeableDrawer
              // container={this.props.container}
              // variant="temporary"
              open={this.state.mobileOpen}
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
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.max,
                [classes.drawerClose]: !this.state.max,
              })}
              classes={{
                paper: classNames(classes.drawerPaper, {
                  [classes.drawerOpen]: this.state.max,
                  [classes.drawerClose]: !this.state.max,
                }),
              }}
              open={this.state.max}
            >
              <Menu />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          {isLoading && <Preloader />}
          <AuthRouter />
        </main>
      </div>
    );
  }
}

export default AppDrawer