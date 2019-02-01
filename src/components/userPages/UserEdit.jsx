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
    Dialog,
    DialogActions,
    TextField,
    DialogTitle,

} from '@material-ui/core';

import { updateProfile } from '../../services/api';

const styles = theme => ({
    root: {
        padding: 20,
    }
});


class UserEdit extends Component {

    static propTypes = {
        classes: object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {...props.user};
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleInput = (value, field, isAddress) => {
        this.setState(currentState => {
            if (isAddress) {
                currentState.address[field] = value;
            } else {
                currentState[field] = value;
            }


            return currentState;
        });
        console.log(this.state);
    }

    handleOk = () => {
        const { address, firstName, lastName, phone, url, position, id_contacts_info, id_address } = this.state;
        const updateRequest = {
            customer_name: firstName,
            customer_lastname: lastName,
            info: [{
                id_contacts_info,
                customer_phone: phone,
                customer_website: url,
                customer_position: position,
            }],
            address: [{
                id_address,
                city: address.city,
                house_number: address.house_number,
                office_number: address.office_number,
                street: address.street,
            }]

        }



        updateProfile(updateRequest).then(resp => {
            if (resp) {
                console.log(resp);
                this.props.onOk();
                this.handleClose();
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    render() {
        const { classes, onClose, open } = this.props;
        const { address, firstName, lastName, phone, url, position } = this.state;

        // console.log(user);

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="edit-user-data" open={open} >
                <DialogTitle
                    style={{ textAlign: 'center' }}
                >Изменить личные данные</DialogTitle>
                <div className={classes.root}>
                    <form>
                        <TextField
                            onInput={(e) => { this.handleInput(e.target.value, 'firstName') }}
                            value={firstName}
                            label='Имя'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            onInput={(e) => { this.handleInput(e.target.value, 'lastName') }}
                            value={lastName}
                            label='Фамилия'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            onInput={(e) => { this.handleInput(e.target.value, 'position') }}
                            value={position}
                            label='Должность'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onInput={(e) => { this.handleInput(e.target.value, 'city', true) }}
                                    value={address.city || ''}
                                    label='Город'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                                <TextField
                                    onInput={(e) => { this.handleInput(e.target.value, 'house_number', true) }}
                                    value={address.house_number || ''}
                                    label='№ дома'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onInput={(e) => { this.handleInput(e.target.value, 'street', true) }}
                                    value={address.street || ''}
                                    label='Улица'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                                <TextField
                                    onInput={(e) => { this.handleInput(e.target.value, 'office_number', true) }}
                                    value={address.office_number || ''}
                                    label='№ офиса'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            onInput={(e) => { this.handleInput(e.target.value, 'url') }}
                            value={url}
                            label='Сайт'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            onInput={(e) => { this.handleInput(Number(e.target.value), 'phone') }}
                            value={phone}
                            label='Телефон'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            type='number'
                        />

                        <DialogActions>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={this.handleClose}
                            >
                                закрыть
                        </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={this.handleOk}
                            >
                                применить
                        </Button>
                        </DialogActions>
                    </form>
                </div>
            </Dialog>
        );
    }
}

export default withStyles(styles)(UserEdit);