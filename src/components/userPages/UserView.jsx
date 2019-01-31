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
                imgUrl: '',
                firstName: '',
                lastName: '',
                position: '',
                address: [],
                phone: '',
                email: '',
            },
            managers: {

            }
        }
    }

    componentDidMount() {
        getProfile().then(userData => {
            console.log(userData)
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

    handleChangeTab = (event, tab) => {
        this.setState({ tab });
    }

    render() {
        const { classes } = this.props;
        const { tab, user, openPopup } = this.state;
        return (
            // <Card className={classes.root}>
            //     <CardHeader
            //         avatar={
            //             <Avatar src={user.imgUrl} className={classes.avatar}>
            //                 {user.imgUrl ? null : <Typography variant='h3'>{((user.firstName ? user.firstName[0] : '') + (user.lastName ? user.lastName[0]: '')) || 'UU'}</Typography> }
            //             </Avatar>
            //         }
            //         title={<Typography
            //             variant='h5'
            //         >{ `${user.firstName || ''} ${user.lastName || ''}`}</Typography>}
            //         subheader={
            //             <div>
            //                 subheader
            //             </div>
            //         }
            //     />
            //     <CardContent>
            <Paper>
                <UserEdit
                    open={openPopup}
                    onClose={this.handlePopupClose}
                    user={user}
                />
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
                            <Item
                                name='Имя'
                                value={user.firstName}
                            />
                            <Item
                                name='Фамилия'
                                value={user.lastName}
                            />
                            <Item
                                name='Должность'
                                value={user.position}
                            />
                            {user.address.map((address, i) => {
                                return <Item
                                key={address.id_address}
                                    name={`Адрес ${i + 1}`}
                                    value={`${address.city || ''}, ${address.street || ''} ${address.house_number || ''}, ${address.office_number || ''}`}
                                />
                            })}
                            <Item
                                name='Телефон'
                                value={user.phone}
                            />
                            <Item
                                name='Email'
                                value={user.email}
                            />
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