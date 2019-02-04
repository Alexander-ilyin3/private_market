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
        this.state = {
            ...props.user,
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleInput = (value, field, isInfo) => {
        this.setState(currentState => {
            if (isInfo) {
                currentState.info[field] = value;
            } else {
                currentState[field] = value;
            }


            return currentState;
        });
        console.log(this.state);
    }
    handleOk = () => {
        // const { user } = this.state;
        updateProfile(this.state).then(resp => {
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
        const { info = '', customerLastname = '', customerName = '' } = this.state;
        const {
            city = '',
            houseNumber = '',
            street = '',
            officeNumber = '',
            customerPhone = '',
            customerPosition = '',
            customerWebsite = ''
        } = info;
        console.log(info);

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="edit-user-data" open={open} >
                <DialogTitle
                    style={{ textAlign: 'center' }}
                >Изменить личные данные</DialogTitle>
                <div className={classes.root}>
                    <form>
                        <TextField
                            inputProps={{tabIndex:'11'}}
                            onInput={(e) => { this.handleInput(e.target.value, 'customerName') }}
                            value={customerName || ''}
                            label='Имя'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            inputProps={{tabIndex:'12'}}
                            onInput={(e) => { this.handleInput(e.target.value, 'customerLastname') }}
                            value={customerLastname || ''}
                            label='Фамилия'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            inputProps={{tabIndex:'13'}}
                            onInput={(e) => { this.handleInput(e.target.value, 'customerPosition', true) }}
                            value={customerPosition || ''}
                            label='Должность'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <Grid container spacing={8}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputProps={{tabIndex:'14'}}
                                    onInput={(e) => { this.handleInput(e.target.value, 'city', true) }}
                                    value={city || ''}
                                    label='Город'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                                <TextField
                                    inputProps={{tabIndex:'16'}}
                                    onInput={(e) => { this.handleInput(e.target.value, 'houseNumber', true) }}
                                    value={houseNumber || ''}
                                    label='№ дома'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputProps={{tabIndex:'15'}}
                                    onInput={(e) => { this.handleInput(e.target.value, 'street', true) }}
                                    value={street || ''}
                                    label='Улица'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                                <TextField
                                    inputProps={{tabIndex:'17'}}
                                    onInput={(e) => { this.handleInput(e.target.value, 'officeNumber', true) }}
                                    value={officeNumber || ''}
                                    label='№ офиса'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            inputProps={{tabIndex:'18'}}
                            onInput={(e) => { this.handleInput(e.target.value, 'customerWebsite', true) }}
                            value={customerWebsite || ''}
                            label='Сайт'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            inputProps={{tabIndex:'19'}}
                            onInput={(e) => { this.handleInput(Number(e.target.value), 'customerPhone', true) }}
                            value={customerPhone || ''}
                            label='Телефон'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            type='number'
                        />

                        <DialogActions>
                            <Button
                                inputProps={{tabIndex:'20'}}
                                variant='outlined'
                                color='primary'
                                onClick={this.handleClose}
                            >
                                закрыть
                            </Button>
                            <Button
                                inputProps={{tabIndex:'21'}}
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