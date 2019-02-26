import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/PersonOutlineOutlined';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from 'react-router-dom';

import { recoveryPasswordPath, signInPath } from '../../config/routes';
import { recovery } from '../../services/api';

const styles = theme => ({
    signup: {
        maxWidth: 450,
        margin: '100px auto 50px',
        minHeight: 200,
        '&>*': {
            height: '100%',
        }
    },
    head: {
        position: 'relative',
    },
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        margin: 'auto',
        position: 'relative',
        top: '-30px',
        borderRadius: '50%',
        boxShadow: theme.shadows[5],
        '&>*': {
            fontSize: 35,
        }
    },
    card: {
        borderRadius: 0,
        boxShadow: theme.shadows[0],
        padding: 25,
    },
    title: {
        textAlign: 'center',
    },
    error: {
        border: '1px solid',
        borderColor: theme.palette.error.main,
    },
    link: {
        textDecoration: 'none',
        '&:visited': {
            color: theme.palette.primary.main,
        }
    }
})

class Recovery extends Component {
    state = {
        errMsg: '',
        email: '',
    }

    handleSubmit = (e) => {
        const { email } = this.state;
        e.preventDefault();

        recovery(email).then(success => {
            if (success) {
                this.props.history.push(recoveryPasswordPath);
            }
        }).catch(err => {
            if (err) {
                this.setState({ errMsg: err.message, error: true });
            }
        });
        this.props.history.push(recoveryPasswordPath);

    }

    render() {
        const { classes } = this.props;
        const { errMsg, email } = this.state;
        return (
            <div>
                <Paper elevation={5} square className={classNames(classes.signup, errMsg && classes.error)}>
                    <div className={classes.head}>
                        <Avatar className={classes.avatar} component='span' children={
                            <AccountCircleIcon />
                        } />
                    </div>
                    <Card className={classes.card}>
                        <form onSubmit={this.handleSubmit}>
                            <CardHeader
                                classes={{ title: classes.title }}
                                title="Восстановление пароля"
                            />
                            <CardContent>
                                <Typography
                                    color='error'
                                    align='center'
                                >
                                    {errMsg}
                                </Typography>
                                <TextField
                                    value={email}
                                    onInput={(event) => { this.setState({ email: event.target.value, errMsg: '' }) }}
                                    variant='outlined'
                                    fullWidth
                                    margin="normal"
                                    placeholder='Email'
                                    label='Email'
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    type='submit'
                                    style={{ marginTop: 20 }}
                                >
                                    Восстановить
                                </Button>
                            </CardContent>
                        </form>
                        <Typography
                            color='primary'
                            paragraph
                            align='center'
                        >
                            <Link to={signInPath} className={classes.link}>Страница авторизации</Link>
                        </Typography>
                    </Card>
                </Paper>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Recovery));