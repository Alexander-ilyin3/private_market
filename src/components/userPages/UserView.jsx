import React, { Component } from 'react';
import { object } from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Paper,
    // Avatar,
    // Card,
    // CardHeader,
    // CardContent,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Grid,
    Button,

} from '@material-ui/core';

import { getProfile } from '../../services/api';

import UserEdit from './UserEdit';

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
    },
    headreWuthBtn: {
        display: 'flex',
        justifyContent: 'space-between',
    }
});

const Item = (props) => (
    <Grid container >
        <Grid item xs={6}>
            <Typography variant='subtitle1'>
                {`${props.name}:`}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            {props.value}
        </Grid>
    </Grid>
)

const TabManagers = () => (
    <Grid container spacing={8}>
        <Grid sm={12} md={12}>
            <Paper>

            </Paper>
        </Grid>
    </Grid>
);

class UserView extends Component {

    static propTypes = {
        classes: object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            openPopup: false,
            user: {
                url: '',
                firstName: '',
                lastName: '',
                position: '',
                address: '',
                phone: '',
                email: '',
            },
            managers: {

            }
        }
    }

    componentDidMount() {
        this.handleFetchUser();
    }

    handleFetchUser = () => {
        getProfile().then(userData => {
            this.setState({ user: userData });
        }).catch(err => {
            console.log(err);
        });
    }

    handlePopupOpen = () => {
        this.setState({ openPopup: true });
    }

    handlePopupClose = () => {
        this.setState({ openPopup: false });
    }
    handlePopupOk = () => {
        this.handleFetchUser();
    }

    handleChangeTab = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        const { classes } = this.props;
        const { tab, user, openPopup } = this.state;
        console.log(user);
        const address = [];
        user.address.city && address.push(user.address.city);
        user.address.street && address.push(user.address.street);
        user.address.house_number && address.push(user.address.house_number);
        user.address.office_number && address.push(user.address.office_number);

        return (
            <Paper>
                {openPopup && <UserEdit
                    open={openPopup}
                    onClose={this.handlePopupClose}
                    onOk={this.handlePopupOk}
                    user={user}
                />}
                <AppBar
                    className={classes.tabsBar}
                    color='primary'
                    position='static'>
                    <Tabs value={tab} onChange={this.handleChangeTab}>
                        <Tab label='ОБЩЕЕ' />
                        <Tab label='МЕНЕДЖЕРЫ' />
                    </Tabs>
                </AppBar>
                {tab === 0 &&
                    <Grid container spacing={16} style={{ padding: 16 }}>
                        <Grid item sm={12} md={12} lg={6}>
                            <div className={classes.headreWuthBtn}>
                                <Typography
                                    component='div'
                                    variant='h6'
                                    paragraph
                                >
                                    ОСНОВНАЯ ИНФОРМАЦИЯ
                                </Typography>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={this.handlePopupOpen}
                                    size='small'
                                    style={{ height: 31, padding: '6px 16px' }}
                                >
                                    Изменить
                                </Button>
                            </div>
                            {user.firstName && <Item
                                name='Имя'
                                value={user.firstName}
                            />}
                            {user.lastName && <Item
                                name='Фамилия'
                                value={user.lastName}
                            />}
                            {user.position && <Item
                                name='Должность'
                                value={user.position}
                            />}

                            {address.join(', ') && <Item
                                name='Адрес'
                                value={address.join(', ')}
                            />}
                            {user.url && <Item
                                name='Сайт'
                                value={user.url}
                            />}
                            {user.phone && <Item
                                name='Телефон'
                                value={user.phone}
                            />}
                            {user.email && <Item
                                name='Email'
                                value={user.email}
                            />}
                        </Grid>
                        <Grid item sm={12} md={12} lg={6}>
                            <Typography
                                component='div'
                                variant='h6'
                            >
                                МЕНЕДЖЕРЫ
                                </Typography>
                        </Grid>
                        <Grid item sm={12} md={12} lg={6}>
                            <Paper>

                            </Paper>
                        </Grid>
                    </Grid>
                }
                {tab === 1 && <TabManagers />}
                {/* </CardContent>

            </Card> */}
            </Paper>
        );
    }
}



export default withStyles(styles)(UserView);