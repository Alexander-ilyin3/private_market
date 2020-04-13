const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',

    },
    grow: {
        flexGrow: 1,
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
        [theme.breakpoints.down('sm')]: {
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
        marginTop: 65,
        position: 'relative',
        height: 'calc(100vh - 65px)',
    },
});

export { styles }