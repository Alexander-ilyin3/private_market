import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

import Menu from './Menu';
import MainFrame from './MmainFrame';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        
    },
    drawer: {
        whiteSpace: 'nowrap',
        backgroundColor: theme.palette.menuBackground,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 7 + 1,
        },
    },
    appBar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
        width: `calc(100% - ${theme.spacing.unit * 7 + 1}px)`,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100%)',
        },
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('xs')]: {
            width: `calc(100%)`,
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    miniButton: {
        marginRight: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        backgroundColor: theme.palette.menuBackground,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 1,
        marginTop: 65
    },
});

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

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;
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
                            onClick={this.handleDrawerToggle}
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
                        <Typography variant="h6" color="inherit" noWrap>

                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>

                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor='right'
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <Menu />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            anchor='right'
                            variant="permanent"
                            className={classNames(classes.drawer, {
                                [classes.drawerOpen]: this.state.max,
                                [classes.drawerClose]: !this.state.max,
                            })}
                            classes={{
                                paper: classNames(classes.drawerPaper,{
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
                    <MainFrame />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppDrawer)