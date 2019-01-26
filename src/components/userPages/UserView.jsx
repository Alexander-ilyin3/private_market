import React, { Component } from 'react';
import { object } from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Paper,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Grid,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        // padding: 10,
    },
    avatar: {
        width: 110,
        height: 110,

    },
    tabsBar: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.primary,
    }
});

const TabCommon = () => (
    <Grid container spacing={16} style={{paddingTop: 16}}>
        <Grid item sm={12} md={12} lg={6}>
            <Paper>
                <Typography
                    component='div'
                    variant='h6'
                >
                    ОСНОВНАЯ ИНФОРМАЦИЯ
                </Typography>
                
            </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
            <Paper>
            <Typography
                    component='div'
                    variant='h6'
                >
                    МЕНЕДЖЕРЫ
                </Typography>
            </Paper>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
            <Paper>

            </Paper>
        </Grid>
    </Grid>
);

const TabManagers = () => (
    <Grid container spacing={8}>
        <Grid sm={12} md={12}>
            <Paper>

            </Paper>
        </Grid>
    </Grid>
);

class UseView extends Component {

    static propTypes = {
        classes: object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            imgUrl: '',
            name: 'Viktor',
        }
    }

    handleChangeTab = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        const { classes } = this.props;
        const { tab, imgUrl, name } = this.state;
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar src={imgUrl} className={classes.avatar}>
                            {imgUrl ? null : name[0] || 'UU'}
                        </Avatar>
                    }
                    title={<Typography
                        variant='h5'
                    >{name}</Typography>}
                    subheader={
                        <div>
                            subheader
                        </div>
                    }
                />
                <CardContent>
                    <AppBar
                        className={classes.tabsBar}
                        color='primary'
                        position='static'>
                        <Tabs value={tab} onChange={this.handleChangeTab}>
                            <Tab label='ОБЩЕЕ' />
                            <Tab label='МЕНЕДЖЕРЫ' />
                        </Tabs>
                    </AppBar>
                    {tab === 0 && <TabCommon />}
                    {tab === 1 && <TabManagers />}
                </CardContent>

            </Card>
        );
    }
}



export default withStyles(styles)(UseView);