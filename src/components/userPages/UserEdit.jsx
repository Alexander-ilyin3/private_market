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

} from '@material-ui/core';

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
            user: props.user,
        }
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { classes, onClose, ...other } = this.props;
        const { user } = this.state;
        console.log(this.props)

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="edit-user-data" {...other} >
                <div className={classes.root}>
                    <form>
                        <TextField
                            value={user.firstName}
                            label='Имя'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Фамилия'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Должность'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Адрес'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Телефон'
                            variant='outlined'
                            fullWidth
                            margin='normal'
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